import type { SensoryEvent, SensoryState } from '../core/events';
import type { MaterialProfile } from '../physics/materials';
import { MusicBox, type Genre } from './music';

/**
 * Physics-driven procedural audio (Web Audio API).
 *
 * Nothing here plays a canned "rolling loop" pitched by speed. Instead each
 * layer is synthesised from noise and resonators whose *gains, spectra and
 * modulation* are driven continuously by the simulation state:
 *
 *  Layer 1 — physical contact: rolling (resonant bands of the material, a
 *            structural rumble, rotation-rate amplitude modulation), sliding
 *            (separate scrape band, rubber squeal), impacts (modal synthesis
 *            with per-hit randomisation), seam clicks.
 *  Layer 2 — environment: wind (speed^2), ambience, reverb that opens up in
 *            tunnels, underwater muffling.
 *  Layer 3 — music/atmosphere: a quiet generative pad (optional).
 *
 * Plus the magnet's electromagnetic voice (activation sweep, modulated hum,
 * capture zap, release blip).
 */
export class AudioEngine {
  ctx?: AudioContext;
  enabled = true;
  musicOn = true;
  genre: Genre = 'ambient';
  musicLevel = 0.5;
  private box?: MusicBox;
  volume = 0.9;
  private master!: GainNode;
  private muffle!: BiquadFilterNode;
  private dry!: GainNode;
  private wet!: GainNode;
  private reverb!: ConvolverNode;
  private noise!: AudioBuffer;
  private roll?: { src: AudioBufferSourceNode; rumble: BiquadFilterNode; rumbleGain: GainNode; bands: BiquadFilterNode[]; bandGain: GainNode; tone: BiquadFilterNode; am: GainNode; amOsc: OscillatorNode; amDepth: GainNode; out: GainNode };
  private slide?: { src: AudioBufferSourceNode; filt: BiquadFilterNode; gain: GainNode; squeal: OscillatorNode; squealFilt: BiquadFilterNode; squealGain: GainNode };
  private wind?: { src: AudioBufferSourceNode; filt: BiquadFilterNode; gain: GainNode };
  private hum?: { o1: OscillatorNode; o2: OscillatorNode; filt: BiquadFilterNode; gain: GainNode; lfo: OscillatorNode; lfoGain: GainNode };
  private ambience?: { src: AudioBufferSourceNode; filt: BiquadFilterNode; gain: GainNode };
  private music?: { gain: GainNode; voices: OscillatorNode[]; filt: BiquadFilterNode };
  private mat?: MaterialProfile;
  private voices = 0;
  private lastSeam = 0;
  private birdTimer = 3;
  private musicTimer = 0;
  private chord = 0;
  private bubbleTimer = 0;

