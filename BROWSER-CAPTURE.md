# BROWSER-CAPTURE — Steal Web Motion Like a Genius (Obscura Pipeline)

> Core insight: if a motion/animation **renders in a browser** (Lottie-web, Rive,
> GSAP, Three.js, canvas ads, interactive 3D showcases), the pixels are drawn by
> JavaScript *inside the browser*. Obscura sits at that exact spot — so instead of
> guessing from visuals, you capture the **actual source**: scripts, animation JSON,
> textures, timing, easing. Then rebuild it as your own editable composition.

---

## 1. When capture works vs when it doesn't (decide in 30 seconds)

| Signal | Verdict | Path |
|---|---|---|
| Animation plays on a webpage, view-source shows JS/canvas/WebGL | ✅ CAPTURE | This file |
| Network tab shows `.json` (Lottie), `.riv` (Rive), shaders, sprite sheets | ✅ CAPTURE | §3 steps 3–4 |
| Page streams a plain `.mp4` from CDN, no interactive layer | ❌ FLAT PIXELS | Rebuild-from-frames (ffmpeg + Whisper → agent rewrites as code) |
| Motion inside WASM blob / DRM video | ⚠️ PARTIAL | Capture timing via screenshots, rewrite logic by hand |
| Minified/obfuscated JS bundle | ⚠️ EXTRA STEP | Deobfuscate (beautify + rename) before reading logic |

## 2. Prerequisites (Obscura pillar is READ-ONLY — use, never edit)

- Engine: `C:\quaasxecosystem-orchestrator\obscura-browser\bin\obscura.exe` (~30MB RAM/instance)
- Verify (run from `C:\quaasxecosystem-orchestrator`): `py .\obscura-browser\verify_obscura.py`
- CDP server: `.\obscura-browser\scripts\start-cdp-server.ps1 -Port 9222` → `ws://127.0.0.1:9222`
- MCP tools available in all 5 IDEs after `.\obscura-browser\connect-obscura-mcp.ps1`
- Full 37-tool catalog: `C:\quaasxecosystem-orchestrator\obscura-browser\AGENTS.md` (read-only reference)

## 3. Capture SOP (exact tool sequence — follow in order)

```
1. VERIFY   py verify_obscura.py   (green before anything)
2. NAVIGATE browser_navigate(url) → browser_screenshot() baseline
3. NETWORK  browser_network_requests() → filter .json/.riv/.js/.wasm/fonts/textures
            → save animation payloads to public/captured/ (gitignored if unlicensed, see §5)
4. DUMP STATE via browser_evaluate — run these probes:
   - scripts:  Array.from(document.scripts).map(s=>s.src||s.innerHTML.slice(0,200))
   - lottie:   Object.keys(window).filter(k=>/lottie|bodymovin/i.test(k))
   - rive:     typeof window.rive !== 'undefined'
   - css:      [...document.styleSheets].flatMap(s=>[...(s.cssRules||[])].map(r=>r.cssText)).join('\n').slice(0,8000)
   - computed: getComputedStyle(document.querySelector('<hero-selector>')).cssText
   - canvas:   document.querySelectorAll('canvas').length + sizes
   - console:  browser_console_messages() for player errors/versions
5. TIMING   screenshots at 0.5s intervals during one loop (or CDP screencast)
            → note durations, easings, stagger order, loop point
6. MANIFEST write public/captured/MANIFEST.md: URL, date, assets saved,
            timing table, easing values, fonts, colors, loop duration
7. REBUILD  paste MANIFEST + assets into the §4 prompt → new src/compositions/<Name>.tsx
8. RENDER   draft locally --scale=0.5 → final via GitHub Actions (AGENTS.md §4)
```

`browser_evaluate` probe bundle (copy-paste, replace `<hero-selector>`):
```js
({
  scripts: Array.from(document.scripts).map(s => s.src || 'inline:' + s.innerHTML.slice(0,120)),
  lottieKeys: Object.keys(window).filter(k => /lottie|bodymovin/i.test(k)),
  hasRive: typeof window.rive !== 'undefined',
  threeScenes: (window.__THREE__ ? 'present' : 'absent'),
  canvases: Array.from(document.querySelectorAll('canvas')).map(c => ({w: c.width, h: c.height})),
  heroStyle: (() => { const el = document.querySelector('<hero-selector>'); return el ? getComputedStyle(el).cssText.slice(0,1500) : 'no-match'; })()
})
```

## 4. Rebuild prompt (paste MANIFEST + assets, get editable source)

```
Rebuild this captured web animation as a Remotion 4 composition <Name>
(1920x1080, 30fps). MANIFEST: <paste>. Assets in public/captured/ (reference only).
Rules: Zod schema + defaultProps, register in Root.tsx, my brand (<colors/fonts>),
replace their copy with mine (<your text>). Timing/easing must match MANIFEST exactly.
```

Variant prompts:
- Flat motion look → `...as a Lottie JSON I can edit, plus a Remotion wrapper that plays it.`
- 3D look → `...as a Three.js-in-Remotion scene matching the captured camera angles.`
- Style-only clone → `Same choreography/timing, completely original shapes and colors.`

## 5. Legal/ethics gate (genius = fast AND clean)

- ✅ Capture anything for **analysis**: timing, easing, choreography ideas.
- ✅ Reuse assets you **own or licensed** (your site, bought Lottie, MIT files).
- ❌ NEVER commit someone else's `.json`/`.riv`/fonts/images into git. Keep third-party
  captures in `public/captured/` (gitignored) as reference-only, rebuild originals.
- Competitor cloning = steal the **choreography**, not the **files**. Same rhythm, your art.
- Client delivery → confirm asset licenses + Remotion license tier (AGENTS.md §7).

## 6. Troubleshooting

1. `browser_network_requests` empty → scroll page (`browser_scroll bottom`), replay animation, read again.
2. `.json` is data API, not animation → check payload keys (`v`, `layers`, `assets` = Lottie).
3. Canvas black in screenshot → WebGL needs real frame wait: `browser_wait_for_text` then re-shoot.
4. Minified bundle unreadable → beautify, search `loadAnimation`, `new Rive`, `gsap.to`, `THREE.`.
5. CDP port busy → `stop-cdp-server.ps1` then start again on 9222.

---
*Browser renders it → Obscura captures it → agent rebuilds it → Actions renders yours.*
