# Building KINGZ native apps

The web app (kingpickz.com/iptv) runs on every browser and installs as a PWA. The repo also builds native
binaries in the cloud — **GitHub Actions, no local machine needed for Android or desktop:**

1. Actions → run a workflow (or push a tag `v*`):
   - **Build Desktop** (`build-desktop.yml`) → Windows `.exe`, macOS `.dmg` (Intel + Apple Silicon), Linux `.AppImage`.
   - **Build Android APK** (`build-apk.yml`) → installable `.apk` (Android + Fire TV).
   - **Build shared-core** (`build-core.yml`) → the reusable TS package.
2. Installers publish to the **GitHub Release** for tag `v1.0.0`.

**iOS:** install the PWA (Safari → Share → Add to Home Screen). A native App Store build needs a Mac + an
Apple Developer account and is out of CI scope here.

## Signing & submission (your accounts — see SIGNING.md)
Pipelines auto-sign when you add the cert secrets; otherwise they ship sideloadable (unsigned / debug-signed) builds.
- **Google Play** ($25): add the Android keystore secrets (`ANDROID_KEYSTORE_B64`, `ANDROID_STORE_PASS`,
  `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASS`) → CI ships a signed APK.
- **Apple App Store** ($99/yr): needs a Mac + Xcode + your signing identity.
- **Microsoft Store** ($19): submit the `.exe`.
- **Amazon / Samsung / LG**: free; upload the `.apk`.

## Local build (alternative to CI)
- Android: `cd androidapp && gradle assembleDebug` (needs JDK 17 + Android SDK).
- Desktop: `cd desktop-electron && npm i && npx electron-builder`.
- Core: `cd shared-core && npm i && npm run build`.

Remember the store-survival rules (ships no content, legal demo, neutral metadata) in README.md.
