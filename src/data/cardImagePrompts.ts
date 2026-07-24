export type CardImagePrompt = {
  cardId: string;
  displayName: string;
  sourceName: string;
  fileName: string;
  prompt: string;
};

const sharedPromptBase = [
  "Use case: stylized-concept",
  "Asset type: tarot card face artwork for a web prototype",
  "Style/medium: hand-drawn graphite pencil and cut-paper collage, scanned paper texture, muted risograph ink, subtle occult diagram lines, editorial design object",
  "Composition/framing: vertical tarot-card composition, centered symbolic subject, generous border breathing room, important elements inside central 80%",
  "Lighting/mood: mysterious but calm, design-studio ritual, intimate creative desk energy",
  "Color palette: charcoal black, warm paper ivory, muted brass yellow, faded cyan, dusty rose, restrained warning red only when needed",
  "Materials/textures: rough paper, pencil grain, photocopy texture, taped paper scraps, faint layout grids, tiny crop marks",
  "Constraints: no readable logos, no watermark, no photorealistic people, no fantasy game rendering, no clean vector icon style, no title text inside artwork",
].join("\n");

export const cardImagePrompts: CardImagePrompt[] = [
  {
    cardId: "major-00",
    displayName: "打開檔案",
    sourceName: "The Fool",
    fileName: "major-00-opening-oracle.webp",
    prompt: `${sharedPromptBase}
Primary request: A designer oracle card illustration about starting a new project before the brief is clear.
Subject: an empty design frame floating like a portal, a pencil cursor stepping off the edge, loose paper scraps, tiny rough thumbnails, a small glowing dot suggesting first inspiration.
Mood: brave, uncertain, playful, first-step energy.
Symbolic details: incomplete brief papers, crop marks, a small frame with no content, a cursor or pencil crossing into the unknown.
Avoid: literal clown, traditional fool costume, readable UI, obvious software logo.`,
  },
  {
    cardId: "major-16",
    displayName: "重構之塔",
    sourceName: "The Tower",
    fileName: "major-16-rebuild-tower.webp",
    prompt: `${sharedPromptBase}
Primary request: A designer oracle card illustration about a design direction collapsing and needing reconstruction.
Subject: a tall grid-based layout tower breaking apart into frame fragments, redline marks, falling UI blocks, a small stable core frame surviving at the center.
Mood: dramatic, urgent, cathartic, not hopeless.
Symbolic details: broken layout grid, revision marks, torn paper edges, warning-red accents, faint lightning made of annotation lines.
Avoid: medieval stone tower, fire-heavy disaster scene, horror mood, excessive chaos.`,
  },
  {
    cardId: "major-17",
    displayName: "初衷之星",
    sourceName: "The Star",
    fileName: "major-17-north-star.webp",
    prompt: `${sharedPromptBase}
Primary request: A designer oracle card illustration about remembering why the work matters.
Subject: a north star above a quiet desk, one clear user journey line glowing through scattered feedback notes, soft paper stars, a small open notebook.
Mood: hopeful, quiet, restorative, clear after noise.
Symbolic details: star map, user path line, soft cyan highlight, washed paper sky, gentle pencil shading.
Avoid: generic night landscape, angelic figure, overly sentimental fantasy style.`,
  },
  {
    cardId: "designer-01",
    displayName: "回饋迴圈",
    sourceName: "The Feedback Loop",
    fileName: "designer-01-feedback-loop.webp",
    prompt: `${sharedPromptBase}
Primary request: A designer original oracle card illustration about endless revision cycles and unclear feedback.
Subject: speech bubbles and redline comments circling around a design frame, loop arrows drawn by pencil, one question mark breaking the loop.
Mood: witty, slightly cursed, but useful and self-aware.
Symbolic details: annotation stickers, loop arrows, version tabs, small tangled thread, one clean exit mark.
Avoid: angry client caricature, meme face, readable feedback text, corporate stock illustration.`,
  },
  {
    cardId: "designer-02",
    displayName: "靈感牆",
    sourceName: "The Moodboard",
    fileName: "designer-02-moodboard-wall.webp",
    prompt: `${sharedPromptBase}
Primary request: A designer original oracle card illustration about collecting references before a style direction is chosen.
Subject: a collage wall of torn paper swatches, small abstract images, color chips, thumbnails, thread lines connecting visual clues, one empty central frame waiting for synthesis.
Mood: abundant, curious, visually rich, not messy.
Symbolic details: paper tape, clipped scraps, faint sun/moon symbol, cyan and dusty rose accents, design grid barely visible under collage.
Avoid: Pinterest UI, readable magazine text, brand logos, too many saturated colors.`,
  },
];
