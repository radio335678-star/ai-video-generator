# Agent Playbook — What Every Agent Can Do With This Repo

> Companion to `AGENTS.md` (the operating manual). THIS file is the menu:
> what agents can do, for what purpose, and exactly how — with copy-paste prompts.
> Works identically in Antigravity, Cursor, OpenCode, Claude Code, Codex, Kimi, Copilot, Windsurf, VS Code.

---

## 1. Capability map — what agents can do here

| # | Capability | Purpose it serves | Agent prompt (copy-paste) |
|---|---|---|---|
| 1 | Create video from idea | New ad, intro, announcement from a sentence | `"Create a new composition PartiesInvite (1920x1080, 30fps, 10s) with animated title, date, venue. Register it in Root.tsx with Zod schema + defaultProps."` |
| 2 | Edit existing video | Change text, colors, timing without rebuilding | `"In ProductAd, change price to ₹1,499, tagline to 'Weekend only', background to navy. Keep timing."` |
| 3 | Add captions/subtitles | Tutorial, reel, course videos | `"Add word-by-word captions to <Comp> using the remotion-captions skill pattern."` |
| 4 | Add audio/music/voiceover | Festive ads, explainers | `"Add background music via <Audio> fading in 0-20f, ducking under voiceover."` |
| 5 | Stills & thumbnails | YouTube thumbnails, posters from video frames | `"Render a still of <Comp> at frame 60 with npx remotion still, 1920x1080."` |
| 6 | Audio-only / GIF export | Podcasts, stickers, memes | `"Export <Comp> as mp3 (audio-only) and as GIF via --codec=gif."` |
| 7 | Batch / personalized videos | 100 ads with different names/prices from a list | `"Add a props-driven variant of ProductAd reading from a JSON list; document rendering each row."` |
| 8 | Fix broken render | OOM, missing asset, schema error | `"Render fails with <paste error>. Diagnose with remotion-render skill: check Root registration, schema/defaultProps, staticFile paths."` |
| 9 | Performance tune for low RAM | Make it render on 7GB laptop / free runner | `"Tune <Comp> for 7GB RAM: concurrency 1-2, jpeg intermediates, scale 0.5 draft, no 4K assets."` |
| 10 | Review a video PR | Quality gate before merge | `"Review this composition PR: timing, fonts, schema/defaultProps present, Root registered, draft render command included."` |
| 11 | Design system / template library | One brand style reused across all videos | `"Convert <Comp> into a reusable template: props for brand colors, fonts, logo via public/ + staticFile."` |
| 12 | Trigger cloud render | Zero laptop load via GitHub Actions | `"Push this branch and tell me the exact Actions run to click: Render Remotion Video with composition=<Name>."` |

## 2. Purpose playbook — when to use which capability

- **Marketing ads (Diwali sale, shop offer):** 1 → 2 → 9 → 12. Start from `ProductAd`, change props, draft, Actions final.
- **YouTube automation (daily shorts):** 1 → 11 → 7 → 12. One template, JSON rows per day, batch via Actions matrix.
- **Course / tutorial videos:** 1 → 3 → 4 → 12. Captions + voiceover, stills (5) for cover images.
- **Product demos / SaaS:** 11 → 7 → 10. Design system + personalized per-client renders, PR review gate.
- **Social reels / memes:** 2 → 5 → 6. Re-cut existing comp, still thumbnail, GIF export.
- **Client work (paid):** 11 → 10 → 12 + license check in `AGENTS.md` §7 before delivery.

## 3. Standard agent workflow (every task, every IDE)

```
1. Read AGENTS.md (rules) + this playbook (menu)
2. git checkout -b feature/<video-name>
3. Write/edit src/compositions/<Name>.tsx (schema + defaultProps mandatory)
4. Register <Composition> in src/Root.tsx
5. npx remotion studio  → visual check
6. Draft: npx remotion render <Name> out/<name>-draft.mp4 --scale=0.5 --image-format=jpeg --concurrency=2
7. git add + commit (feat(video): ...) + push + gh pr create
8. Actions → Render Remotion Video → download MP4 (laptop stays idle)
```

## 4. Prompt starters per agent

- **Antigravity:** open repo folder → paste any prompt from §1 table.
- **Cursor:** repo open → `@remotion` skill auto-loads (plugin installed) → paste prompt.
- **OpenCode:** `opencode` in repo root → same prompts; skills resolve from `.agents/skills`.
- **Claude Code / Codex / Kimi / Copilot:** install plugin once (see `AGENTS.md` §2), then identical prompts.

No IDE-specific syntax. If the agent asks "which framework?" answer: "Remotion 4, this repo, AGENTS.md is law."

## 5. Limits the agent must respect

- This laptop: drafts at `--scale=0.5`, finals via Actions. Never `--concurrency>2` locally.
- Free runner: ≤6h/job, 2-core/7GB — split videos >10 min into parts.
- `out/` never committed. Compositions + `AGENTS.md` + workflow = the product.
- Commercial client delivery → re-check Remotion license tier first.

---
*Menu (this file) tells you WHAT + WHY. `AGENTS.md` tells you HOW. GitHub Actions does the WORK.*
