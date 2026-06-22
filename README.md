# KINGZ IPTV — native client builds

The live web app (https://kingpickz.com/iptv) is the product and installs as a PWA on every platform.
This repo also builds **native installers** in the cloud via GitHub Actions.

| Folder | Target | Output | Workflow |
|---|---|---|---|
| `shared-core/` | reusable logic (TS) | npm package | `build-core.yml` |
| `androidapp/` | Android + Fire TV | `.apk` (WebView shell) | `build-apk.yml` |
| `desktop-electron/` | Windows / macOS / Linux | `.exe / .dmg / .AppImage` | `build-desktop.yml` |

**iOS / iPadOS:** use the PWA — Safari → Share → *Add to Home Screen*. A native iOS app needs a Mac + an
Apple Developer account; the PWA covers iOS with no store.

## Releases
Tag a version (`git tag v1.0.0 && git push origin v1.0.0`) or run a workflow manually; installers publish
to the **GitHub Release**. The KINGZ server mirrors the latest Android APK at **kingpickz.com/apk** for the
Fire TV "Downloader" app. See `DISTRIBUTION.md` (how people get it) and `SIGNING.md` (turn on code signing).

## App-store survival (read first)
KINGZ ships **no channels** and is a content-agnostic player. To pass review (IPTV apps get extra scrutiny):
1. First run requires the user to add their own source — keep it that way.
2. Offer the built-in **"Load free demo channels"** (public iptv-org list) so reviewers can test with legal content.
3. Describe it as a **"media / M3U / Xtream stream player"**; avoid piracy-signal keywords, never name premium channels.
4. Publish a Privacy Policy + Terms (user is responsible for their source's legality) + a DMCA contact.

## Accounts / cost (only for the official stores)
Apple Developer $99/yr · Google Play $25 once · Microsoft Store $19 once · Amazon/Samsung/LG free.
Sideloading (APK / unsigned desktop installers) and the PWA need none of these.

## Architecture
All clients talk to the same backend on kingpickz.com: `/iptv-stream` (proxy + transcode), `/iptv-api`
(accounts/sync/EPG/billing). The native wrappers reuse the entire web UI; `shared-core` is for deeper
native-UI rewrites (Compose/SwiftUI) if ever wanted.
