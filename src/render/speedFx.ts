import { WebGLRenderer, Scene, Camera, HalfFloatType, Vector2 } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

/**
 * Screen-space speed effects: radial motion blur toward the vanishing
 * point, a vignette that "tunnels" the view, and slight chromatic
 * fringing at the edges — all scaled by speed and the player's setting.
 * The centre of the screen (where the ball is) stays sharp.
 */
const SpeedShader = {
  uniforms: {
    tDiffuse: { value: null },
    uAmount: { value: 0 },     // 0..1
    uCenter: { value: new Vector2(0.5, 0.55) },
    uVignette: { value: 0.3 },
    uTint: { value: 0 },       // magnet energy tint 0..1
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float uAmount; uniform vec2 uCenter; uniform float uVignette; uniform float uTint;
    varying vec2 vUv;
    void main() {
      vec2 d = vUv - uCenter;
      float r = length(d);
      // blur grows toward the edges; centre stays crisp
      float k = uAmount * smoothstep(0.12, 0.75, r) * 0.09;
      vec3 acc = vec3(0.0);
      for (int i = 0; i < 8; i++) {
        float f = float(i) / 7.0;
        vec2 uv = vUv - d * k * f;
        // chromatic fringe: channels sampled at slightly different radii
        acc.r += texture2D(tDiffuse, uv + d * k * 0.12).r;
        acc.g += texture2D(tDiffuse, uv).g;
        acc.b += texture2D(tDiffuse, uv - d * k * 0.12).b;
      }
      vec3 col = acc / 8.0;
      float vig = 1.0 - uVignette * smoothstep(0.35, 0.95, r * 1.25);
      col *= vig;
      // grade: deeper blacks and a little more punch
      col = max(col - 0.015, 0.0) * 1.04;
      col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
      col += vec3(0.05, 0.35, 0.45) * uTint * smoothstep(0.4, 1.0, r * 1.25) * 0.35;
      gl_FragColor = vec4(col, 1.0);
    }`,
};

export class SpeedEffects {
  private composer: EffectComposer;
  private pass: ShaderPass;
  private renderPass: RenderPass;
  private bloom: UnrealBloomPass;
  constructor(private renderer: WebGLRenderer, scene: Scene, camera: Camera) {
    this.composer = new EffectComposer(renderer);
    this.composer.renderTarget1.texture.type = HalfFloatType;
    this.composer.renderTarget2.texture.type = HalfFloatType;
    this.renderPass = new RenderPass(scene, camera);
    this.pass = new ShaderPass(SpeedShader);
    this.composer.addPass(this.renderPass);
    // bloom: only the brightest features glow (threshold high), so blacks stay black
    // sanitize first: a single NaN/Inf pixel would be smeared across the whole screen by the blur
    this.composer.addPass(new ShaderPass({
      uniforms: { tDiffuse: { value: null } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform sampler2D tDiffuse; varying vec2 vUv;
        void main(){ vec4 c = texture2D(tDiffuse, vUv);
          if (any(isnan(c)) || any(isinf(c))) c = vec4(0.0, 0.0, 0.0, 1.0);
          gl_FragColor = vec4(clamp(c.rgb, 0.0, 48.0), 1.0); }`,
    }));
    this.bloom = new UnrealBloomPass(new Vector2(256, 256), 0.5, 0.3, 0.9);
    this.composer.addPass(this.bloom);
    this.composer.addPass(this.pass);
    this.composer.addPass(new OutputPass());
  }
  setScene(scene: Scene, camera: Camera) { this.renderPass.scene = scene; this.renderPass.camera = camera; }
  setSize(w: number, h: number) { this.composer.setPixelRatio(this.renderer.getPixelRatio()); this.composer.setSize(w, h); }
  render(amount: number, vignette: number, tint: number) {
    const u = this.pass.uniforms;
    u.uAmount.value = amount;
    u.uVignette.value = vignette;
    u.uTint.value = tint;
    this.composer.render();
  }
}
