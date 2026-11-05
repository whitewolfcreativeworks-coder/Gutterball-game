/**
 * The Physical Sensory Engine contract.
 *
 * The simulation is the single source of truth. Each physics step updates a
 * `SensoryState` snapshot and may emit discrete `SensoryEvent`s. Rendering,
 * audio and haptics only *interpret* this stream — none of them guesses what
 * the ball is doing on its own.
 */
export type SensoryEventType =
  | 'ROLLING_CONTACT'
  | 'SLIDING_CONTACT'
  | 'SURFACE_SEAM_CROSSING'
  | 'COLLISION_IMPACT'
  | 'AIRBORNE_START'
  | 'AIRBORNE_END'
  | 'MAGNET_ENGAGED'
  | 'MAGNET_RELEASED'
  | 'MAGNETIC_CAPTURE'
  | 'WATER_ENTRY'
  | 'WATER_EXIT'
  | 'SURFACE_MATERIAL_CHANGE'
  | 'JUMP'
  | 'DOUBLE_JUMP'
  | 'PUSH'
  | 'TURBO_ARMED'
  | 'TURBO_START'
  | 'TURBO_END'
  | 'TUNNEL_ENTER'
  | 'TUNNEL_EXIT'
  | 'LIFT_CLACK'
  | 'TRIGGER_PAD'
  | 'HOLO_BOOST';

export interface SensoryEvent {
  type: SensoryEventType;
  /** Simulation time of the event (seconds). */
  t: number;
  /** Normalised strength 0..1 (impulse, crossing intensity, etc). */
  intensity: number;
  /** Raw physical magnitude (e.g. normal impact speed in m/s). */
  magnitude?: number;
  /** 'track' | 'obstacle' */
  source?: string;
  material?: string;
}

export type RollingState = 'airborne' | 'rolling' | 'sliding' | 'skidding';

export interface SensoryState {
  t: number;
  speed: number;            // |v| m/s
  angularSpeed: number;     // |w| rad/s
  contact: boolean;
  rollingState: RollingState;
  normalAccel: number;      // contact normal force / mass, m/s^2 (smoothed)
  slipSpeed: number;        // tangential slip at contact point, m/s
  material: string;
  airborneTime: number;
  magnetActive: boolean;
  magnetForce: number;      // 0..1 normalised
  magnetEnergy: number;     // 0..1
  boosting: boolean;        // magnet held while on the track
  pushCombo?: number;       // swipes in the current combo (0..3)
  turboArmed?: boolean;     // combo + magnet hold done: the next flick fires turbo
  turboActive?: boolean;
  submersion: number;       // 0..1
  inTunnel: boolean;
  lateral: number;          // ball x in gutter (m)
  height: number;           // ball y in gutter (m)
  s: number;                // distance along track
  driveLevel: number;       // 0..2
}

export type SensoryListener = (state: SensoryState, events: SensoryEvent[]) => void;

export class SensoryBus {
  private listeners: SensoryListener[] = [];
  subscribe(fn: SensoryListener) {
    this.listeners.push(fn);
    return () => { this.listeners = this.listeners.filter((l) => l !== fn); };
  }
  publish(state: SensoryState, events: SensoryEvent[]) {
    for (const l of this.listeners) l(state, events);
  }
}
