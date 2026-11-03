# The Ad Room

A separate, voluntary screen. Never part of a run, never between attempts, no autoplay, no queues. Players choose an ad, press Start, may pause or **stop any time and keep their validated seconds**, and must press Start again for the next one. Credits buy random *temporary cosmetic* rewards (odds disclosed, no cash value). Advertisers pay only for qualifying seconds actually played.

## What exists in this build

- `src/commerce/adAccounting.ts` — the accounting rules, written as a server module (injected clock and storage).
- `src/commerce/adRoom.ts` — `MockAdBackend` (that module running in the browser), the single-session playback controller, and four procedurally animated **sample** spots for fictional brands, each permanently labelled "SAMPLE — NOT A REAL AD".
- UI: selection, player, played vs. *server-eligible* timers, balance, reward redemption with odds, reward expiry, a simulated advertiser report and the ledger.

**Honesty boundary:** because the "server" runs on the device, a determined user can manipulate it. Every credit in this build is labelled simulated and not production-verified. Nothing here is billed.

## Qualification rules (implemented)

- Credit accrues per heartbeat interval as `min(server wall time elapsed, new media advanced)` — only while the session was `PLAYING` and the client reports media advancing. Client timestamps are not part of the contract.
- Paused, buffering, backgrounded (page hidden → auto-pause), and seek-back/replayed media earn nothing; credit never exceeds the creative's duration.
- Media advancing faster than real time (+25 % + 300 ms tolerance) → session **invalidated**.
- Below 1 s eligible → no credit (accidental taps).
- Daily cap 30 min/player; > 60 session starts/hour → held/invalidated (proportionate; normal viewers are unaffected).
- Sessions with no heartbeat for 45 s expire and settle on what was already validated.

All of these are provisional values in `src/commerce/config.ts`.

## Session lifecycle

```
CREATED ─start→ PLAYING ⇄ PAUSED ─stop/end→ STOPPED | COMPLETED → PENDING_VALIDATION → SETTLED | INVALIDATED
                                    (timeout) → STOPPED → …
```
Terminal sessions reject further heartbeats (no replay). One active session per player.

## Ledger

Append-only, frozen entries: `PLAYER_CREDIT`, `ADVERTISER_CHARGE`, `REDEMPTION`, `REWARD_ISSUED`, `REVERSAL`. Integer milliseconds and micro-dollars. Settlement writes **one** credit and **one** charge from the **same** validated duration (the honesty principle: an 11 s view credits 11 s and bills 11 s). Settlement and redemption are idempotent (by session id / request id). Corrections are `REVERSAL` entries referencing the original. `reconcile()` cross-checks sessions against the ledger.

## Production API contract (to implement server-side)

All endpoints authenticated (player session token), TLS, server timestamps only.

| Method | Path | Body | Result |
|---|---|---|---|
| GET | `/v1/adroom/catalog` | — | eligible creatives (id, campaign, duration, title, advertiser, disclosure) |
| POST | `/v1/adroom/sessions` | `{adId}` + `Idempotency-Key` | `{sessionId, state, mediaUrl (signed, short-lived)}`; 409 `SESSION_ACTIVE` |
| POST | `/v1/adroom/sessions/{id}/heartbeat` | `{mediaMs, playing, seq}` | `{state, eligibleMs}`; 409 if closed |
| POST | `/v1/adroom/sessions/{id}/stop` | `{mediaMs, completed}` | `Settlement` (idempotent) |
| GET | `/v1/adroom/balance` | — | `{settledMs, pendingMs}` |
| POST | `/v1/adroom/redemptions` | `{}` + `Idempotency-Key` | `{reward, expiresAt}` |
| GET | `/v1/adroom/rewards` | — | active rewards (server time) |
| GET | `/v1/advertisers/{id}/campaigns/{c}/report` | — | started, completed, partial, invalidated, billable seconds, avg watch, charges |

Production evidence should be stronger than client heartbeats: signed media segments served from the backend (the server observes segment fetch timing), monotonic `seq` numbers, platform device-integrity attestation (App Attest / Play Integrity) at session creation, and provider verification callbacks when a third-party network is used. Settlement may be asynchronous (pending → settled), which the UI already distinguishes via "eligible (server)".

## Fraud model

| Threat | Control |
|---|---|
| Edit local counter / fake elapsed time | server never trusts client time; credit ≤ server wall time; impossible advance invalidates |
| Replay a finished session | terminal states reject heartbeats; settlement idempotent |
| Parallel sessions | one active session per player |
| Bots pressing Start | rate limits, daily cap, device attestation, risk review (prod) |
| Duplicate settlement / redemption | idempotency keys, unique ledger constraints |
| Clock manipulation for rewards | expiry by server time |
| Many accounts | account verification & device signals (prod; privacy-proportionate) |

Measured: playback, not attention. No camera, gaze, or invasive tracking.

## Tested (`tests/commerce.test.ts`)

Partial-view credit and billing (11 s of 25 s), cross-ad accumulation to 75 s, one active session, paused time not credited, manipulated counters invalidated, credit ≤ real time, no double credit on replay, duration cap, idempotent settlement and redemption, closed sessions rejected, invalid/foreign session ids, expiry of abandoned sessions, reward expiry by server time, reversals, rate limiting, campaign report categories, ledger reconciliation.

## Open business questions (unchanged from brief §30)

Strict 25 s max vs. target, real per-second rate, campaign minimums, reward thresholds/odds/durations, daily limits, which ad delivery system supports partial-view accounting (likely direct sponsorship), audit process, regions and age eligibility (the Ad Room should be age-gated before launch), app-store policy review of rewarded advertising.
