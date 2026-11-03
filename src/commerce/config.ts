/**
 * Commercial parameters. EVERYTHING here is PROVISIONAL (brief §30): chosen
 * as reasonable demonstration defaults, configurable, and not a business
 * decision. Change values here — no architecture depends on them.
 */
export const COMMERCE_CONFIG = {
  /** Proposed US price per additional course. Display only; real prices come from the store. */
  coursePriceUsd: 0.99,
  /** Preferred ad length target (not enforced on third-party creatives). */
  preferredAdMaxSeconds: 25,
  /** Eligible seconds required to redeem one random temporary reward. */
  rewardThresholdSeconds: 75,
  /** Temporary reward lifetime. */
  rewardDurationDays: 7,
  /** Minimum validated seconds before a session earns anything (filters accidental taps). */
  minCreditSeconds: 1,
  /** Daily eligible viewing cap per player (abuse limiter, generous for real users). */
  dailyCapSeconds: 30 * 60,
  /** Sessions a player may start per hour before risk review kicks in. */
  maxSessionsPerHour: 60,
  /** Sessions abandoned without heartbeats expire after this long. */
  sessionTimeoutSeconds: 45,
  /** Simulated advertiser rate, micro-dollars per qualifying second ($0.002/s). */
  simulatedRateMicrosPerSecond: 2000,
} as const;

export const IS_PRODUCTION_BILLING = false; // flips only when real store + server integrations exist
