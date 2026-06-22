# Distributing KINGZ IPTV — what's automated vs. what needs your accounts

There are three honest tiers. Two work **today with zero accounts**; the third (official app stores)
needs *your* paid developer accounts and signing identity — that part cannot be done from a server by
anyone but you, because it is tied to your legal identity and payment.

## ✅ Tier 1 — PWA (works right now, every platform)
`https://kingpickz.com/iptv` installs as an app from any modern browser:
- **iPhone/iPad:** Share → *Add to Home Screen*.
- **Android:** browser menu → *Install app* (or the auto prompt).
- **Windows/Mac/Linux/ChromeOS:** address-bar *Install* icon.
No store, no review, instant updates. This already covers 100% of platforms.

## ✅ Tier 2 — Installable native binaries (no store account)
Create a release and hand people a real installer / APK they can sideload:
1. Tag a version: `git tag v1.0.0 && git push origin v1.0.0`
   (or **Actions → "Release (installable apps)" → Run workflow**).
2. CI builds in the cloud and publishes a **GitHub Release** with:
   - **Windows** `.msi` / `.exe`
   - **macOS** `.dmg`
   - **Linux** `.AppImage` / `.deb`
   - **Android** `.apk` (debug-signed — installs via "unknown sources", no Play account)
3. Share the Release page. Done — no Apple/Google account required.

> Note: a *debug-signed* APK and an *unsigned/self-signed* desktop installer will show an
> "unknown developer / unverified" warning on install. That's expected for sideloading; it goes
> away once you sign with your own paid developer certificate (Tier 3).

## 🔑 Tier 3 — Official app stores (your accounts, one-time)
The CI already **builds** the store binaries; what only you can provide is the account + signing key:

| Store | Cost | What you must provide | Then |
|------|------|----------------------|------|
| **Google Play** | $25 once | Upload keystore as repo secrets `ANDROID_KEYSTORE_B64`, `KEY_ALIAS`, `KEY_PASS`, `STORE_PASS` (+ a Play service-account JSON for auto-publish) | CI signs the `.aab`; upload in Play Console |
| **Apple App Store** | $99/yr | A Mac + Xcode + an Apple Developer account & signing identity (native iOS is out of CI scope; the PWA covers iOS with no store) | Wrap the web app in a WKWebView project, set your **Team**, Archive → Distribute |
| **Microsoft Store** | $19 once | A Partner Center account | Submit the `.exe` |
| **Amazon / Samsung / LG** | free | Their developer account | Upload the `.apk` / packaged web app |

Why I can't finish Tier 3 for you: creating these accounts requires your identity and a payment method,
and store submission must come from *your* account with *your* signing key. Holding your signing identity
or paying on your behalf isn't something I'll do — but everything up to that point (the buildable, signable
projects + CI) is wired and waiting. Add the secrets from the table and the pipeline does the rest.
