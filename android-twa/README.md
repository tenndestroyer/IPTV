# Aurora Android (Trusted Web Activity) — Play + Fire TV

Wraps the PWA at kingpickz.com/iptv as a native Android app. Fastest path to a Play Store AAB.

## Build
```
npm i -g @bubblewrap/cli
bubblewrap init --manifest https://kingpickz.com/iptv/manifest.json   # or use the twa-manifest.json here
bubblewrap build      # -> app-release-bundle.aab  +  app-release-signed.apk
```

## Digital Asset Links (required so the URL bar is hidden)
Bubblewrap prints a SHA-256 fingerprint. Publish it at `https://kingpickz.com/.well-known/assetlinks.json`:
```json
[{ "relation": ["delegate_permission/common.handle_all_urls"],
   "target": { "namespace": "android_app", "package_name": "com.kingpickz.aurora",
               "sha256_cert_fingerprints": ["<FROM bubblewrap>"] } }]
```
(Serve it via nginx on kingpickz.com — alias to a static file.)

## Submit
- Google Play: upload the `.aab`, fill the Data Safety form, set content rating. ($25 one-time account.)
- Amazon Appstore (Fire TV): upload the signed `.apk` (separate listing). Free account.

## Fuller native version
For a true 10-foot Android TV experience (grid EPG + ExoPlayer), generate a Jetpack Compose + Media3
project and reuse `../shared-core` logic. The TWA ships first; the native app follows.
