/**
 * Material profiles: one per physical world.
 *
 * A profile bundles physical, acoustic, haptic and visual parameters. The
 * ball controller never branches on a material id — it only reads these
 * numbers plus an optional `medium` model for fluids and granular surfaces.
 * Adding a world means adding a profile, not editing the physics.
 *
 * All values are tuned for gameplay feel at game scale and are documented as
 * provisional in docs/PHYSICS.md.
 */
export type MediumKind = 'none' | 'water' | 'sand' | 'mud' | 'snow' | 'grating';

export interface AcousticProfile {
  /** Resonant bands of the rolling texture: [centre Hz, Q, gain]. */
  rollBands: Array<[number, number, number]>;
  rumbleHz: number;      // low structural rumble centre
  rollGain: number;      // overall rolling loudness
  brightness: number;    // 0..1 how much high frequency texture
  slideHz: number;       // sliding scrape band centre
  slideQ: number;
  slideGain: number;
  squeak?: number;       // 0..1 tonal squeal while slipping (rubber)
  impactModes: Array<[number, number]>; // [Hz, decay seconds]
  impactNoise: number;   // noise vs tone ratio in impacts 0..1
  seamGain: number;      // loudness of joint clicks
  /** 'skate': each joint is a skateboard's ka-CHUNK (front wheels, then back). */
  seamStyle?: 'click' | 'skate';
  /** The rolling bubbles as you roll (an underwater world). */
  bubbleRoll?: number;
  /** Whole-world underwater muffling: low-pass corner (Hz). */
  underwater?: number;
  reverb: number;        // base reverb send
}

export interface HapticProfile {
  rollTexture: number;   // 0..1 intensity of continuous rolling texture
  seamPulse: number;     // ms pulse at joints
  impactScale: number;   // multiplier for impact pulses
}

export interface VisualProfile {
  surface: string;       // texture generator key
  tint: number;          // base colour
  roughness: number;
  metalness: number;
  transparent?: boolean;
  opacity?: number;
  sky: { turbidity: number; rayleigh: number; elevation: number; azimuth: number };
  fog: number;
  fogDensity: number;
  ground: number;
  scenery: 'forest' | 'city' | 'industrial' | 'glacier' | 'tropical' | 'canyon' | 'neon' | 'desert' | 'jungle' | 'temple' | 'alpine' | 'reef';
  /** The whole world is underwater (src/render/underwater.ts). */
  underwater?: boolean;
  water?: number;        // water colour if medium is water
}

export interface MaterialProfile {
  id: string;
  name: string;
  muStatic: number;
  muKinetic: number;
  rollingResistance: number; // dimensionless Crr
  restitution: number;
  restitutionThreshold: number; // m/s below which impacts don't bounce
  spinDamping: number;          // drilling / spin friction
  compliance: number;           // 0..1 softness (reduces impact sharpness)
  seamSpacing: number;          // metres between joints/seams (0 = none)
  medium: MediumKind;
  mediumParams?: Record<string, number>;
  acoustic: AcousticProfile;
  haptic: HapticProfile;
  visual: VisualProfile;
}

const sky = (turbidity: number, rayleigh: number, elevation: number, azimuth: number) => ({ turbidity, rayleigh, elevation, azimuth });

