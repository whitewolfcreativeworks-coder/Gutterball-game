/**
 * Course ownership.
 *
 * Separates (brief §24): course metadata (catalog), price presentation,
 * store product ids, purchase state, *verified* entitlement, downloaded
 * assets and availability.
 *
 * The game asks one question — `isEntitled(courseId)` — of an
 * EntitlementService backed by a provider:
 *   - DevEntitlementSimulator: this build. Purchases are simulated, never
 *     charge money, and are labelled SIMULATED everywhere they appear. A
 *     simulated receipt is verified against the simulator's own signing key —
 *     demonstrating the verification path, *not* providing security.
 *   - StoreKitProvider / PlayBillingProvider: production stubs. Real
 *     ownership must come from the platform store (StoreKit 2 transaction
 *     verification / Play Billing purchase tokens verified server-side).
 *
 * A locally edited flag is never treated as proof of purchase: entitlements
 * without a receipt that verifies are ignored.
 */

export interface Entitlement {
  courseId: string;
  productId: string;
  source: 'free' | 'simulated' | 'app-store' | 'play-store';
  receipt?: string;
  grantedAt: number;
}

export interface PurchaseResult { ok: boolean; entitlement?: Entitlement; error?: string; alreadyOwned?: boolean; }

export interface EntitlementProvider {
  readonly kind: 'dev-simulator' | 'app-store' | 'play-billing';
  readonly isProduction: boolean;
  purchase(productId: string, courseId: string): Promise<PurchaseResult>;
  restore(): Promise<Entitlement[]>;
  verify(e: Entitlement): boolean;
  reset?(): void;
}

export interface KV { getItem(k: string): string | null; setItem(k: string, v: string): void; removeItem(k: string): void }

const STORAGE_KEY = 'gb.dev.simulatedEntitlements.v1';
const SIM_KEY = 'gutterball-dev-simulator-key'; // NOT a secret; simulation only

function sign(s: string) {
  // FNV-1a over key + payload — a checksum to demonstrate verification flow, not cryptography
  let h = 0x811c9dc5;
  const str = SIM_KEY + '|' + s;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, '0');
}

export class DevEntitlementSimulator implements EntitlementProvider {
  readonly kind = 'dev-simulator' as const;
  readonly isProduction = false;
  private store: KV;
  failNext = false; // for testing failure recovery
  constructor(store?: KV) {
    this.store = store ?? (typeof localStorage !== 'undefined' ? localStorage : memoryStore());
  }
  private read(): Entitlement[] {
    try { return JSON.parse(this.store.getItem(STORAGE_KEY) ?? '[]'); } catch { return []; }
  }
  private write(list: Entitlement[]) { this.store.setItem(STORAGE_KEY, JSON.stringify(list)); }
  async purchase(productId: string, courseId: string): Promise<PurchaseResult> {
    await new Promise((r) => setTimeout(r, 350)); // simulated store sheet
    if (this.failNext) { this.failNext = false; return { ok: false, error: 'Simulated store error — nothing was charged.' }; }
    const list = this.read();
    const existing = list.find((e) => e.productId === productId && this.verify(e));
    if (existing) return { ok: true, entitlement: existing, alreadyOwned: true };
    const grantedAt = Date.now();
    const payload = `${courseId}|${productId}|${grantedAt}`;
    const e: Entitlement = { courseId, productId, source: 'simulated', grantedAt, receipt: `SIM.${payload}.${sign(payload)}` };
    list.push(e);
    this.write(list);
    return { ok: true, entitlement: e };
  }
  async restore(): Promise<Entitlement[]> { return this.read().filter((e) => this.verify(e)); }
  verify(e: Entitlement): boolean {
    if (e.source !== 'simulated' || !e.receipt) return false;
    const m = /^SIM\.(.+)\.([0-9a-f]{8})$/.exec(e.receipt);
    if (!m) return false;
    const [courseId, productId, ts] = m[1].split('|');
    return courseId === e.courseId && productId === e.productId && Number(ts) === e.grantedAt && sign(m[1]) === m[2];
  }
  reset() { this.store.removeItem(STORAGE_KEY); }
}

/** Production placeholder — requires a native wrapper with StoreKit 2 + server receipt validation. */
export class StoreKitProvider implements EntitlementProvider {
  readonly kind = 'app-store' as const;
  readonly isProduction = true;
  async purchase(): Promise<PurchaseResult> { return { ok: false, error: 'App Store purchasing requires the native iOS build (not available on the web).' }; }
  async restore(): Promise<Entitlement[]> { return []; }
  verify(): boolean { return false; }
}

export function memoryStore() {
  const m = new Map<string, string>();
  return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => { m.set(k, v); }, removeItem: (k: string) => { m.delete(k); } };
}

export class EntitlementService {
  private owned = new Map<string, Entitlement>();
  private listeners: Array<() => void> = [];
  constructor(readonly provider: EntitlementProvider, private freeCourses: string[]) {}

  async init() { await this.refresh(); }

  async refresh() {
    this.owned.clear();
    for (const c of this.freeCourses) this.owned.set(c, { courseId: c, productId: 'free', source: 'free', grantedAt: 0 });
    for (const e of await this.provider.restore()) if (this.provider.verify(e)) this.owned.set(e.courseId, e);
    this.listeners.forEach((l) => l());
  }

  isEntitled(courseId: string) { return this.owned.has(courseId); }
  entitlement(courseId: string) { return this.owned.get(courseId); }

  async purchase(courseId: string, productId: string): Promise<PurchaseResult> {
    if (this.isEntitled(courseId)) return { ok: true, alreadyOwned: true, entitlement: this.owned.get(courseId) };
    const r = await this.provider.purchase(productId, courseId);
    if (r.ok && r.entitlement && this.provider.verify(r.entitlement)) this.owned.set(courseId, r.entitlement);
    else if (r.ok) return { ok: false, error: 'Purchase could not be verified.' };
    this.listeners.forEach((l) => l());
    return r;
  }

  async restore() { await this.refresh(); return [...this.owned.values()].filter((e) => e.source !== 'free'); }

  onChange(fn: () => void) { this.listeners.push(fn); }
}
