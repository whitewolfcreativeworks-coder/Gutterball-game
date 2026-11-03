# Courses, prices and ownership

Principle: *players purchase additional experiences, not relief from inconvenience.* The Wood course is complete, free, permanent, and never shows ads. Purchases and the Ad Room are independent of each other.

## Catalog (`src/commerce/catalog.ts`)

12 entries (Wood free + 11 at a provisional $0.99), each with world, course name, tagline, what its preview shows off, store product id (`com.gutterball.course.<id>`), display price and status (`designed` / `prototype`). Adding a course = adding an entry, a layout and (if new) a material profile. The UI reads only the catalog.

## Separation of concerns

| Concern | Where |
|---|---|
| Course metadata | `catalog.ts` |
| Price presentation | `formatPrice()` — will prefer the store's localised price string |
| Store product ids | `CourseEntry.productId` |
| Purchase state / verified entitlement | `EntitlementService` + provider |
| Course assets | generated at load from the layout (no download step needed yet) |
| Availability | `EntitlementService.isEntitled(courseId)` — the only gate the game checks |

## Providers (`src/commerce/entitlements.ts`)

- `DevEntitlementSimulator` (this build): purchases are **simulated**, never charge, and are labelled "simulated" in the UI. Each grant carries a simulated receipt that must verify; a hand-edited ownership flag without a valid receipt is ignored (tested). This demonstrates the verification path; it is not security.
- `StoreKitProvider` (stub): production iOS. Requires the native build with StoreKit 2, `Transaction.currentEntitlements` for restore, and server-side JWS verification.
- Play Billing provider (to add): purchase tokens verified server-side via the Google Play Developer API, acknowledged within 3 days.

## Previews

Course previews are live in-engine demonstrations: the autopilot plays the locked course with its real physics, sound and visuals, starting near a signature section, looping every 18 s. Previewing never grants ownership (the preview path never touches entitlements).

## Tested

Free Wood access, locked courses stay locked, purchase persistence and restore, duplicate purchase is a no-op, store failure leaves the course locked, forged local flags rejected, catalog integrity.