export const MATERIALS: Record<string, MaterialProfile> = {
  wood: {
    id: 'wood', name: 'Wood',
    muStatic: 0.55, muKinetic: 0.38, rollingResistance: 0.012, restitution: 0.32, restitutionThreshold: 1.2,
    spinDamping: 0.6, compliance: 0.35, seamSpacing: 2.4, medium: 'none',
    acoustic: {
      rollBands: [[95, 1.6, 1.0], [210, 2.5, 0.75], [460, 3.5, 0.35], [1100, 4, 0.12]],
      rumbleHz: 70, rollGain: 0.9, brightness: 0.35,
      slideHz: 1400, slideQ: 1.2, slideGain: 0.55,
      impactModes: [[180, 0.16], [410, 0.09], [760, 0.05], [1350, 0.03]], impactNoise: 0.45,
      seamGain: 0.55, reverb: 0.18,
    },
    haptic: { rollTexture: 0.5, seamPulse: 9, impactScale: 1 },
    visual: { surface: 'wood', tint: 0xc08850, roughness: 0.62, metalness: 0, sky: sky(4, 1.6, 34, 200), fog: 0xb9cfd6, fogDensity: 0.0042, ground: 0x41603a, scenery: 'forest' },
  },
  concrete: {
    id: 'concrete', name: 'Concrete',
    muStatic: 0.75, muKinetic: 0.55, rollingResistance: 0.022, restitution: 0.25, restitutionThreshold: 1.0,
    spinDamping: 0.9, compliance: 0.1, seamSpacing: 8, medium: 'none',
    acoustic: {
      // SKATEBOARD ON CONCRETE: urethane wheels roaring on rough slab: a broad, warm
      // low-mid roar with grit on top, no bright hiss; and the ka-CHUNK over every
      // expansion joint. Slides are a powerslide's rasp.
      rollBands: [[150, 0.9, 0.85], [420, 0.8, 1.0], [1050, 1.0, 0.5], [2600, 0.9, 0.32]],
      rumbleHz: 95, rollGain: 1.1, brightness: 0.45,
      slideHz: 1500, slideQ: 0.7, slideGain: 0.9,
      impactModes: [[140, 0.06], [620, 0.04], [1900, 0.02]], impactNoise: 0.75,
      seamGain: 0.75, seamStyle: 'skate', reverb: 0.3,
    },
    haptic: { rollTexture: 0.75, seamPulse: 7, impactScale: 1.1 },
    visual: { surface: 'concrete', tint: 0xb4b1aa, roughness: 0.9, metalness: 0, sky: sky(8, 1.2, 15, 200), fog: 0xc8c6c0, fogDensity: 0.0038, ground: 0x6c6a64, scenery: 'city' },
  },
  metal: {
    id: 'metal', name: 'Sheet Metal',
    muStatic: 0.35, muKinetic: 0.22, rollingResistance: 0.006, restitution: 0.45, restitutionThreshold: 1.0,
    spinDamping: 0.3, compliance: 0.05, seamSpacing: 3.0, medium: 'none',
    acoustic: {
      rollBands: [[340, 6, 0.6], [880, 9, 0.55], [2100, 10, 0.4], [4300, 8, 0.25]],
      rumbleHz: 90, rollGain: 0.8, brightness: 0.8,
      slideHz: 3200, slideQ: 3, slideGain: 0.7,
      impactModes: [[520, 0.5], [1240, 0.35], [2710, 0.22], [4400, 0.12]], impactNoise: 0.15,
      seamGain: 0.7, reverb: 0.35,
    },
    haptic: { rollTexture: 0.35, seamPulse: 6, impactScale: 1.2 },
    visual: { surface: 'metal', tint: 0xaab4bf, roughness: 0.28, metalness: 0.95, sky: sky(10, 0.8, 8, 250), fog: 0x8a96a8, fogDensity: 0.0045, ground: 0x2c3138, scenery: 'industrial' },
  },
  ice: {
    id: 'ice', name: 'Ice',
    muStatic: 0.06, muKinetic: 0.03, rollingResistance: 0.003, restitution: 0.2, restitutionThreshold: 1.4,
    spinDamping: 0.05, compliance: 0.05, seamSpacing: 0, medium: 'none',
    acoustic: {
      rollBands: [[2200, 2, 0.4], [5200, 2.5, 0.3]],
      rumbleHz: 60, rollGain: 0.35, brightness: 0.9,
      slideHz: 5200, slideQ: 1.5, slideGain: 0.6,
      impactModes: [[900, 0.12], [2300, 0.08], [4100, 0.05]], impactNoise: 0.5,
      seamGain: 0.0, reverb: 0.4,
    },
    haptic: { rollTexture: 0.08, seamPulse: 0, impactScale: 1 },
    visual: { surface: 'ice', tint: 0x4f7fae, roughness: 0.06, metalness: 0.1, transparent: true, opacity: 0.88, sky: sky(2, 2.5, 12, 120), fog: 0xdde9f2, fogDensity: 0.004, ground: 0xe8eef3, scenery: 'glacier' },
  },
  water: {
    id: 'water', name: 'Water',
    muStatic: 0.4, muKinetic: 0.3, rollingResistance: 0.01, restitution: 0.15, restitutionThreshold: 1.5,
    spinDamping: 1.5, compliance: 0.6, seamSpacing: 0, medium: 'water',
    mediumParams: { depth: 1.35, flow: 14, drag: 1.4, buoyancy: 0.28 },
    acoustic: {
      rollBands: [[300, 0.8, 0.6], [900, 1, 0.5], [2600, 1.2, 0.35]],
      rumbleHz: 50, rollGain: 0.5, brightness: 0.4,
      slideHz: 1800, slideQ: 0.8, slideGain: 0.4,
      impactModes: [[350, 0.08], [800, 0.05]], impactNoise: 0.9,
      seamGain: 0.0, reverb: 0.25, bubbleRoll: 1, underwater: 2400,
    },
    haptic: { rollTexture: 0.3, seamPulse: 0, impactScale: 0.6 },
    visual: { surface: 'aqueduct', tint: 0xd9cdb2, roughness: 0.7, metalness: 0, sky: sky(3, 1.8, 35, 140), fog: 0x0f6a84, fogDensity: 0.0068, ground: 0xc8ae7c, scenery: 'reef', water: 0x3fb7c9, underwater: true },
  },
  glass: {
    id: 'glass', name: 'Glass',
    muStatic: 0.45, muKinetic: 0.3, rollingResistance: 0.004, restitution: 0.5, restitutionThreshold: 0.9,
    spinDamping: 0.2, compliance: 0.02, seamSpacing: 8, medium: 'none',
    acoustic: {
      rollBands: [[1800, 8, 0.3], [3600, 10, 0.25]],
      rumbleHz: 120, rollGain: 0.4, brightness: 1.0,
      slideHz: 4200, slideQ: 5, slideGain: 0.45,
      impactModes: [[1650, 0.6], [3900, 0.4], [6100, 0.25]], impactNoise: 0.05,
      seamGain: 0.5, reverb: 0.3,
    },
    haptic: { rollTexture: 0.12, seamPulse: 5, impactScale: 1.3 },
    visual: { surface: 'glass', tint: 0xcfeff5, roughness: 0.02, metalness: 0, transparent: true, opacity: 0.35, sky: sky(2, 1.2, 28, 90), fog: 0xd4b89a, fogDensity: 0.0028, ground: 0x9b6b45, scenery: 'canyon' },
  },
  rubber: {
    id: 'rubber', name: 'Rubber',
    muStatic: 1.05, muKinetic: 0.85, rollingResistance: 0.03, restitution: 0.62, restitutionThreshold: 0.6,
    spinDamping: 1.2, compliance: 0.8, seamSpacing: 0, medium: 'none',
    acoustic: {
      rollBands: [[60, 1, 1.0], [180, 1.5, 0.4]],
      rumbleHz: 45, rollGain: 0.55, brightness: 0.1,
      slideHz: 1900, slideQ: 12, slideGain: 0.6, squeak: 0.9,
      impactModes: [[75, 0.12], [150, 0.07]], impactNoise: 0.3,
      seamGain: 0, reverb: 0.15,
    },
    haptic: { rollTexture: 0.25, seamPulse: 0, impactScale: 0.85 },
    visual: { surface: 'rubber', tint: 0x575b68, roughness: 0.8, metalness: 0, sky: sky(10, 1.2, 5, 200), fog: 0x3a2a5a, fogDensity: 0.0035, ground: 0x1c1d33, scenery: 'neon' },
  },
  sand: {
    id: 'sand', name: 'Sand',
    muStatic: 0.7, muKinetic: 0.6, rollingResistance: 0.05, restitution: 0.05, restitutionThreshold: 2.0,
    spinDamping: 1.5, compliance: 0.9, seamSpacing: 0, medium: 'sand',
    mediumParams: { sinkDrag: 0.06, looseFactor: 2.2, firmHalfWidth: 1.1 },
    acoustic: {
      rollBands: [[1600, 0.6, 0.6], [4200, 0.7, 0.45]],
      rumbleHz: 40, rollGain: 0.6, brightness: 0.7,
      slideHz: 3000, slideQ: 0.5, slideGain: 0.5,
      impactModes: [[120, 0.04]], impactNoise: 1.0,
      seamGain: 0, reverb: 0.1,
    },
    haptic: { rollTexture: 0.55, seamPulse: 0, impactScale: 0.5 },
    visual: { surface: 'sand', tint: 0xe0bb7c, roughness: 0.95, metalness: 0, sky: sky(6, 1.0, 40, 180), fog: 0xe8cfa0, fogDensity: 0.003, ground: 0xd8a868, scenery: 'desert' },
  },
  mud: {
    id: 'mud', name: 'Mud',
    muStatic: 0.9, muKinetic: 0.5, rollingResistance: 0.06, restitution: 0.03, restitutionThreshold: 2.5,
    spinDamping: 2.0, compliance: 0.95, seamSpacing: 0, medium: 'mud',
    mediumParams: { viscous: 0.35, gripVariation: 0.55 },
    acoustic: {
      rollBands: [[110, 1.5, 0.9], [380, 2, 0.6]],
      rumbleHz: 50, rollGain: 0.7, brightness: 0.2,
      slideHz: 700, slideQ: 2, slideGain: 0.7,
      impactModes: [[90, 0.1], [260, 0.06]], impactNoise: 0.9,
      seamGain: 0, reverb: 0.12,
    },
    haptic: { rollTexture: 0.6, seamPulse: 0, impactScale: 0.55 },
    visual: { surface: 'mud', tint: 0x6a4a30, roughness: 0.55, metalness: 0, sky: sky(12, 2.5, 18, 210), fog: 0x7c8a6c, fogDensity: 0.006, ground: 0x2e4a24, scenery: 'jungle' },
  },
  stone: {
    id: 'stone', name: 'Polished Stone',
    muStatic: 0.4, muKinetic: 0.28, rollingResistance: 0.005, restitution: 0.4, restitutionThreshold: 1.0,
    spinDamping: 0.3, compliance: 0.02, seamSpacing: 5, medium: 'none',
    acoustic: {
      rollBands: [[260, 3, 0.7], [1300, 4, 0.4], [3400, 4, 0.2]],
      rumbleHz: 80, rollGain: 0.6, brightness: 0.6,
      slideHz: 2800, slideQ: 2, slideGain: 0.5,
      impactModes: [[700, 0.14], [1900, 0.08], [3600, 0.05]], impactNoise: 0.3,
      seamGain: 0.45, reverb: 0.45,
    },
    haptic: { rollTexture: 0.15, seamPulse: 6, impactScale: 1.2 },
    visual: { surface: 'marble', tint: 0xcfc3ae, roughness: 0.12, metalness: 0, sky: sky(3, 1.4, 30, 130), fog: 0xe6dcc8, fogDensity: 0.0032, ground: 0xb8a888, scenery: 'temple' },
  },
  grating: {
    id: 'grating', name: 'Steel Grating',
    muStatic: 0.5, muKinetic: 0.35, rollingResistance: 0.018, restitution: 0.4, restitutionThreshold: 0.8,
    spinDamping: 0.5, compliance: 0.1, seamSpacing: 0.3, medium: 'grating',
    mediumParams: { barSpacing: 0.3, kick: 0.05 },
    acoustic: {
      rollBands: [[620, 4, 0.5], [1900, 5, 0.45], [3700, 6, 0.3]],
      rumbleHz: 100, rollGain: 0.6, brightness: 0.8,
      slideHz: 3400, slideQ: 2.5, slideGain: 0.6,
      impactModes: [[640, 0.3], [1580, 0.2], [3300, 0.12]], impactNoise: 0.2,
      seamGain: 0.8, reverb: 0.3,
    },
    haptic: { rollTexture: 0.2, seamPulse: 5, impactScale: 1.1 },
    visual: { surface: 'grating', tint: 0x8c8f93, roughness: 0.45, metalness: 0.85, transparent: true, sky: sky(14, 0.6, 10, 260), fog: 0x5a5f66, fogDensity: 0.005, ground: 0x1f2226, scenery: 'industrial' },
  },
  snow: {
    id: 'snow', name: 'Snow',
    muStatic: 0.35, muKinetic: 0.18, rollingResistance: 0.035, restitution: 0.05, restitutionThreshold: 2.5,
    spinDamping: 0.9, compliance: 0.95, seamSpacing: 0, medium: 'snow',
    mediumParams: { powderDrag: 0.09, packedHalfWidth: 1.4 },
    acoustic: {
      rollBands: [[900, 0.8, 0.5], [2600, 0.9, 0.35]],
      rumbleHz: 40, rollGain: 0.5, brightness: 0.5,
      slideHz: 2200, slideQ: 0.7, slideGain: 0.4,
      impactModes: [[110, 0.05]], impactNoise: 1.0,
      seamGain: 0, reverb: 0.2,
    },
    haptic: { rollTexture: 0.3, seamPulse: 0, impactScale: 0.5 },
    visual: { surface: 'snow', tint: 0xa3b4ca, roughness: 0.92, metalness: 0, sky: sky(3, 2.2, 20, 150), fog: 0xe6edf3, fogDensity: 0.005, ground: 0xf0f4f8, scenery: 'alpine' },
  },
};

export const MATERIAL_ORDER = ['wood', 'concrete', 'metal', 'ice', 'water', 'glass', 'rubber', 'sand', 'mud', 'stone', 'grating', 'snow'];
