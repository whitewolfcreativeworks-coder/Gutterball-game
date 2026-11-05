/**
 * Procedural soundtrack: a small step sequencer with synthesized drums, bass,
 * chords, guitar and leads, playing one of several genres. Everything is
 * generated live with the Web Audio API (no samples, no licences to track).
 *
 * The music sits under the game's physical sounds: it is mixed low, and its
 * master filter opens with the ball's speed, so the track builds as you go faster.
 */
export type Genre = 'off' | 'ambient' | 'techno' | 'house' | 'rave' | 'reggae' | 'rock';
export const GENRES: { id: Genre; name: string }[] = [
  { id: 'off', name: 'Off (sounds only)' },
  { id: 'ambient', name: 'Ambient' },
  { id: 'techno', name: 'Techno' },
  { id: 'house', name: 'House' },
  { id: 'rave', name: 'Rave (drum & bass)' },
  { id: 'reggae', name: 'Reggae' },
  { id: 'rock', name: 'Rock & roll' },
];

const A = 440;
const midi = (n: number) => A * Math.pow(2, (n - 69) / 12);
// chord roots (MIDI) and qualities per genre: progressions in A minor / C major
const PROG: Record<string, Array<[number, number[]]>> = {
  techno: [[45, [0, 3, 7, 10]], [45, [0, 3, 7, 10]], [41, [0, 4, 7, 11]], [43, [0, 4, 7, 10]]],
  house: [[45, [0, 3, 7, 10]], [50, [0, 3, 7, 10]], [43, [0, 4, 7, 10]], [48, [0, 4, 7, 11]]],
  rave: [[45, [0, 3, 7]], [41, [0, 4, 7]], [48, [0, 4, 7]], [43, [0, 4, 7]]],
  reggae: [[45, [0, 3, 7]], [50, [0, 3, 7]], [45, [0, 3, 7]], [52, [0, 4, 7]]],
  rock: [[45, [0, 7, 12]], [41, [0, 7, 12]], [48, [0, 7, 12]], [43, [0, 7, 12]]],
};
const BPM: Record<string, number> = { techno: 128, house: 124, rave: 172, reggae: 76, rock: 124 };
const LEVEL: Record<string, number> = { techno: 0.9, house: 0.9, rave: 0.8, reggae: 1.35, rock: 0.75 };

export class MusicBox {
  genre: Genre = 'off';
  level = 0.5;            // user music volume 0..1 (mixed low under the game)
  private bus: GainNode;
  private filt: BiquadFilterNode;
  private out: GainNode;
  private noise: AudioBuffer;
  private dist: WaveShaperNode;
  private distIn: GainNode;
  private timer = 0;
  private step = 0;
  private nextT = 0;
  private intensity = 0.5;

  constructor(private ctx: AudioContext, dest: AudioNode) {
    this.bus = ctx.createGain();
    this.filt = ctx.createBiquadFilter(); this.filt.type = 'lowpass'; this.filt.frequency.value = 6000; this.filt.Q.value = 0.6;
    this.out = ctx.createGain(); this.out.gain.value = 0;
    this.bus.connect(this.filt).connect(this.out).connect(dest);
    const len = ctx.sampleRate;
    this.noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    // guitar distortion
    this.distIn = ctx.createGain();
    this.dist = ctx.createWaveShaper();
    const curve = new Float32Array(1024);
    for (let i = 0; i < 1024; i++) { const x = (i / 1023) * 2 - 1; curve[i] = Math.tanh(x * 6) * 0.8; }
    this.dist.curve = curve; this.dist.oversample = '2x';
    const cab = ctx.createBiquadFilter(); cab.type = 'lowpass'; cab.frequency.value = 3200; cab.Q.value = 0.9;
    const g = ctx.createGain(); g.gain.value = 0.35;
    this.distIn.connect(this.dist).connect(cab).connect(g).connect(this.bus);
  }

