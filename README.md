# IronPath — Gym Do-Along

A free, clean, **ad-free** workout app + printable PDF. No accounts, no tracking, no bloat.

## What's here
| File | What it is |
|---|---|
| `index.html` | The whole app (works offline after first open). |
| `manifest.webmanifest`, `sw.js`, `icon*.png`, `icon.svg` | Make it installable as a phone app (PWA). |
| `IronPath-Gym-Guide.pdf` | 23-page printable do-along guide (4-day split, technique, photos). |

## Features
- **Library** — 36 essential exercises, filter by Upper / Lower / Core and muscle group.
- **Animated demos** — start/finish photos cross-fade to show the movement (public-domain Free Exercise DB).
- **Target area + technique** — primary/secondary muscles and numbered form cues for each move.
- **Auto-built plans** — balanced session for your focus and level.
- **Optimize** — pick goal (strength / muscle / endurance / fat loss), equipment (full gym → bodyweight), and session length; the plan rebuilds to fit.
- **Do-along workout** — step through each exercise, tick off sets, with a rest timer (beep + vibrate).

## Run it on your phone now (no publishing needed)
1. Make sure your phone and PC are on the same Wi-Fi.
2. On the PC, in this folder run any static server, e.g. `npx -y serve -l 5050`.
3. On your phone open `http://<your-PC-IP>:5050`, then **Add to Home Screen**.

## Publish it free for everyone
Pick any free static host — the app is just files, so there's nothing to build:

**GitHub Pages (free, permanent URL)**
1. Create a repo, upload everything in this folder.
2. Settings → Pages → deploy from `main` / root.
3. Share the `https://<you>.github.io/<repo>/` link. Anyone can open it and Add to Home Screen on iPhone or Android.

**Netlify / Cloudflare Pages** — drag this folder onto their dashboard; done.

> No app store needed, no $99/yr Apple fee, no ads ever. If you later want it *in* the Play Store, the same files can be wrapped with a free tool (Bubblewrap/PWABuilder) — ask and I'll walk you through it.

## Notes
- Exercise photos load from a free public CDN (jsdelivr) on first view and are then cached for offline use.
- General fitness guidance, **not medical advice**. Warm up; stop if you feel sharp pain.
