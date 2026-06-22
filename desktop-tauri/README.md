# Aurora Desktop (Tauri) — Windows / macOS / Linux

A native desktop shell around the live web app. Tauri uses the OS WebView (WebView2 / WKWebView / WebKitGTK).

## Build
```
npm install
npm run build        # produces installers in src-tauri/target/release/bundle/
```
Outputs: `.msi`/`.exe` (Windows), `.dmg`/`.app` (macOS, run on a Mac), `.AppImage`/`.deb` (Linux).

## Notes
- Add an icon at `src-tauri/icons/icon.png` (and run `npm run tauri icon icon.png` to generate all sizes).
- For best codec coverage on Linux (HEVC/AC3), the server `/iptv-stream/transcode` fallback already handles it.
- Windows Store (MSIX): `tauri build --bundles msi` then package; or submit the `.msi` via the Microsoft Store dashboard ($19 one-time).
