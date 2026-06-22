# Aurora IPTV — Native Client Scaffolds

These are **ready-to-build** scaffolds for shipping Aurora to the app stores. The live web app
(https://kingpickz.com/iptv) is the product; these wrap/extend it natively per platform.

> You build & submit these on your own machine with your own developer accounts — they cannot be
> compiled/signed from the server. Each folder has exact commands.

| Folder | Target | Output | Build needs |
|---|---|---|---|
| `shared-core/` | reusable logic (TS) | npm package `@aurora/core` | Node |
| `desktop-tauri/` | Windows / macOS / Linux | `.msi/.dmg/.AppImage/.deb` | Rust + Node + Tauri CLI |
| `android-twa/` | Android + Fire TV | Play AAB / APK | Node + Bubblewrap + JDK |
| `apple/` | iOS / iPadOS / (Catalyst macOS) | App Store IPA | macOS + Xcode |

## App-store survival (read first)
Aurora ships **no channels** and is a content-agnostic player. To pass review (IPTV apps get extra scrutiny):
1. First run requires the user to add their own source — keep it that way.
2. Give reviewers the built-in **"Load free demo channels"** (public iptv-org list) so the app is fully testable with legal content.
3. Metadata: describe it as a **"media / M3U / Xtream stream player"**. Avoid piracy-signal keywords and never name premium channels.
4. Publish a Privacy Policy + Terms (user is responsible for their source's legality) + a DMCA contact.
5. Keep the web build (kingpickz.com/iptv) as the always-available channel; stores are growth.

## Accounts / cost
Apple Developer $99/yr · Google Play $25 once · Microsoft Store $19 once · Amazon/Samsung/LG free.

## Architecture
All clients talk to the same backend on kingpickz.com: `/iptv-stream` (proxy + transcode), `/iptv-api`
(accounts/sync/EPG). The thin wrappers (Tauri/TWA/WKWebView) reuse the entire web UI; `shared-core`
is for the deeper native-UI rewrites (Compose/SwiftUI) when you want a true 10-foot experience.
