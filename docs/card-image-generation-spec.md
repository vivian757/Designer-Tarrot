# Card Image Generation Spec

## Goal

第二步先測 5 張代表性卡面圖像素材，不一次生成完整 30 張。

這一批的目的不是取代目前的 SVG 牌面系統，而是確認「手繪拼貼神諭感」是否能成為整套 Designer Tarot 的視覺 DNA。

## Selected Cards

| Card ID | Card Name | Why This Card |
|---|---|---|
| `major-00` | 開稿者 / The Fool | 測「開始、新案、空白 frame」的第一印象。 |
| `major-16` | 重構之塔 / The Tower | 測「崩塌、重構、客戶打槍」的戲劇性。 |
| `major-17` | 初衷之星 / The Star | 測「願景、希望、找回設計熱情」的溫柔感。 |
| `designer-01` | 回饋迴圈 / The Feedback Loop | 測設計師專屬語境，必須有梗但不能太迷因。 |
| `designer-02` | 靈感牆 / The Moodboard | 測拼貼與參考素材的核心風格。 |

## Visual Direction

**Style Name:** Hand-Drawn Scrapbook Oracle

**Core Feeling**

- 手繪但不是幼稚。
- 拼貼但不凌亂。
- 玄，但仍然像設計師會想收藏的圖像。
- 不是傳統偉特塔羅臨摹，而是「設計師腦內宇宙」。

**Medium**

- graphite pencil sketch
- cut-paper collage
- risograph-like muted ink
- scanned paper texture
- subtle occult diagram lines
- tiny UI / Figma / layout references as symbolic objects

**Palette**

- charcoal black
- warm paper ivory
- muted brass yellow
- faded cyan
- dusty rose
- soft red only for warning or rupture

**Avoid**

- clean vector icon style
- glossy 3D
- fantasy game card look
- overly cute illustration
- photorealistic people
- readable brand logos
- dense readable UI screenshots
- too much text inside the artwork

## Asset Rules

Recommended output:

- Aspect ratio: `0.69`, same as current card face.
- Minimum size: `1024 x 1484`.
- Preferred file type: `webp` for app usage, `png` if preserving maximum edit quality.
- Safe area: keep important subject inside central 80%.
- No card title in image. The app already renders card names.
- No watermark.

Workspace destination:

```text
public/cards/
```

File names:

```text
major-00-opening-oracle.webp
major-16-rebuild-tower.webp
major-17-north-star.webp
designer-01-feedback-loop.webp
designer-02-moodboard-wall.webp
```

## Shared Prompt Base

Use case: stylized-concept
Asset type: tarot card face artwork for a web prototype
Style/medium: hand-drawn graphite pencil and cut-paper collage, scanned paper texture, muted risograph ink, subtle occult diagram lines, editorial design object
Composition/framing: vertical tarot-card composition, centered symbolic subject, generous border breathing room, important elements inside central 80%
Lighting/mood: mysterious but calm, design-studio ritual, intimate creative desk energy
Color palette: charcoal black, warm paper ivory, muted brass yellow, faded cyan, dusty rose, restrained warning red only when needed
Materials/textures: rough paper, pencil grain, photocopy texture, taped paper scraps, faint layout grids, tiny crop marks
Constraints: no readable logos, no watermark, no photorealistic people, no fantasy game rendering, no clean vector icon style, no title text inside artwork

## Prompts

### major-00 開稿者 / The Fool

Primary request: A designer oracle card illustration about starting a new project before the brief is clear.
Subject: an empty design frame floating like a portal, a pencil cursor stepping off the edge, loose paper scraps, tiny rough thumbnails, a small glowing dot suggesting first inspiration.
Mood: brave, uncertain, playful, first-step energy.
Symbolic details: incomplete brief papers, crop marks, a small frame with no content, a cursor or pencil crossing into the unknown.
Avoid: literal clown, traditional fool costume, readable UI, obvious software logo.

### major-16 重構之塔 / The Tower

Primary request: A designer oracle card illustration about a design direction collapsing and needing reconstruction.
Subject: a tall grid-based layout tower breaking apart into frame fragments, redline marks, falling UI blocks, a small stable core frame surviving at the center.
Mood: dramatic, urgent, cathartic, not hopeless.
Symbolic details: broken layout grid, revision marks, torn paper edges, warning-red accents, faint lightning made of annotation lines.
Avoid: medieval stone tower, fire-heavy disaster scene, horror mood, excessive chaos.

### major-17 初衷之星 / The Star

Primary request: A designer oracle card illustration about remembering why the work matters.
Subject: a north star above a quiet desk, one clear user journey line glowing through scattered feedback notes, soft paper stars, a small open notebook.
Mood: hopeful, quiet, restorative, clear after noise.
Symbolic details: star map, user path line, soft cyan highlight, washed paper sky, gentle pencil shading.
Avoid: generic night landscape, angelic figure, overly sentimental fantasy style.

### designer-01 回饋迴圈 / The Feedback Loop

Primary request: A designer original oracle card illustration about endless revision cycles and unclear feedback.
Subject: speech bubbles and redline comments circling around a design frame, loop arrows drawn by pencil, one question mark breaking the loop.
Mood: witty, slightly cursed, but useful and self-aware.
Symbolic details: annotation stickers, loop arrows, version tabs, small tangled thread, one clean exit mark.
Avoid: angry client caricature, meme face, readable feedback text, corporate stock illustration.

### designer-02 靈感牆 / The Moodboard

Primary request: A designer original oracle card illustration about collecting references before a style direction is chosen.
Subject: a collage wall of torn paper swatches, small abstract images, color chips, thumbnails, thread lines connecting visual clues, one empty central frame waiting for synthesis.
Mood: abundant, curious, visually rich, not messy.
Symbolic details: paper tape, clipped scraps, faint sun/moon symbol, cyan and dusty rose accents, design grid barely visible under collage.
Avoid: Pinterest UI, readable magazine text, brand logos, too many saturated colors.

## App Integration Plan

After images exist in `public/cards/`:

1. Add optional `imageAsset` to `DesignerTarotCard.visual`.
2. Assign the 5 generated paths to the selected cards.
3. In `TarotFace`, render the image as a card artwork layer when `imageAsset` exists.
4. Keep the current SVG symbol as fallback for all cards without image assets.
5. Add a subtle overlay so app typography remains readable.

