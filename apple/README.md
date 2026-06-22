# Aurora Apple (iOS / iPadOS / Catalyst) — App Store

SwiftUI + WKWebView shell around the live web app (inline playback enabled).

## Build (on a Mac with Xcode)
1. Xcode → New Project → iOS App (SwiftUI). Bundle id `com.kingpickz.aurora`.
2. Replace the generated `App` + `ContentView` with the files in `AuroraIPTV/`. Merge the `Info.plist` keys.
3. Set your Team (Apple Developer $99/yr) for signing.
4. Run on device/simulator; Archive → Distribute → App Store Connect.

## Review tips (IPTV apps get scrutiny)
- Provide a demo reviewer note pointing them at the in-app **"Load free demo channels"** button.
- Add a Privacy Policy URL + describe as an "M3U/Xtream media player". Ships no content.
- For a richer native experience later: SwiftUI + AVPlayer/VLCKit using `../shared-core` logic; tvOS target for Apple TV.
- `NSAllowsArbitraryLoads` is set because IPTV providers often use plain HTTP / bad TLS; the server proxy
  also re-origins streams over HTTPS, so you can tighten ATS to just kingpickz.com if all playback is proxied.
