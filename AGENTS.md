# AI Video Generator — Universal Agent Operating File (Remotion)

> **Single source of truth.** Any agent (Antigravity, Cursor, OpenCode, Claude Code,
> Codex, Kimi, Copilot, Windsurf, VS Code) reads THIS file and can build + render
> videos at full capacity. Everything else in this repo is code this file points to.
> Git is the source of truth — laptop stays light, heavy rendering runs on GitHub Actions.
> Three files run this repo: `AGENTS.md` (rules/HOW), `AGENT-PLAYBOOK.md` (menu/WHAT),
> `BROWSER-CAPTURE.md` (steal web motion via Obscura — read before cloning any web animation).

---

## 1. What this repo is

`ai-video-generator` = **Remotion video factory** (`remotion-dev/remotion`, ~64k stars).
Video = React code. Change code → render MP4. Two starter compositions ship ready:

| Composition | File | Use |
|---|---|---|
| `HelloWorld` | `src/compositions/HelloWorld.tsx` | Smoke test, 5s title card |
| `ProductAd` | `src/compositions/ProductAd.tsx` | Reusable ad template (title, price, image via props) |

Render paths (cheapest first): **GitHub Actions (free)** → local draft → AWS Lambda (scale).

## 2. First-run setup (any machine, any agent — run once)

```bash
node --version        # need 18+
npm install
npx skills add remotion-dev/skills   # installs 8 Remotion agent skills
npx remotion skills add               # links skills into .agents/skills
npx remotion studio                   # preview at http://localhost:3000
```

IDE plugins (optional, teach the agent Remotion best practices):
- Cursor: `git clone https://github.com/remotion-dev/cursor-plugin.git ~/.cursor/plugins/local/remotion` + restart
- Claude Code: `claude plugin marketplace add remotion-dev/claude-code-plugin` + `claude plugin install remotion@remotion`
- Copilot / Codex / Kimi: use matching repo under `github.com/remotion-dev/*-plugin`
- Skills source: `github.com/remotion-dev/skills` (`remotion-best-practices`, `remotion-create`, `remotion-render`, `remotion-captions`, `remotion-markup`, `remotion-interactivity`, `remotion-saas`, `mediabunny`)

## 3. How to add a new video (agent contract — follow exactly)

1. Create `src/compositions/<Name>.tsx` exporting a React component using
   `useCurrentFrame()`, `useVideoConfig()`, `<Sequence>`, `<Audio>`, `<Img>`.
   Props MUST have a Zod schema + default props (Remotion 4.x requires `defaultProps` + `schema`).
2. Register in `src/Root.tsx`:
   ```tsx
   <Composition id="<Name>" component={<Name>} durationInFrames={150}
     fps={30} width={1920} height={1080} schema={...} defaultProps={{...}} />
   ```
3. Preview: `npx remotion studio` → check composition appears.
4. Draft render (low RAM): `npx remotion render <Name> out/<name>-draft.mp4 --scale=0.5 --image-format=jpeg --concurrency=2`
5. Final render: `npx remotion render <Name> out/<name>.mp4 --codec=h264`
6. Commit on a branch, never `main` directly (see §6).

Rules: `jpeg` intermediates (not `png` unless transparency needed); prefer `<Video>` from
`@remotion/media` for embedded video; keep `--concurrency=1-2` on ≤8GB RAM machines;
720p draft before 1080p final; stills via `npx remotion still <Name> --frame=30`.

## 4. Serverless render on GitHub (laptop stays at 0% load)

Workflow: `.github/workflows/render.yml` (manual dispatch + push trigger).
- Free tier: public repo = unlimited Linux minutes; private = 2000 min/mo.
- Runner: 2-core / 7GB — workflow pins `--concurrency=2 --codec=h264`.
- Use: GitHub → Actions → `Render Remotion Video` → Run workflow → set
  `composition` (+ optional `scale`, `frames`) → download MP4 from Artifacts (90-day retention).
- No local install, no FFmpeg, no RAM used. Commit `src/compositions/*.tsx` + push = video.

## 5. Machine profile (this laptop, 2026-10-16)

- RAM 7.28GB total / ~1.9GB free — ALWAYS draft at `--scale=0.5`, final only via Actions.
- GPU AMD Radeon integrated 0.5GB — CPU render only, expect slow local finals.
- Drives C: 44GB free / D: 10GB free — keep `out/` gitignored, artifacts live on GitHub.
- Chrome/Edge auto-start disabled — use Chrome ≥143 for Studio (older = visual glitches).

## 6. Git rules (repo lives under `radio335678-star`)

- Account: `radio335678-star` (primary). Never mix authorship — see
  `C:\quaasxecosystem-orchestrator\git\AGENTS.md` (READ-ONLY reference, do not edit).
- Branch per video/feature: `git checkout -b feature/<name>` → atomic conventional
  commits (`feat(video): add diwali ad`) → `git push -u origin feature/<name>` → `gh pr create`.
- `out/` is gitignored. Compositions + workflow + THIS file are the deliverable.

## 7. License gate

Remotion 5.x license: free for individuals / ≤3-employee for-profits / non-profits /
evaluation. Larger for-profit orgs need a Company License (`remotion.dev/license`).
Check before commercial client work.

## 8. Web-motion capture (Obscura — read BROWSER-CAPTURE.md first)

If the reference animation **plays in a browser** (Lottie-web, Rive, GSAP, Three.js,
canvas ads), do NOT guess from visuals. Capture the real source via Obscura
(~30MB/instance, 37 MCP tools, CDP `ws://127.0.0.1:9222`):
`browser_navigate` → `browser_network_requests` (save `.json`/`.riv`/textures) →
`browser_evaluate` probe bundle → screenshots for timing → `public/captured/MANIFEST.md`
→ rebuild as your composition. Pillar `obscura-browser/` is READ-ONLY — run
`verify_obscura.py` + scripts, never edit inside. Third-party assets stay reference-only
(gitignored); steal choreography, not files.

## 9. Troubleshooting (in order)

1. `npx remotion studio` empty → `npm install` missed or composition not registered in `Root.tsx`.
2. OOM on render → lower `--concurrency=1`, add `--scale=0.5`, switch `--image-format=jpeg`.
3. Glitchy Studio → upgrade Chrome to ≥143.
4. Action fails → check Actions log: usually Node version (need 18+) or missing `npm ci` deps.
5. Font/asset missing → put under `public/` and reference via `staticFile()`.

---
*If in doubt: Studio previews, Actions renders, web motion gets captured (BROWSER-CAPTURE.md), this file decides.*