  /** Create/resume the context. Must be called from a user gesture (iOS). */
  async unlock() {
    if (!this.ctx) {
      const AC: any = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AC) { this.enabled = false; return; }
      this.ctx = new AC({ latencyHint: 'interactive' });
      this.buildGraph();
    }
    if (this.ctx!.state !== 'running') await this.ctx!.resume().catch(() => {});
  }

  private buildGraph() {
    const c = this.ctx!;
    this.master = c.createGain();
    this.master.gain.value = this.volume;
    const comp = c.createDynamicsCompressor();
    comp.threshold.value = -14; comp.ratio.value = 4; comp.attack.value = 0.003; comp.release.value = 0.15;
    this.muffle = c.createBiquadFilter();
    this.muffle.type = 'lowpass'; this.muffle.frequency.value = 20000;
    this.master.connect(this.muffle).connect(comp).connect(c.destination);
    this.dry = c.createGain(); this.dry.connect(this.master);
    this.wet = c.createGain(); this.wet.gain.value = 0.2;
    this.reverb = c.createConvolver();
    this.reverb.buffer = this.makeIR(2.4);
    this.wet.connect(this.reverb).connect(this.master);
    this.box = new MusicBox(c, this.master);
    this.box.setLevel(this.musicLevel);
    this.box.setGenre(this.genre);
    // ~3 s of pinkish noise
    const len = c.sampleRate * 3;
    this.noise = c.createBuffer(1, len, c.sampleRate);
    const d = this.noise.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + w * 0.099; b1 = 0.963 * b1 + w * 0.2965; b2 = 0.57 * b2 + w * 1.0526;
      d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.18;
    }
  }

  private makeIR(seconds: number) {
    const c = this.ctx!;
    const len = Math.floor(c.sampleRate * seconds);
    const buf = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        const t = i / len;
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 3.2) * (i < 40 ? i / 40 : 1);
      }
    }
    return buf;
  }

  private noiseSrc() {
    const s = this.ctx!.createBufferSource();
    s.buffer = this.noise; s.loop = true;
    s.loopStart = Math.random() * 1; s.loopEnd = 3;
    return s;
  }

  private send(node: AudioNode, wetAmt = 1) {
    node.connect(this.dry);
    if (wetAmt > 0) {
      const g = this.ctx!.createGain(); g.gain.value = wetAmt; node.connect(g).connect(this.wet);
    }
  }

  /** Configure continuous layers for a material/world. */
  configure(mat: MaterialProfile) {
    if (!this.ctx) { this.mat = mat; return; }
    this.stopLayers();
    this.mat = mat;
    const c = this.ctx;
    const a = mat.acoustic;
    // Rolling
    {
      const src = this.noiseSrc();
      const rumble = c.createBiquadFilter(); rumble.type = 'lowpass'; rumble.frequency.value = a.rumbleHz * 1.6; rumble.Q.value = 2.5;
      const rumbleGain = c.createGain(); rumbleGain.gain.value = 0;
      const bandGain = c.createGain(); bandGain.gain.value = 0;
      const tone = c.createBiquadFilter(); tone.type = 'lowpass'; tone.frequency.value = 2000;
      const bands: BiquadFilterNode[] = [];
      for (const [f, q, g] of a.rollBands) {
        const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f; bp.Q.value = q;
        const gg = c.createGain(); gg.gain.value = g * 2.2;
        src.connect(bp).connect(gg).connect(tone);
        bands.push(bp);
      }
      // rotation-rate amplitude modulation (texture repeats once per revolution)
      const am = c.createGain(); am.gain.value = 1;
      const amOsc = c.createOscillator(); amOsc.frequency.value = 5;
      const amDepth = c.createGain(); amDepth.gain.value = 0.18;
      amOsc.connect(amDepth).connect(am.gain);
      tone.connect(bandGain).connect(am);
      src.connect(rumble).connect(rumbleGain).connect(am);
      const out = c.createGain(); out.gain.value = 1;
      am.connect(out);
      this.send(out, 1);
      src.start(); amOsc.start();
      this.roll = { src, rumble, rumbleGain, bands, bandGain, tone, am, amOsc, amDepth, out };
    }
    // Sliding / scraping
    {
      const src = this.noiseSrc();
      const filt = c.createBiquadFilter(); filt.type = 'bandpass'; filt.frequency.value = a.slideHz; filt.Q.value = a.slideQ;
      const gain = c.createGain(); gain.gain.value = 0;
      src.connect(filt).connect(gain);
      const squeal = c.createOscillator(); squeal.type = 'sawtooth'; squeal.frequency.value = 900;
      const squealFilt = c.createBiquadFilter(); squealFilt.type = 'bandpass'; squealFilt.frequency.value = 1900; squealFilt.Q.value = 8;
      const squealGain = c.createGain(); squealGain.gain.value = 0;
      squeal.connect(squealFilt).connect(squealGain);
      this.send(gain, 1); this.send(squealGain, 1);
      src.start(); squeal.start();
      this.slide = { src, filt, gain, squeal, squealFilt, squealGain };
    }
    // Wind
    {
      const src = this.noiseSrc();
      const filt = c.createBiquadFilter(); filt.type = 'bandpass'; filt.frequency.value = 400; filt.Q.value = 0.6;
      const gain = c.createGain(); gain.gain.value = 0;
      src.connect(filt).connect(gain);
      this.send(gain, 0.3);
      src.start();
      this.wind = { src, filt, gain };
    }
    // Magnet hum
    {
      const o1 = c.createOscillator(); o1.type = 'sawtooth'; o1.frequency.value = 55;
      const o2 = c.createOscillator(); o2.type = 'square'; o2.frequency.value = 110.6;
      const filt = c.createBiquadFilter(); filt.type = 'lowpass'; filt.frequency.value = 500; filt.Q.value = 6;
      const gain = c.createGain(); gain.gain.value = 0;
      const lfo = c.createOscillator(); lfo.frequency.value = 7;
      const lfoGain = c.createGain(); lfoGain.gain.value = 180;
      lfo.connect(lfoGain).connect(filt.frequency);
      const mix2 = c.createGain(); mix2.gain.value = 0.35;
      o1.connect(filt); o2.connect(mix2).connect(filt);
      filt.connect(gain);
      this.send(gain, 0.5);
      o1.start(); o2.start(); lfo.start();
      this.hum = { o1, o2, filt, gain, lfo, lfoGain };
    }
    // Ambience
    {
      const src = this.noiseSrc();
      const filt = c.createBiquadFilter(); filt.type = 'lowpass'; filt.frequency.value = 600;
      const gain = c.createGain(); gain.gain.value = 0.03;
      src.connect(filt).connect(gain).connect(this.master);
      src.start();
      this.ambience = { src, filt, gain };
    }
    this.startMusic();
    this.wet.gain.value = a.reverb;
  }

  private startMusic() {
    const c = this.ctx!;
    const gain = c.createGain(); gain.gain.value = this.genre === 'ambient' ? 0.05 : 0;
    const filt = c.createBiquadFilter(); filt.type = 'lowpass'; filt.frequency.value = 900; filt.Q.value = 0.7;
    const voices: OscillatorNode[] = [];
    for (let i = 0; i < 4; i++) {
      const o = c.createOscillator(); o.type = i % 2 ? 'triangle' : 'sawtooth';
      o.detune.value = (i - 1.5) * 7;
      const g = c.createGain(); g.gain.value = 0.25;
      o.connect(g).connect(filt);
      o.start();
      voices.push(o);
    }
    filt.connect(gain);
    this.send(gain, 0.8);
    this.music = { gain, voices, filt };
    this.setChord(0);
  }

  private setChord(i: number) {
    if (!this.music || !this.ctx) return;
    // Gentle progression in D: D, Bm, G, A (root + fifth + octave + third)
    const chords = [[146.8, 220, 293.7, 370], [123.5, 185, 246.9, 293.7], [98, 146.8, 196, 246.9], [110, 164.8, 220, 277.2]];
    const ch = chords[i % chords.length];
    const t = this.ctx.currentTime;
    this.music.voices.forEach((o, k) => o.frequency.setTargetAtTime(ch[k], t, 1.2));
  }

  setMusic(on: boolean) { this.setGenre(on ? 'ambient' : 'off'); }
  /** Soundtrack: off (physical sounds only), the ambient pad, or a genre. */
  setGenre(g: Genre) {
    this.genre = g;
    this.musicOn = g !== 'off';
    if (this.music && this.ctx) this.music.gain.gain.setTargetAtTime(g === 'ambient' ? 0.05 : 0, this.ctx.currentTime, 0.4);
    this.box?.setGenre(g);
  }
  setMusicLevel(v: number) { this.musicLevel = v; this.box?.setLevel(v); }
  setVolume(v: number) {
    this.volume = v;
    if (this.master && this.ctx) this.master.gain.setTargetAtTime(v, this.ctx.currentTime, 0.05);
  }

  private stopLayers() {
    const stop = (n?: AudioScheduledSourceNode) => { try { n?.stop(); } catch { /* ignore */ } };
    stop(this.roll?.src); stop(this.roll?.amOsc);
    stop(this.slide?.src); stop(this.slide?.squeal);
    stop(this.wind?.src);
    stop(this.hum?.o1); stop(this.hum?.o2); stop(this.hum?.lfo);
    stop(this.ambience?.src);
    this.music?.voices.forEach((v) => stop(v));
    this.roll = this.slide = this.wind = this.hum = this.ambience = this.music = undefined;
  }

  /** Silence continuous layers (menus, pause). */
  quiet() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.roll?.out.gain.setTargetAtTime(0, t, 0.05);
    this.slide?.gain.gain.setTargetAtTime(0, t, 0.05);
    this.slide?.squealGain.gain.setTargetAtTime(0, t, 0.05);
    this.wind?.gain.gain.setTargetAtTime(0, t, 0.1);
    this.hum?.gain.gain.setTargetAtTime(0, t, 0.05);
  }

  /** Drive continuous layers from the physics state; synthesise discrete events. */
  update(st: SensoryState, events: SensoryEvent[], dt: number) {
    if (!this.ctx || !this.enabled || !this.roll || !this.mat) return;
    const c = this.ctx;
    const t = c.currentTime;
    const a = this.mat.acoustic;
    const tc = 0.03; // ~30 ms smoothing to avoid zipper noise
    const sp = st.speed;
    const sp01 = Math.min(1, sp / 28);
    this.box?.setIntensity(sp / 55);
    const load = Math.max(0, Math.min(2.5, st.normalAccel / 9.81));
    const loadF = Math.sqrt(load);
    const contact = st.contact ? 1 : 0;
    // --- rolling ---
    const rolling = st.rollingState === 'rolling' ? 1 : st.rollingState === 'sliding' ? 0.7 : st.rollingState === 'skidding' ? 0.35 : 0;
    const rollAmp = a.rollGain * Math.pow(sp01, 0.75) * loadF * rolling * contact;
    this.roll.bandGain.gain.setTargetAtTime(rollAmp * 0.9, t, tc);
    this.roll.rumbleGain.gain.setTargetAtTime(rollAmp * 1.4 * (0.5 + 0.5 * loadF), t, tc);
    this.roll.out.gain.setTargetAtTime(1, t, tc);
    // spectral tilt (not a pitch shift): brighter with speed and load
    this.roll.tone.frequency.setTargetAtTime(300 + a.brightness * 7000 * sp01 * (0.6 + 0.4 * loadF) + 200 * sp01, t, tc);
    this.roll.rumble.frequency.setTargetAtTime(a.rumbleHz * (1.2 + sp01 * 1.2), t, tc);
    const rev = st.angularSpeed / (2 * Math.PI);
    this.roll.amOsc.frequency.setTargetAtTime(Math.max(0.5, Math.min(40, rev)), t, tc);
    // --- sliding ---
    const slip = Math.min(1, st.slipSpeed / 4) * contact;
    this.slide!.gain.gain.setTargetAtTime(a.slideGain * slip * (0.4 + 0.6 * loadF) * 1.6, t, tc);
    this.slide!.filt.frequency.setTargetAtTime(a.slideHz * (0.8 + 0.5 * slip), t, tc);
    if (a.squeak) {
      this.slide!.squealGain.gain.setTargetAtTime(a.squeak * 0.12 * Math.max(0, slip - 0.15) * loadF, t, tc);
      this.slide!.squeal.frequency.setTargetAtTime(700 + st.slipSpeed * 140, t, tc);
    }
    // --- wind ---
    const air = st.contact ? 0 : 1;
    // in a tube the pneumatic air current roars around you (the "fans" of a 4D ride)
    const tubeAir = st.inTunnel ? 1 : 0;
    this.wind!.gain.gain.setTargetAtTime(Math.min(0.62, (sp / 30) ** 2 * (0.22 + 0.25 * air + 0.18 * tubeAir)), t, 0.08);
    this.wind!.filt.frequency.setTargetAtTime(250 + sp * (tubeAir ? 48 : 35), t, 0.08);
    // --- magnet hum ---
    // magnet hum; when boosting on the track it becomes a rising thrust tone tied to speed
    const mag = st.magnetActive ? (st.boosting ? 0.3 : 0.12 + 0.16 * st.magnetForce) : 0; // (v9) the throttle: you hear the gas
    this.hum!.gain.gain.setTargetAtTime(mag, t, 0.04);
    this.hum!.filt.frequency.setTargetAtTime(st.boosting ? 900 + sp * 45 : 350 + st.magnetForce * 1200, t, 0.05);
    this.hum!.o1.frequency.setTargetAtTime(st.boosting ? 60 + sp * 2.2 : 52 + st.magnetForce * 14, t, 0.05);
    // --- acoustic space ---
    const wetT = a.reverb + (st.inTunnel ? 0.55 : 0);
    this.wet.gain.setTargetAtTime(wetT, t, 0.25);
    this.muffle.frequency.setTargetAtTime(st.submersion > 0.75 ? 900 : 20000, t, 0.08);
    // --- ambience: occasional bird calls in nature worlds ---
    this.birdTimer -= dt;
    if (this.birdTimer <= 0) {
      this.birdTimer = 2 + Math.random() * 6;
      if (['wood', 'snow', 'mud', 'water'].includes(this.mat.id) && !st.inTunnel) this.bird();
    }
    this.musicTimer -= dt;
    if (this.musicTimer <= 0) { this.musicTimer = 6; this.setChord(++this.chord); }
    // water bubbles
    if (st.submersion > 0.1) {
      this.bubbleTimer -= dt * (0.5 + sp / 6);
      if (this.bubbleTimer <= 0) { this.bubbleTimer = 0.05 + Math.random() * 0.25; this.bubble(); }
    }

    for (const e of events) this.onEvent(e, st);
  }

  private onEvent(e: SensoryEvent, st: SensoryState) {
    switch (e.type) {
      case 'COLLISION_IMPACT': this.impact(e.intensity, e.source === 'obstacle' ? 1.15 : 1); break;
      case 'AIRBORNE_END': if (e.intensity > 0.08) this.impact(e.intensity * 0.9, 0.85); break;
      case 'SURFACE_SEAM_CROSSING': {
        const now = this.ctx!.currentTime;
        if (now - this.lastSeam > 0.025) { this.lastSeam = now; this.seam(e.intensity); }
        break;
      }
      case 'LIFT_CLACK': this.clack(); break;
      case 'TRIGGER_PAD': this.chime(1318.5, 0.16); setTimeout(() => this.chime(1975.5, 0.12), 70); break;
      case 'HOLO_BOOST': this.whoosh(0.9); this.sweep(300, 1400, 0.3, 0.12, 'triangle'); this.sweep(600, 2800, 0.22, 0.05, 'sine'); break;
      case 'TURBO_ARMED': this.sweep(400, 1600, 0.35, 0.16, 'triangle'); this.sweep(800, 2400, 0.3, 0.1, 'sine'); break;
      case 'TURBO_START': this.sweep(80, 1800, 0.6, 0.28, 'sawtooth'); this.sweep(50, 30, 0.6, 0.3, 'sine'); break;
      case 'TURBO_END': this.sweep(900, 200, 0.4, 0.1, 'triangle'); break;
      case 'MAGNET_ENGAGED': this.sweep(120, 900, 0.28, 0.2, 'sawtooth'); this.sweep(60, 240, 0.25, 0.16, 'sine'); break;
      case 'MAGNET_RELEASED': this.sweep(520, 160, 0.12, 0.08, 'triangle'); break;
      case 'MAGNETIC_CAPTURE': this.sweep(1400, 260, 0.16, 0.18, 'square'); this.sweep(110, 40, 0.3, 0.24, 'sine'); break;
      case 'JUMP': this.sweep(260, 520, 0.1, 0.06, 'sine'); break;
      case 'NUDGE': this.whoosh(0.35 + 0.4 * e.intensity); this.impact(0.12 + 0.15 * e.intensity, 0.5); break;
      case 'BRAKE': this.brakeScrape(0.4 + 0.5 * e.intensity); break;
      case 'PUSH': this.impact(0.25 + 0.3 * e.intensity, 0.6); this.whoosh(0.5 + 0.5 * e.intensity); break;
      case 'DOUBLE_JUMP': this.sweep(420, 1100, 0.16, 0.08, 'triangle'); this.sweep(840, 2200, 0.12, 0.03, 'sine'); break;
      case 'WATER_ENTRY': this.splash(e.intensity); break;
      case 'WATER_EXIT': this.splash(0.3); break;
    }
    void st;
  }

  private impact(intensity: number, scale: number) {
    if (this.voices > 10 || !this.mat) return;
    const c = this.ctx!;
    const a = this.mat.acoustic;
    const t = c.currentTime;
    const amp = Math.min(1, Math.pow(intensity, 0.8)) * 0.9 * scale;
    const out = c.createGain(); out.gain.value = amp;
    this.send(out, 1.2);
    // noise transient
    const n = c.createBufferSource(); n.buffer = this.noise; n.playbackRate.value = 0.8 + Math.random() * 0.6;
    const nf = c.createBiquadFilter(); nf.type = 'bandpass'; nf.frequency.value = (a.impactModes[0]?.[0] ?? 300) * (2 + Math.random()); nf.Q.value = 0.9;
    const ng = c.createGain();
    const dur = 0.04 + (1 - this.mat.compliance) * 0.03;
    ng.gain.setValueAtTime(a.impactNoise * 1.4, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + dur);
    n.connect(nf).connect(ng).connect(out);
    n.start(t, Math.random() * 2, dur + 0.02);
    // modal resonators, randomised so repeated hits differ
    let longest = dur;
    for (const [f, decay] of a.impactModes) {
      const o = c.createOscillator();
      o.type = 'sine';
      o.frequency.value = f * (0.94 + Math.random() * 0.12) * (1 + (1 - intensity) * 0.05);
      const g = c.createGain();
      const dd = decay * (0.7 + intensity * 0.6);
      g.gain.setValueAtTime((1 - a.impactNoise * 0.5) * 0.5 / a.impactModes.length * 2, t);
      g.gain.exponentialRampToValueAtTime(0.0008, t + dd);
      o.connect(g).connect(out);
      o.start(t); o.stop(t + dd + 0.02);
      longest = Math.max(longest, dd);
    }
    this.voices++;
    setTimeout(() => { this.voices--; out.disconnect(); }, (longest + 0.1) * 1000);
  }

  /**
   * The plunger's ratchet as you pull the knob back: a bright metal tick and
   * a little spring creak that rises with the pull.
   */
  plungerTick(pull: number) {
    if (!this.ctx || !this.noise) return;
    const c = this.ctx, t = c.currentTime;
    const n = c.createBufferSource(); n.buffer = this.noise;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2600 + pull * 1800; f.Q.value = 8;
    const g = c.createGain(); g.gain.setValueAtTime(0.16, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
    n.connect(f).connect(g); this.send(g, 0.25); n.start(t, Math.random() * 2, 0.04);
    const o = c.createOscillator(); o.type = 'triangle'; o.frequency.setValueAtTime(420 + pull * 520, t); o.frequency.exponentialRampToValueAtTime(380 + pull * 480, t + 0.06);
    const og = c.createGain(); og.gain.setValueAtTime(0.035, t); og.gain.exponentialRampToValueAtTime(0.0008, t + 0.07);
    o.connect(og); this.send(og, 0.2); o.start(t); o.stop(t + 0.08);
  }

  /**
   * Letting go of the plunger: the rod's THWACK into the ball, a metal clang,
   * and the spring's boing, all bigger the further you pulled.
   */
  plungerRelease(power: number) {
    if (!this.ctx || !this.noise) return;
    const c = this.ctx, t = c.currentTime;
    const amp = 0.3 + 0.7 * power;
    const out = c.createGain(); out.gain.value = amp; this.send(out, 0.5);
    // thwack: a short low noise burst plus a knock
    const n = c.createBufferSource(); n.buffer = this.noise;
    const nf = c.createBiquadFilter(); nf.type = 'lowpass'; nf.frequency.value = 1400;
    const ng = c.createGain(); ng.gain.setValueAtTime(0.7, t); ng.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    n.connect(nf).connect(ng).connect(out); n.start(t, Math.random() * 2, 0.1);
    const k = c.createOscillator(); k.type = 'sine'; k.frequency.setValueAtTime(160, t); k.frequency.exponentialRampToValueAtTime(55, t + 0.14);
    const kg = c.createGain(); kg.gain.setValueAtTime(0.6, t); kg.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    k.connect(kg).connect(out); k.start(t); k.stop(t + 0.18);
    // clang: a few inharmonic metal partials
    for (const [f, d, a] of [[1240, 0.35, 0.12], [1873, 0.28, 0.08], [2731, 0.2, 0.05], [3610, 0.14, 0.03]]) {
      const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = f * (0.98 + Math.random() * 0.04);
      const g = c.createGain(); g.gain.setValueAtTime(a, t); g.gain.exponentialRampToValueAtTime(0.0005, t + d);
      o.connect(g).connect(out); o.start(t); o.stop(t + d + 0.02);
    }
    // spring boing: a falling twang with a fast wobble
    const sp = c.createOscillator(); sp.type = 'triangle';
    sp.frequency.setValueAtTime(300 + power * 120, t); sp.frequency.exponentialRampToValueAtTime(95, t + 0.55);
    const lfo = c.createOscillator(); lfo.frequency.value = 26;
    const lg = c.createGain(); lg.gain.setValueAtTime(40, t); lg.gain.exponentialRampToValueAtTime(1, t + 0.55);
    lfo.connect(lg).connect(sp.frequency);
    const sg = c.createGain(); sg.gain.setValueAtTime(0.0001, t); sg.gain.exponentialRampToValueAtTime(0.12, t + 0.01); sg.gain.exponentialRampToValueAtTime(0.0005, t + 0.6);
    const sf = c.createBiquadFilter(); sf.type = 'lowpass'; sf.frequency.value = 1800;
    sp.connect(sf).connect(sg).connect(out); sp.start(t); lfo.start(t); sp.stop(t + 0.62); lfo.stop(t + 0.62);
    setTimeout(() => out.disconnect(), 900);
  }

  /** Tube-theme sounds: kept quiet, under the rolling sound. */
  themeSound(kind: 'lasers' | 'fireworks' | 'haunted' | 'pinball' | 'firework') {
    if (!this.ctx) return;
    if (kind === 'firework') {
      this.pop(true);
      for (let k = 1; k <= 3; k++) setTimeout(() => this.pop(false), 90 + k * 70 + Math.random() * 60);
    } else if (kind === 'haunted') {
      this.sweep(220 + Math.random() * 60, 110, 0.9, 0.05, 'sine');
      this.sweep(330 + Math.random() * 80, 160, 0.8, 0.025, 'triangle');
    } else if (kind === 'pinball') {
      const f = [1046.5, 1318.5, 1568, 2093][Math.floor(Math.random() * 4)];
      this.chime(f, 0.12); setTimeout(() => this.chime(f * 1.5, 0.08), 60);
    }
  }

  /** Chain-lift ratchet: a short dry click with a metallic body. */
  private clack() {
    const c = this.ctx!;
    const t = c.currentTime;
    const n = c.createBufferSource(); n.buffer = this.noise;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2200 + Math.random() * 300; f.Q.value = 6;
    const g = c.createGain();
    g.gain.setValueAtTime(0.18, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
    n.connect(f).connect(g);
    this.send(g, 0.3);
    n.start(t, Math.random() * 2, 0.05);
    const o = c.createOscillator(); o.type = 'square'; o.frequency.setValueAtTime(180, t);
    const og = c.createGain(); og.gain.setValueAtTime(0.05, t); og.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
    o.connect(og); this.send(og, 0.2); o.start(t); o.stop(t + 0.04);
  }

  private seam(intensity: number) {
    if (!this.mat || this.mat.acoustic.seamGain <= 0) return;
    const c = this.ctx!;
    const a = this.mat.acoustic;
    const t = c.currentTime;
    const n = c.createBufferSource(); n.buffer = this.noise;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = (a.rollBands[1]?.[0] ?? 400) * (1.6 + Math.random() * 0.4); f.Q.value = 3;
    const g = c.createGain();
    g.gain.setValueAtTime(a.seamGain * Math.min(1, intensity) * 0.7, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
    n.connect(f).connect(g);
    this.send(g, 0.6);
    n.start(t, Math.random() * 2, 0.04);
  }

  private sweep(f0: number, f1: number, dur: number, amp: number, type: OscillatorType) {
    const c = this.ctx!;
    const t = c.currentTime;
    const o = c.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(amp, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 3000;
    o.connect(f).connect(g);
    this.send(g, 0.5);
    o.start(t); o.stop(t + dur + 0.02);
  }

  private bird() {
    const c = this.ctx!;
    const t = c.currentTime;
    const notes = 2 + Math.floor(Math.random() * 4);
    const base = 2200 + Math.random() * 1800;
    const g = c.createGain(); g.gain.value = 0.025;
    const pan = c.createStereoPanner ? c.createStereoPanner() : null;
    if (pan) { pan.pan.value = Math.random() * 2 - 1; g.connect(pan).connect(this.wet); pan.connect(this.master); } else g.connect(this.master);
    for (let i = 0; i < notes; i++) {
      const o = c.createOscillator(); o.type = 'sine';
      const st = t + i * 0.13;
      o.frequency.setValueAtTime(base, st);
      o.frequency.exponentialRampToValueAtTime(base * (1.3 + Math.random() * 0.4), st + 0.07);
      const e = c.createGain();
      e.gain.setValueAtTime(0.0001, st); e.gain.exponentialRampToValueAtTime(1, st + 0.01); e.gain.exponentialRampToValueAtTime(0.0001, st + 0.09);
      o.connect(e).connect(g);
      o.start(st); o.stop(st + 0.1);
    }
  }

  private bubble() {
    const c = this.ctx!;
    const t = c.currentTime;
    const o = c.createOscillator(); o.type = 'sine';
    const f = 400 + Math.random() * 900;
    o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * 1.8, t + 0.05);
    const g = c.createGain(); g.gain.setValueAtTime(0.04, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
    o.connect(g); this.send(g, 0.4);
    o.start(t); o.stop(t + 0.07);
  }

  private splash(intensity: number) {
    const c = this.ctx!;
    const t = c.currentTime;
    const n = c.createBufferSource(); n.buffer = this.noise;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1200; f.Q.value = 0.5;
    const g = c.createGain(); g.gain.setValueAtTime(0.5 * intensity + 0.1, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    n.connect(f).connect(g); this.send(g, 0.8);
    n.start(t, 0, 0.55);
  }

  /** Air whoosh as a rib/arch passes overhead (stereo-alternating). */
  private whooshSide = 1;
  whoosh(intensity: number) {
    if (!this.ctx || intensity < 0.05) return;
    const c = this.ctx;
    const t = c.currentTime;
    const n = c.createBufferSource(); n.buffer = this.noise; n.playbackRate.value = 1.2;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 1.2;
    f.frequency.setValueAtTime(2400, t); f.frequency.exponentialRampToValueAtTime(500, t + 0.22);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.16 * intensity, t + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
    let out: AudioNode = g;
    if (c.createStereoPanner) { const p = c.createStereoPanner(); p.pan.value = 0.4 * this.whooshSide; this.whooshSide *= -1; g.connect(p); out = p; }
    n.connect(f).connect(g);
    out.connect(this.dry);
    n.start(t, Math.random() * 2, 0.3);
  }

  /** Swipe-back brake: a gritty scrape that falls in pitch, like a palm dragging on a rolling ball. */
  brakeScrape(intensity: number) {
    if (!this.ctx) return;
    const c = this.ctx, t = c.currentTime;
    const n = c.createBufferSource(); n.buffer = this.noise; n.playbackRate.value = 0.8;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 3;
    f.frequency.setValueAtTime(1800, t); f.frequency.exponentialRampToValueAtTime(260, t + 0.38);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.22 * intensity, t + 0.04); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
    n.connect(f).connect(g).connect(this.dry);
    n.start(t, Math.random() * 2, 0.45);
  }

  /** Short UI click */
  // ---------------------------------------------------------------- finale sounds
  /** A hit in the finish contraption: the ball's own material voice. */
  clink(intensity: number) { if (this.ctx && this.mat) this.impact(Math.min(1, intensity), 0.9); }
  /** Wooden domino clack (short, dry, slightly random pitch). */
  clack2(intensity = 0.6) {
    if (!this.ctx) return;
    const c = this.ctx, t = c.currentTime;
    const o = c.createOscillator(); o.type = 'triangle'; o.frequency.value = 900 + Math.random() * 500;
    const g = c.createGain(); g.gain.setValueAtTime(0.16 * intensity, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    o.connect(g); this.send(g, 0.3); o.start(t); o.stop(t + 0.06);
  }
  /** A tuned chime bar (xylophone/glockenspiel): fundamental plus inharmonic partials. */
  chime(freq: number, amp = 0.25) {
    if (!this.ctx) return;
    const c = this.ctx, t = c.currentTime;
    for (const [mul, a, d] of [[1, 1, 1.4], [2.76, 0.35, 0.5], [5.4, 0.15, 0.25]] as const) {
      const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = freq * mul;
      const g = c.createGain(); g.gain.setValueAtTime(amp * a, t); g.gain.exponentialRampToValueAtTime(0.0005, t + d);
      o.connect(g); this.send(g, 0.6); o.start(t); o.stop(t + d + 0.05);
    }
  }
  /** A big bell: long inharmonic ring. */
  bell(freq = 330) {
    if (!this.ctx) return;
    const c = this.ctx, t = c.currentTime;
    for (const [mul, a, d] of [[0.5, 0.5, 4], [1, 0.8, 3.5], [1.19, 0.4, 2.8], [1.56, 0.3, 2.2], [2.0, 0.35, 2], [2.66, 0.2, 1.5], [3.0, 0.15, 1.2]] as const) {
      const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = freq * mul;
      const g = c.createGain(); g.gain.setValueAtTime(0.2 * a, t); g.gain.exponentialRampToValueAtTime(0.0005, t + d);
      o.connect(g); this.send(g, 0.9); o.start(t); o.stop(t + d + 0.05);
    }
  }
  /** Rising whir of a coin funnel (call repeatedly with 0..1 progress). */
  whir(k: number) {
    if (!this.ctx || Math.random() > 0.5) return;
    this.sweep(200 + 900 * k, 220 + 1000 * k, 0.08, 0.03 + 0.04 * k, 'triangle');
  }
  /** Fireworks / confetti pop. */
  pop(big = false) {
    if (!this.ctx) return;
    const c = this.ctx, t = c.currentTime;
    const n = c.createBufferSource(); n.buffer = this.noise;
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = big ? 1200 : 3000;
    const g = c.createGain(); g.gain.setValueAtTime(big ? 0.5 : 0.2, t); g.gain.exponentialRampToValueAtTime(0.001, t + (big ? 0.8 : 0.15));
    n.connect(f).connect(g); this.send(g, 0.8); n.start(t, Math.random(), 1);
  }
  /** A short victory arpeggio. */
  fanfare() {
    if (!this.ctx) return;
    [523.3, 659.3, 784, 1046.5].forEach((f, i) => setTimeout(() => this.chime(f, 0.22), i * 110));
  }

  ui(kind: 'tap' | 'confirm' | 'reward' = 'tap') {
    if (!this.ctx) return;
    if (kind === 'reward') { this.sweep(440, 1320, 0.35, 0.12, 'triangle'); return; }
    this.sweep(kind === 'tap' ? 900 : 600, kind === 'tap' ? 1200 : 900, 0.06, 0.05, 'sine');
  }
}
