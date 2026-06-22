# Code signing — drop in your certs and CI signs automatically

The build pipelines are **signing-ready**. With no secrets set they produce **unsigned / debug-signed**
installers (which work but show an "unknown developer" warning). Add the matching repo secrets
(**Settings → Secrets and variables → Actions**) and the next build signs automatically — no workflow edits.

## Android (`build-apk.yml`)
Create an upload keystore once:
```
keytool -genkey -v -keystore kingz.keystore -alias kingz -keyalg RSA -keysize 2048 -validity 9125
base64 -w0 kingz.keystore   # copy this value
```
Secrets:
| Secret | Value |
|---|---|
| `ANDROID_KEYSTORE_B64` | base64 of `kingz.keystore` |
| `ANDROID_STORE_PASS` | keystore password |
| `ANDROID_KEY_ALIAS` | `kingz` (your alias) |
| `ANDROID_KEY_PASS` | key password |

With these set, CI runs `assembleRelease` and ships a release-signed APK; without them, a debug-signed
(sideloadable) APK. Use the **same keystore** for every release (Play Store requires it).

## macOS (`build-desktop.yml`) — sign + notarize
Requires an Apple Developer account ($99/yr) and a **Developer ID Application** certificate (.p12).
| Secret | Value |
|---|---|
| `MAC_CSC_LINK` | base64 of your `.p12` certificate |
| `MAC_CSC_KEY_PASSWORD` | the `.p12` password |
| `APPLE_ID` | your Apple ID email |
| `APPLE_APP_SPECIFIC_PASSWORD` | an app-specific password (appleid.apple.com) |
| `APPLE_TEAM_ID` | your 10-char Team ID |

## Windows (`build-desktop.yml`)
Requires a code-signing certificate (OV/EV) as a `.pfx`.
| Secret | Value |
|---|---|
| `WIN_CSC_LINK` | base64 of your `.pfx` |
| `WIN_CSC_KEY_PASSWORD` | the `.pfx` password |

> Linux AppImage needs no signing. After adding secrets, re-run the workflow (Actions → Run workflow,
> or push any change) and the Release assets will be signed.
