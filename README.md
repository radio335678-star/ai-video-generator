# AI Video Generator (Remotion)

Make videos with React code. Laptop stays light — heavy renders run on **GitHub Actions (free)**.

> Agents (Antigravity / Cursor / OpenCode / any): read **`AGENTS.md`** first. It is the full
> operating manual. This README is the human summary.

## Quick start

```bash
npm install
npx skills add remotion-dev/skills
npx remotion studio        # preview http://localhost:3000
npm run render:draft       # low-RAM draft (scale 0.5)
npm run render:final       # local final
```

## Serverless render (no laptop load)

1. Push to GitHub → Actions → **Render Remotion Video** → Run workflow
2. Set `composition` = `HelloWorld` / `ProductAd` / your new one
3. Download MP4 from Artifacts (kept 90 days)

Free tier: public repo unlimited Linux minutes, private 2000 min/mo. Runner pins
`--concurrency=2 --codec=h264 --image-format=jpeg`.

## Clone any web animation (Obscura capture)

Web motion (Lottie, Rive, GSAP, Three.js) renders via JS in the browser — so capture
the real source instead of guessing: full SOP in **`BROWSER-CAPTURE.md`**.

```powershell
py .\obscura-browser\verify_obscura.py   # from C:\quaasxecosystem-orchestrator
```

## Add a video

1. New file `src/compositions/<Name>.tsx` (Zod schema + defaultProps required)
2. Register `<Composition>` in `src/Root.tsx`
3. Draft → final → branch → PR (never push `main` directly)

## Repo layout

```
AGENTS.md                    <- universal agent brain (read me)
AGENT-PLAYBOOK.md            <- capability menu + copy-paste prompts
BROWSER-CAPTURE.md           <- steal web motion via Obscura (capture SOP)
src/Root.tsx                 <- composition registry
src/compositions/HelloWorld.tsx
src/compositions/ProductAd.tsx
.github/workflows/render.yml <- free serverless renderer
public/                      <- static assets (via staticFile())
out/                         <- local renders (gitignored)
```
