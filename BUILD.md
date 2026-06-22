# Building Aurora native apps

The web app (kingpickz.com/iptv) already runs on every platform's browser and installs as a PWA.
These build **native store binaries**. The included **GitHub Actions** build them in the cloud — no local Mac needed:

1. Push this folder to a GitHub repo.
2. Actions → run the workflows:
   - **Build Desktop (Tauri)** → Windows `.msi`, macOS `.dmg`, Linux `.AppImage/.deb` (matrix, automatic).
   - **Build Android (TWA)** → installable `.apk`/`.aab` from the live PWA.
   - **Build iOS** → compiles for the simulator (proves it builds); for the App Store, open in Xcode, set your Team, Archive.
   - **Build shared-core** → the reusable TS package.
3. Download the artifacts from the workflow run.

## Signing & submission (your accounts, one-time)
- **Google Play** ($25): provide a keystore via repo secrets (ANDROID_KEYSTORE_B64, KEY_ALIAS, KEY_PASS, STORE_PASS); upload the `.aab`.
- **Apple App Store** ($99/yr): open `apple/` in Xcode (or `xcodegen generate`), set your Team, Archive → Distribute.
- **Microsoft Store** ($19): submit the Tauri `.msi`.
- **Amazon Appstore / Samsung / LG**: free; upload the APK / packaged web app.

## Local build (alternative to CI)
- Desktop: `cd desktop-tauri && npm i && npx tauri build` (needs Rust + Node + OS webview libs).
- Android: `cd android-twa && npm i -g @bubblewrap/cli && bubblewrap init --manifest https://kingpickz.com/iptv/manifest.json && bubblewrap build`.
- iOS/macOS: `cd apple && brew install xcodegen && xcodegen generate && open AuroraIPTV.xcodeproj` (needs a Mac + Xcode).
- Core: `cd shared-core && npm i && npm run build`.

Remember the store-survival rules (ships no content, legal demo, neutral metadata) in README.md.