  /** Choose a genre ('off' or 'ambient' silence this player). */
  setGenre(g: Genre) {
    this.genre = g;
    const playing = g !== 'off' && g !== 'ambient';
    const t = this.ctx.currentTime;
    this.out.gain.cancelScheduledValues(t);
    this.out.gain.setTargetAtTime(playing ? this.gainFor(g) : 0, t, 0.3);
    if (playing && !this.timer) {
      this.step = 0;
      this.nextT = t + 0.1;
      this.timer = window.setInterval(() => this.schedule(), 25);
    }
    if (!playing && this.timer) { clearInterval(this.timer); this.timer = 0; }
  }
  setLevel(v: number) {
    this.level = v;
    if (this.genre !== 'off' && this.genre !== 'ambient') this.out.gain.setTargetAtTime(this.gainFor(this.genre), this.ctx.currentTime, 0.2);
  }
  /** 0..1: the ball's speed. The filter opens and the hats get busier as you go faster. */
  setIntensity(k: number) {
    this.intensity = Math.max(0, Math.min(1, k));
    this.filt.frequency.setTargetAtTime(1400 + 16000 * this.intensity * this.intensity, this.ctx.currentTime, 0.3);
  }
  private gainFor(g: Genre) { return 0.22 * this.level * (LEVEL[g] ?? 1); }

  // ---------------------------------------------------------------- sequencer
  private schedule() {
    const bpm = BPM[this.genre] ?? 120;
    const sixteenth = 60 / bpm / 4;
    while (this.nextT < this.ctx.currentTime + 0.12) {
      this.playStep(this.step, this.nextT, sixteenth);
      // light swing on reggae and house
      const swing = this.genre === 'reggae' ? 0.16 : this.genre === 'house' ? 0.06 : 0;
      this.nextT += sixteenth * (this.step % 2 === 0 ? 1 + swing : 1 - swing);
      this.step++;
    }
  }

