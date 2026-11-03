# Mobile platforms

## Browser (works now)

`npm run build` produces a static site in `dist/` with relative paths. Host it anywhere over **HTTPS** (iOS only grants motion sensors to secure pages).

- iPhone/iPad Safari: motion permission is requested when you choose tilt controls (iOS 13+ `DeviceOrientationEvent.requestPermission`). Audio starts on first tap. Add to Home Screen for full-screen play (manifest included).
- Android Chrome: tilt works without a prompt; vibration haptics work after the first tap.
- Desktop: keyboard controls.

A GitHub Actions workflow (`.github/workflows/pages.yml`) is included to publish `dist/` to GitHub Pages. It runs only on manual dispatch until Pages is enabled for the repository (Settings → Pages → Source: GitHub Actions).

**Limits of browser testing:** browsers don't expose Core Haptics; iOS Safari has no `navigator.vibrate`; WebGL performance on older phones is untested.

## Native iOS / Android (next step)

Plan: wrap the same build with [Capacitor](https://capacitorjs.com) (MIT).

```bash
npm i @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android @capacitor/haptics @capacitor/motion
npx cap init Gutterball com.gutterball.app --web-dir dist
npm run build && npx cap add ios && npx cap add android
npx cap open ios        # requires macOS + Xcode; sign with your Apple Developer team
npx cap open android    # Android Studio
```

Native-only work:
1. **Advanced haptics** — implement a `HapticDriver` using Core Haptics (`CHHapticEngine` transient/continuous events with intensity + sharpness) via a small Capacitor plugin, and set `window.__GUTTERBALL_NATIVE_HAPTICS__` before the game boots. Android: `VibrationEffect.createWaveform` with amplitudes.
2. **Purchases** — StoreKit 2 / Play Billing via a plugin (e.g. RevenueCat's Capacitor SDK or a custom plugin) implementing `EntitlementProvider`; server-side receipt validation.
3. **Orientation lock** to portrait in the native project; keep the screen awake during runs.

Requirements not available in this build environment: macOS/Xcode, an Apple Developer account and signing identity, App Store Connect products, Android SDK/keystore, Play Console products. Nothing was signed, uploaded or purchased.