  private playStep(n: number, t: number, sx: number) {
    const st = n % 16, bar = Math.floor(n / 16);
    const phraseBar = bar % 32;
    const breakdown = phraseBar >= 24 && phraseBar < 28;      // 4 bars without drums
    const fill = bar % 8 === 7 && st >= 12;                     // a fill into each new phrase
    const prog = PROG[this.genre] ?? PROG.techno;
    const [root, q] = prog[Math.floor(bar / (this.genre === 'reggae' ? 1 : 2)) % prog.length];
    const busy = this.intensity;
    switch (this.genre) {
      case 'techno': {
        if (!breakdown && st % 4 === 0) this.kick(t, 1);
        if (!breakdown && (st === 4 || st === 12)) this.clap(t, 0.7);
        if (st % 4 === 2) this.hat(t, true, 0.35);
        else if (busy > 0.35 || st % 2 === 0) this.hat(t, false, 0.18 + 0.1 * (st % 2));
        if (fill) this.snare(t, 0.4 + 0.1 * (st - 12));
        // acid line: 16ths with accents and a resonant sweep over the phrase
        const acid = [0, 0, 12, 0, 3, 0, 7, 12, 0, 10, 0, 3, 0, 12, 7, 5];
        if (st !== 3 && st !== 11) this.acid(t, midi(root - 12 + acid[st]), sx * 0.9, st % 4 === 0 ? 1 : 0.6, 0.5 + 0.5 * Math.sin(bar * 0.4));
        if (st === 14 && bar % 2 === 1) this.stab(t, q.map((i) => midi(root + 12 + i)), 0.25, 0.12, 'sawtooth');
        if (breakdown && st === 0) this.pad(t, q.map((i) => midi(root + 12 + i)), sx * 16, 0.08);
        break;
      }
      case 'house': {
        if (!breakdown && st % 4 === 0) this.kick(t, 0.95);
        if (!breakdown && (st === 4 || st === 12)) this.clap(t, 0.6);
        if (st % 4 === 2) this.hat(t, true, 0.3);
        if (busy > 0.25) this.hat(t, false, 0.08 + (st % 2) * 0.06);
        if (fill) this.clap(t, 0.3 + 0.1 * (st - 12));
        // piano/organ stabs on the classic syncopation
        if ([0, 3, 6, 10, 13].includes(st)) this.stab(t, q.map((i) => midi(root + 12 + i)), sx * 1.6, 0.11, 'triangle');
        // octave-bouncing bass on the offbeats
        if (st % 4 === 2) this.bass(t, midi(root - 12 + (st % 8 === 2 ? 0 : 12)), sx * 1.8, 0.5, 'square');
        break;
      }
      case 'rave': {
        // two-step breakbeat at 172
        if (!breakdown && (st === 0 || st === 10)) this.kick(t, 1);
        if (!breakdown && (st === 4 || st === 12)) this.snare(t, 0.8);
        if (!breakdown && st === 7 && bar % 2) this.snare(t, 0.3);
        if (st % 2 === 0) this.hat(t, false, 0.16);
        if (busy > 0.5 && st % 2 === 1) this.hat(t, false, 0.08);
        if (fill) this.snare(t, 0.35 + 0.1 * (st - 12));
        // reese bass: long detuned saws
        if (st === 0) this.reese(t, midi(root - 12), sx * 15, 0.5);
        // hoover-ish arp
        const arp = [0, 7, 12, 7, 3, 7, 12, 15];
        if (st % 2 === 0 && phraseBar >= 8) this.lead(t, midi(root + 12 + q[0] + arp[(st / 2) % 8]), sx * 1.5, 0.06);
        if (breakdown && st === 0) this.pad(t, q.map((i) => midi(root + 12 + i)), sx * 16, 0.09);
        break;
      }
      case 'reggae': {
        // one drop: kick and rimshot together on beat 3
        if (!breakdown && st === 8) { this.kick(t, 0.9); this.rim(t, 0.6); }
        if (st % 2 === 0) this.hat(t, false, st % 4 === 2 ? 0.14 : 0.09);
        if (fill) this.rim(t, 0.3 + 0.08 * (st - 12));
        // the skank: short chords on the offbeats
        if (st === 4 || st === 12) this.skank(t, q.map((i) => midi(root + 12 + i)), 0.09);
        // organ bubble
        if (st % 4 === 3) this.organ(t, q.map((i) => midi(root + i)), sx * 0.8, 0.05);
        // melodic bass with rests
        const line: Array<number | null> = [0, null, null, 0, 7, null, 10, null, 12, null, 10, 7, null, 5, 3, null];
        const ln = line[st];
        if (ln !== null) this.bass(t, midi(root - 12 + ln), sx * 1.6, 0.7, 'sine');
        break;
      }
      case 'rock': {
        if (!breakdown && (st === 0 || st === 8 || st === 10)) this.kick(t, 0.95);
        if (!breakdown && (st === 4 || st === 12)) this.snare(t, 0.85);
        if (st % 2 === 0) this.hat(t, st === 14, 0.14);
        if (fill) this.snare(t, 0.45 + 0.1 * (st - 12));
        // palm-muted power chords on the eighths, an open chord ringing at the bar start
        if (st % 2 === 0) this.guitar(t, q.map((i) => midi(root + i)), st === 0 ? sx * 6 : sx * 1.2, st === 0 ? 0.55 : 0.4);
        if (st % 2 === 0) this.bass(t, midi(root - 12), sx * 1.5, 0.5, 'sawtooth');
        break;
      }
    }
  }

  // ---------------------------------------------------------------- instruments
  private env(t: number, peak: number, attack: number, decay: number) {
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
    return g;
  }
  private osc(type: OscillatorType, f: number, t: number, dur: number, into: AudioNode, detune = 0) {
    const o = this.ctx.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = detune;
    o.connect(into); o.start(t); o.stop(t + dur + 0.05);
    return o;
  }
  private noiseHit(t: number, dur: number, into: AudioNode) {
    const n = this.ctx.createBufferSource(); n.buffer = this.noise;
    n.connect(into); n.start(t, Math.random() * 0.5, dur + 0.05);
  }
  private kick(t: number, v: number) {
    const o = this.ctx.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
    const g = this.env(t, 0.9 * v, 0.002, 0.32);
    o.connect(g).connect(this.bus); o.start(t); o.stop(t + 0.4);
  }
  private snare(t: number, v: number) {
    const f = this.ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1800; f.Q.value = 0.8;
    const g = this.env(t, 0.45 * v, 0.001, 0.16);
    this.noiseHit(t, 0.2, f); f.connect(g).connect(this.bus);
    const tg = this.env(t, 0.25 * v, 0.001, 0.08);
    this.osc('triangle', 190, t, 0.1, tg); tg.connect(this.bus);
  }
  private clap(t: number, v: number) {
    const f = this.ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1200; f.Q.value = 1.2;
    f.connect(this.bus);
    for (let k = 0; k < 3; k++) { const g = this.env(t + k * 0.011, 0.35 * v, 0.001, k === 2 ? 0.14 : 0.01); this.noiseHit(t + k * 0.011, 0.15, g); g.connect(f); }
  }
  private rim(t: number, v: number) {
    const g = this.env(t, 0.3 * v, 0.001, 0.05);
    this.osc('square', 820, t, 0.06, g); g.connect(this.bus);
  }
  private hat(t: number, open: boolean, v: number) {
    const f = this.ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 7500;
    const g = this.env(t, v * 0.5, 0.001, open ? 0.22 : 0.035);
    this.noiseHit(t, open ? 0.25 : 0.05, f); f.connect(g).connect(this.bus);
  }
  private bass(t: number, f: number, dur: number, v: number, type: OscillatorType) {
    const lp = this.ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = type === 'sine' ? 900 : 700; lp.Q.value = 2;
    const g = this.env(t, 0.42 * v, 0.004, dur);
    this.osc(type, f, t, dur, lp); lp.connect(g).connect(this.bus);
  }
  private acid(t: number, f: number, dur: number, accent: number, sweep: number) {
    const lp = this.ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 14;
    lp.frequency.setValueAtTime(300 + 2600 * sweep * accent, t); lp.frequency.exponentialRampToValueAtTime(220, t + dur);
    const g = this.env(t, 0.22 * accent, 0.003, dur);
    this.osc('sawtooth', f, t, dur, lp); lp.connect(g).connect(this.bus);
  }
  private reese(t: number, f: number, dur: number, v: number) {
    const lp = this.ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 420; lp.Q.value = 3;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.3 * v, t + 0.05);
    g.gain.setValueAtTime(0.3 * v, t + dur * 0.8); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    this.osc('sawtooth', f, t, dur, lp, -14); this.osc('sawtooth', f, t, dur, lp, 14);
    lp.connect(g).connect(this.bus);
  }
  private stab(t: number, fs: number[], dur: number, v: number, type: OscillatorType) {
    const lp = this.ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2400;
    const g = this.env(t, v, 0.004, dur);
    for (const f of fs) this.osc(type, f, t, dur, lp, (Math.random() - 0.5) * 10);
    lp.connect(g).connect(this.bus);
  }
  private pad(t: number, fs: number[], dur: number, v: number) {
    const lp = this.ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.setValueAtTime(400, t); lp.frequency.linearRampToValueAtTime(3000, t + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + dur * 0.4); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    for (const f of fs) { this.osc('sawtooth', f, t, dur, lp, -8); this.osc('sawtooth', f, t, dur, lp, 8); }
    lp.connect(g).connect(this.bus);
  }
  private lead(t: number, f: number, dur: number, v: number) {
    const g = this.env(t, v, 0.005, dur);
    this.osc('square', f, t, dur, g); this.osc('sawtooth', f * 1.005, t, dur, g);
    g.connect(this.bus);
  }
  private skank(t: number, fs: number[], v: number) {
    const bp = this.ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1400; bp.Q.value = 1.2;
    const g = this.env(t, v * 2, 0.002, 0.09);
    for (const f of fs) this.osc('square', f, t, 0.1, bp);
    bp.connect(g).connect(this.bus);
  }
  private organ(t: number, fs: number[], dur: number, v: number) {
    const g = this.env(t, v, 0.005, dur);
    for (const f of fs) { this.osc('sine', f * 2, t, dur, g); this.osc('sine', f * 4, t, dur, g); }
    g.connect(this.bus);
  }
  private guitar(t: number, fs: number[], dur: number, v: number) {
    const g = this.env(t, v, 0.003, dur);
    for (const f of fs) { this.osc('sawtooth', f, t, dur, g, -6); this.osc('sawtooth', f, t, dur, g, 6); }
    g.connect(this.distIn);
  }
}
