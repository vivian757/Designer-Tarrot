import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { cards, scenarios, type DesignerTarotCard, type ScenarioId, type VisualSymbol } from "./data/cards";

type DrawState = "idle" | "drawing" | "revealed";

const scenarioCopy: Record<ScenarioId, string> = {
  daily: "今日設計運勢正在開稿",
  stuck: "正在定位卡住的那一層",
  "bad-brief": "正在替奇妙需求接收宇宙翻譯",
  pitch: "正在校準提案場的信念值",
  feedback: "正在讀取 feedback 的本體",
  redo: "正在判斷這版該救還是放生",
  tired: "正在替審美疲勞留一盞燈",
};

function pickCard(previousCardId?: string) {
  const pool = previousCardId ? cards.filter((card) => card.id !== previousCardId) : cards;
  return pool[Math.floor(Math.random() * pool.length)];
}

function App() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId>("daily");
  const [drawState, setDrawState] = useState<DrawState>("idle");
  const [activeCard, setActiveCard] = useState<DesignerTarotCard | null>(null);
  const [selectedDeckIndex, setSelectedDeckIndex] = useState(3);
  const selectedScenarioMeta = scenarios.find((scenario) => scenario.id === selectedScenario) ?? scenarios[0];
  const constellation = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        left: `${8 + ((index * 31) % 86)}%`,
        top: `${10 + ((index * 47) % 76)}%`,
        delay: `${(index % 7) * 0.45}s`,
      })),
    [],
  );

  function handleDraw() {
    if (drawState === "drawing") return;

    setDrawState("drawing");
    window.setTimeout(() => {
      setActiveCard(pickCard(activeCard?.id));
      setDrawState("revealed");
    }, 960);
  }

  function handleScenarioChange(nextScenario: ScenarioId) {
    setSelectedScenario(nextScenario);
    if (drawState === "revealed") {
      setDrawState("idle");
      setActiveCard(null);
      setSelectedDeckIndex(3);
    }
  }

  return (
    <main className="app-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <div className="ambient-orbit orbit-one" aria-hidden="true" />
      <div className="ambient-orbit orbit-two" aria-hidden="true" />
      {constellation.map((dot) => (
        <span
          key={dot.id}
          className="constellation-dot"
          style={{ left: dot.left, top: dot.top, animationDelay: dot.delay }}
          aria-hidden="true"
        />
      ))}

      <header className="topbar">
        <div>
          <p className="eyebrow">MAJOR ARCANA / DESIGNER EDITION</p>
          <h1>Designer Tarot</h1>
        </div>
        <div className="status-chip">
          <span />
          30 cards loaded
        </div>
      </header>

      <section className={`hero-stage ${drawState === "revealed" ? "has-reading" : ""}`} aria-label="Designer Tarot prototype">
        <aside className="ritual-panel" aria-label="選擇抽牌情境">
          <div className="panel-heading">
            <h2>今天要面對什麼？</h2>
          </div>

          <div className="scenario-list">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                className={`scenario-button ${scenario.id === "daily" ? "is-daily" : ""} ${selectedScenario === scenario.id ? "is-active" : ""}`}
                type="button"
                onClick={() => handleScenarioChange(scenario.id)}
              >
                <span>{scenario.label}</span>
                <small>{scenario.hint}</small>
              </button>
            ))}
          </div>
        </aside>

        <section className="card-stage">
          <div className="headline-block">
            <p className="short-copy">抽出你的設計神諭</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={selectedScenario}
                className="scenario-spell"
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <span className="spell-pulse" aria-hidden="true" />
                <span>{scenarioCopy[selectedScenario]}</span>
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.button
            type="button"
            className={`draw-card-button ${drawState}`}
            onClick={handleDraw}
            whileHover={{ rotateX: 4, rotateY: -5, y: -6 }}
            whileTap={{ scale: 0.98 }}
            aria-label="抽一張設計師塔羅牌"
          >
            <AnimatePresence mode="wait">
              {drawState === "revealed" && activeCard ? (
                <motion.div
                  key={activeCard.id}
                  className="revealed-card-shell"
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 90, opacity: 0 }}
                  transition={{ duration: 0.56, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <TarotFace card={activeCard} />
                </motion.div>
              ) : (
                <motion.div
                  key="deck"
                  className="deck-shell"
                  initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                  transition={{ duration: drawState === "drawing" ? 0.72 : 0.42, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <DeckSpread state={drawState} selectedIndex={selectedDeckIndex} onSelectCard={setSelectedDeckIndex} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <div className="draw-actions">
            <button
              className="primary-action"
              type="button"
              onClick={() => {
                if (drawState === "revealed") {
                  setDrawState("idle");
                  setActiveCard(null);
                  setSelectedDeckIndex(3);
                  return;
                }
                handleDraw();
              }}
              disabled={drawState === "drawing"}
            >
              {drawState === "drawing" ? "感應中・・・" : drawState === "revealed" ? "重抽一張" : "抽一張牌"}
            </button>
          </div>
        </section>

        <AnimatePresence>
          {drawState === "revealed" && activeCard ? (
            <motion.aside
              key="reading-panel"
              className="result-panel"
              aria-live="polite"
              initial={{ opacity: 0, x: 36, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 28, filter: "blur(8px)" }}
              transition={{ duration: 0.48, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <motion.div
                key={activeCard.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: 0.12 }}
              >
                <div className="result-kicker">
                  <span>{selectedScenarioMeta.label}</span>
                  <span>{activeCard.arcana === "major" ? "Major Arcana" : "Designer Original"}</span>
                </div>
                <h2>{activeCard.displayName}</h2>
                <p className="source-name">{activeCard.sourceName}</p>
                <p className="context-line">{activeCard.designContext}</p>

                <ResultBlock title="你現在的狀態" text={activeCard.currentState} />
                <ResultBlock title="設計提醒" text={activeCard.designReminder} />
                <ResultBlock title="下一步行動" text={activeCard.nextAction} />

                <blockquote>{activeCard.oracleLine}</blockquote>
              </motion.div>
            </motion.aside>
          ) : null}
        </AnimatePresence>
      </section>
    </main>
  );
}

function ResultBlock({ title, text }: { title: string; text: string }) {
  return (
    <section className="result-block">
      <h3>{title}</h3>
      <p>{text}</p>
    </section>
  );
}

const spreadCards = [
  { x: -176, y: 24, rotate: -17, scale: 0.86 },
  { x: -118, y: -8, rotate: -11, scale: 0.9 },
  { x: -60, y: -30, rotate: -5, scale: 0.94 },
  { x: 0, y: -40, rotate: 0, scale: 0.98 },
  { x: 60, y: -30, rotate: 5, scale: 0.94 },
  { x: 118, y: -8, rotate: 11, scale: 0.9 },
  { x: 176, y: 24, rotate: 17, scale: 0.86 },
];

function DeckSpread({
  state,
  selectedIndex,
  onSelectCard,
}: {
  state: DrawState;
  selectedIndex: number;
  onSelectCard: (index: number) => void;
}) {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  function selectNearestCard(clientX: number, clientY: number, target: HTMLDivElement, eventTarget?: EventTarget | null) {
    if (state !== "idle") return;

    const hitCard = eventTarget instanceof Element ? eventTarget.closest<HTMLElement>(".deck-card") : null;
    if (hitCard && target.contains(hitCard)) {
      const hitIndex = Number(hitCard.dataset.cardIndex);
      setHoveredCardIndex(hitIndex);
      onSelectCard(hitIndex);
      return;
    }

    const deckCards = Array.from(target.querySelectorAll<HTMLElement>(".deck-card"));
    const nearest = deckCards.reduce(
      (best, card) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(clientX - centerX, clientY - centerY);
        const index = Number(card.dataset.cardIndex);
        return distance < best.distance ? { distance, index } : best;
      },
      { distance: Number.POSITIVE_INFINITY, index: selectedIndex },
    );

    setHoveredCardIndex(nearest.index);
    onSelectCard(nearest.index);
  }

  return (
    <div
      className={`deck-spread ${state} ${hoveredCardIndex !== null ? "has-hover" : ""}`}
      aria-hidden="true"
      onPointerMove={(event) => selectNearestCard(event.clientX, event.clientY, event.currentTarget, event.target)}
      onMouseMove={(event) => selectNearestCard(event.clientX, event.clientY, event.currentTarget, event.target)}
      onPointerDown={(event) => selectNearestCard(event.clientX, event.clientY, event.currentTarget, event.target)}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        if (touch) selectNearestCard(touch.clientX, touch.clientY, event.currentTarget, event.target);
      }}
      onPointerLeave={() => setHoveredCardIndex(null)}
      onMouseLeave={() => setHoveredCardIndex(null)}
    >
      <div className="deck-aura" />
      {spreadCards.map((card, index) => {
        const isChosen = index === selectedIndex;
        const isHovered = hoveredCardIndex === index;
        const idleY = isHovered ? card.y - 8 : card.y;
        const idleScale = isHovered ? card.scale * 1.025 : card.scale;
        return (
          <motion.div
            key={index}
            className={`deck-card ${isChosen ? "is-chosen" : ""} ${isHovered ? "is-hovered" : ""}`}
            data-card-index={index}
            data-chosen={isChosen ? "true" : "false"}
            style={{ "--i": index } as React.CSSProperties}
            initial={{ x: 0, y: 34, rotate: 0, scale: 0.78, opacity: 0 }}
            animate={
              state === "drawing"
                ? isChosen
                  ? {
                      x: 0,
                      y: [-40, -64, -72],
                      rotate: [0, -1, 0],
                      scale: [0.98, 1.04, 1.08],
                      opacity: 1,
                    }
                  : {
                      x: card.x * 1.08,
                      y: [card.y, card.y + 10, card.y + 34],
                      rotate: [card.rotate, card.rotate + (index < 3 ? -3 : 3)],
                      scale: card.scale * 0.9,
                      opacity: [1, 0.7, 0.28],
                    }
                : {
                    x: card.x,
                    y: idleY,
                    rotate: isHovered ? card.rotate * 0.9 : card.rotate,
                    scale: idleScale,
                    opacity: 1,
                  }
            }
            transition={{
              duration: state === "drawing" ? 0.86 : isHovered ? 0.22 : 0.72,
              delay: state === "drawing" ? index * 0.025 : isHovered ? 0 : index * 0.06,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            <MiniCardBack />
          </motion.div>
        );
      })}
    </div>
  );
}

function MiniCardBack() {
  return (
    <div className="mini-card-back">
      <div className="mini-card-code">DESIGNER TAROT</div>
      <svg viewBox="0 0 120 160" className="mini-card-symbol">
        <rect x="20" y="22" width="80" height="112" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M28 80C40 60 54 52 70 54C84 56 94 66 100 80C92 96 78 104 60 103C44 102 34 94 28 80Z" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="64" cy="80" r="12" fill="#E7FF4F" />
        <circle cx="64" cy="80" r="4.5" fill="#101010" />
        <path d="M78 100L94 126L82 121L75 138Z" fill="#E7FF4F" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </div>
  );
}

function CardBack({ accent }: { accent: string }) {
  return (
    <article className="tarot-card card-back" style={{ "--accent": accent } as React.CSSProperties}>
      <div className="crop-mark top-left" />
      <div className="crop-mark top-right" />
      <div className="crop-mark bottom-left" />
      <div className="crop-mark bottom-right" />
      <div className="card-code">DESIGNER TAROT</div>
      <svg className="card-symbol" viewBox="0 0 220 260" role="img" aria-label="Designer Tarot 牌背">
        <rect x="34" y="38" width="152" height="184" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M54 130C74 96 98 82 126 86C150 90 168 106 180 130C164 160 142 174 112 172C86 170 66 156 54 130Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="118" cy="130" r="22" fill="var(--accent)" />
        <circle cx="118" cy="130" r="8" fill="#101010" />
        <path d="M144 162L170 202L149 194L136 218Z" fill="var(--accent)" stroke="currentColor" strokeWidth="2" />
        <path d="M62 62H86M62 198H86M154 62H178M154 198H178" stroke="currentColor" strokeWidth="2" />
      </svg>
      <p className="back-oracle">ASK THE BRIEF / ALIGN THE CHAOS</p>
    </article>
  );
}

function TarotFace({ card }: { card: DesignerTarotCard }) {
  return (
    <article
      className={`tarot-card card-face pattern-${card.visual.pattern} layout-${card.visual.layout} intensity-${card.visual.intensity}`}
      style={{ "--accent": card.visual.accentColor } as React.CSSProperties}
    >
      <div className="crop-mark top-left" />
      <div className="crop-mark top-right" />
      <div className="crop-mark bottom-left" />
      <div className="crop-mark bottom-right" />
      <header className="card-face-header">
        <span>{card.id.toUpperCase()}</span>
        <span>{card.arcana === "major" ? "MAJOR" : "ORIGINAL"}</span>
      </header>
      <div className="symbol-window">
        <Symbol symbol={card.visual.symbol} />
      </div>
      <footer className="card-face-footer">
        <p>{card.sourceName}</p>
        <h2>{card.displayName}</h2>
      </footer>
    </article>
  );
}

function Symbol({ symbol }: { symbol: VisualSymbol }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (symbol) {
    case "empty-frame":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <rect x="48" y="44" width="124" height="132" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M48 78H172M82 44V176M48 142H172M138 44V176" stroke="currentColor" strokeWidth="1.8" strokeDasharray="5 9" opacity="0.72" />
          <path d="M66 62H102M66 158H94M136 62H154M144 158H154" stroke="var(--accent)" strokeWidth="4" />
          <path d="M112 92L166 150L139 144L126 178Z" fill="var(--accent)" stroke="currentColor" strokeWidth="3" />
          <path {...common} d="M42 34H74M34 42V74M146 186H178M186 146V178" />
          <circle cx="110" cy="110" r="6" fill="currentColor" />
        </svg>
      );
    case "wand-tools":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <circle {...common} cx="110" cy="110" r="70" />
          <path d="M58 160L150 68" stroke="var(--accent)" strokeWidth="9" strokeLinecap="round" />
          <path {...common} d="M146 48L172 74M136 58L162 84M54 166L74 186" />
          <path {...common} d="M58 68H96M58 88H84M128 152H168M142 172H168" />
          <circle cx="62" cy="68" r="6" fill="currentColor" />
          <circle cx="96" cy="68" r="6" fill="currentColor" />
          <circle cx="128" cy="152" r="6" fill="currentColor" />
          <circle cx="168" cy="152" r="6" fill="currentColor" />
          <path {...common} d="M88 128C106 118 118 106 128 88" />
        </svg>
      );
    case "system-grid":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <rect {...common} x="42" y="38" width="136" height="144" />
          <path d="M42 74H178M42 110H178M42 146H178M76 38V182M110 38V182M144 38V182" stroke="currentColor" strokeWidth="2" opacity="0.76" />
          <rect x="76" y="74" width="68" height="72" fill="var(--accent)" opacity="0.92" />
          <rect x="58" y="54" width="34" height="20" fill="none" stroke="currentColor" strokeWidth="3" />
          <rect x="128" y="146" width="34" height="20" fill="none" stroke="currentColor" strokeWidth="3" />
          <path {...common} d="M34 110H42M178 110H186M110 30V38M110 182V190" />
        </svg>
      );
    case "intuition-eye":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <path d="M36 110C56 72 82 54 112 58C142 62 166 82 184 110C162 144 136 162 106 160C78 158 54 142 36 110Z" fill="none" stroke="currentColor" strokeWidth="4" />
          <circle cx="112" cy="110" r="30" fill="var(--accent)" />
          <circle cx="112" cy="110" r="10" fill="#101010" />
          <path d="M112 30V62M112 158V190M54 54L76 76M166 54L146 76M52 168L76 144M168 168L146 144" stroke="currentColor" strokeWidth="2" strokeDasharray="4 8" />
          <path {...common} d="M78 110H56M166 110H144" />
        </svg>
      );
    case "bloom":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <circle cx="110" cy="110" r="22" fill="var(--accent)" />
          <path d="M110 36C130 62 130 82 110 102C90 82 90 62 110 36Z" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M110 184C90 158 90 138 110 118C130 138 130 158 110 184Z" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M36 110C62 90 82 90 102 110C82 130 62 130 36 110Z" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M184 110C158 130 138 130 118 110C138 90 158 90 184 110Z" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M58 58C90 64 102 78 104 104C78 102 64 90 58 58ZM162 58C156 90 142 102 116 104C118 78 130 64 162 58ZM58 162C64 130 78 118 104 116C102 142 90 156 58 162ZM162 162C130 156 118 142 116 116C142 118 156 130 162 162Z" fill="var(--accent)" opacity="0.68" />
        </svg>
      );
    case "classic-columns":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <path {...common} d="M52 62H168M62 46H158M46 174H174M60 190H160" />
          <rect x="64" y="72" width="22" height="92" fill="var(--accent)" />
          <rect x="99" y="72" width="22" height="92" fill="var(--accent)" opacity="0.78" />
          <rect x="134" y="72" width="22" height="92" fill="var(--accent)" opacity="0.56" />
          <path {...common} d="M48 62L110 34L172 62M70 72V164M105 72V164M140 72V164" />
        </svg>
      );
    case "paired-shapes":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <circle cx="82" cy="102" r="42" fill="none" stroke="currentColor" strokeWidth="4" />
          <rect x="104" y="70" width="72" height="72" rx="8" fill="var(--accent)" />
          <path {...common} d="M82 144L82 176M140 142V176M62 176H160" />
          <path d="M68 102H96M126 106H154M110 54C116 42 126 36 140 36C154 36 164 44 166 58" stroke="currentColor" strokeWidth="3" strokeDasharray="5 8" fill="none" />
        </svg>
      );
    case "chariot-arrow":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <path d="M42 118H142L142 82L188 110L142 138V102H42Z" fill="var(--accent)" />
          <path {...common} d="M44 72H112M44 148H112M62 52H98M62 168H98" />
          <circle {...common} cx="76" cy="170" r="14" />
          <circle {...common} cx="150" cy="170" r="14" />
          <path {...common} d="M74 156L104 126M150 156L130 132" />
        </svg>
      );
    case "soft-force":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <path d="M58 124C58 78 82 48 112 48C142 48 164 76 164 112C164 152 140 176 110 176C82 176 58 154 58 124Z" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M72 124C90 104 106 100 122 112C138 124 144 110 148 90" fill="none" stroke="var(--accent)" strokeWidth="9" strokeLinecap="round" />
          <path {...common} d="M82 70C96 62 114 62 128 70M84 154C100 164 124 164 140 150" />
          <circle cx="82" cy="124" r="7" fill="currentColor" />
          <circle cx="148" cy="90" r="7" fill="currentColor" />
        </svg>
      );
    case "lantern":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <path {...common} d="M84 64H136L150 92V158H70V92Z" />
          <path d="M88 100H132V148H88Z" fill="var(--accent)" />
          <path {...common} d="M96 64V44H124V64M82 158L60 188M138 158L160 188M70 92H150" />
          <path d="M36 110H60M160 110H184M52 70L68 82M168 70L152 82" stroke="currentColor" strokeWidth="2" strokeDasharray="4 8" />
        </svg>
      );
    case "fortune-wheel":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <circle {...common} cx="110" cy="110" r="72" />
          <circle cx="110" cy="110" r="24" fill="var(--accent)" />
          <path {...common} d="M110 38V182M38 110H182M60 60L160 160M160 60L60 160" />
          <path d="M110 24L122 44H98ZM196 110L176 122V98ZM110 196L98 176H122ZM24 110L44 98V122Z" fill="var(--accent)" />
          <path d="M80 32C104 20 136 24 158 44M188 80C200 106 196 138 176 160" stroke="currentColor" strokeWidth="2" strokeDasharray="5 9" fill="none" />
        </svg>
      );
    case "scales":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <path {...common} d="M110 42V174M78 174H142M64 70H156M64 70L42 126H86ZM156 70L134 126H178Z" />
          <path d="M42 126H86C82 146 46 146 42 126ZM134 126H178C174 146 138 146 134 126Z" fill="var(--accent)" />
          <circle cx="110" cy="70" r="10" fill="currentColor" />
          <path {...common} d="M92 190H128" />
        </svg>
      );
    case "inverted-frame":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <g transform="rotate(180 110 110)">
            <rect {...common} x="54" y="42" width="112" height="136" />
            <path d="M54 82H166M82 42V178M138 42V178M54 138H166" stroke="currentColor" strokeWidth="2" strokeDasharray="5 8" />
            <path d="M86 102H134V132H86Z" fill="var(--accent)" />
            <path d="M110 60L128 86H92Z" fill="currentColor" />
          </g>
          <path d="M48 32C70 22 94 22 110 38M172 188C150 198 126 198 110 182" stroke="var(--accent)" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "cut-mark":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <path {...common} d="M56 52H160V168H56Z" />
          <path d="M44 44L176 176M176 44L44 176" stroke="var(--accent)" strokeWidth="8" strokeLinecap="round" />
          <path {...common} d="M34 52H62M52 34V62M158 186H186M168 158V186" />
          <path d="M78 86H142M78 110H128M78 134H112" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "balance-cups":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <path {...common} d="M72 64H110C110 94 98 112 82 112C66 112 54 94 54 64H72ZM148 64H186C186 94 174 112 158 112C142 112 130 94 130 64H148Z" />
          <path d="M72 64H110C110 86 100 98 82 98C64 98 54 86 54 64ZM148 64H186C186 86 176 98 158 98C140 98 130 86 130 64Z" fill="var(--accent)" />
          <path {...common} d="M110 74C124 86 128 94 130 110M110 146C96 134 92 126 90 110M82 112V166M158 112V166M62 166H102M138 166H178" />
          <circle cx="110" cy="110" r="12" fill="currentColor" />
        </svg>
      );
    case "fog-moon":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <path d="M132 42C104 54 90 78 90 110C90 142 106 166 134 178C88 178 52 148 52 110C52 72 88 42 132 42Z" fill="var(--accent)" />
          <path {...common} d="M48 86H178M36 112H160M58 138H188" />
          <path d="M64 86H98M118 112H150M78 138H126" stroke="#101010" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
          <circle cx="156" cy="70" r="5" fill="currentColor" />
          <circle cx="176" cy="150" r="4" fill="currentColor" />
        </svg>
      );
    case "sun-proof":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <circle cx="110" cy="110" r="42" fill="var(--accent)" />
          <circle {...common} cx="110" cy="110" r="68" />
          <path d="M110 24V54M110 166V196M24 110H54M166 110H196M50 50L72 72M170 50L148 72M50 170L72 148M170 170L148 148" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M84 110H136M94 128H126" stroke="#101010" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case "review-call":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <rect {...common} x="46" y="48" width="128" height="116" rx="4" />
          <path d="M66 78H138M66 104H154M66 130H118" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M136 132H174V170H148L132 188V132Z" fill="var(--accent)" />
          <path d="M146 146H164M146 158H158" stroke="#101010" strokeWidth="4" strokeLinecap="round" />
          <path {...common} d="M72 38V58M110 38V58M148 38V58" />
        </svg>
      );
    case "world-frame":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <circle {...common} cx="110" cy="110" r="72" />
          <rect x="66" y="66" width="88" height="88" rx="6" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M66 96H154M96 66V154M66 124H154M124 66V154" stroke="currentColor" strokeWidth="2" strokeDasharray="5 8" />
          <path d="M86 86H134V134H86Z" fill="var(--accent)" />
          <path {...common} d="M54 54L38 38M166 54L182 38M54 166L38 182M166 166L182 182" />
        </svg>
      );
    case "moodboard":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <rect x="42" y="52" width="56" height="46" fill="var(--accent)" />
          <rect x="116" y="40" width="62" height="62" fill="none" stroke="currentColor" strokeWidth="4" />
          <rect x="54" y="118" width="48" height="58" fill="none" stroke="currentColor" strokeWidth="4" />
          <rect x="122" y="124" width="50" height="38" fill="var(--accent)" opacity="0.72" />
          <path {...common} d="M98 76L116 70M102 142L122 140M82 118L128 102" />
          <circle cx="148" cy="70" r="9" fill="var(--accent)" />
        </svg>
      );
    case "pitch-stage":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <path {...common} d="M52 58H168V138H52Z" />
          <path d="M76 82H144M76 106H126" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M138 92L174 128L148 122L136 150Z" fill="var(--accent)" stroke="currentColor" strokeWidth="3" />
          <path {...common} d="M72 138L54 184M148 138L166 184M88 184H132" />
          <path d="M48 42H172" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case "blank-canvas":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <rect {...common} x="50" y="44" width="120" height="132" />
          <path d="M66 60H92M66 160H86M148 60H154M144 160H154" stroke="var(--accent)" strokeWidth="4" />
          <path d="M74 86H146M74 110H146M74 134H146" stroke="currentColor" strokeWidth="2" strokeDasharray="3 10" opacity="0.36" />
          <circle cx="110" cy="110" r="8" fill="var(--accent)" />
          <path {...common} d="M110 84V100M110 120V136M84 110H100M120 110H136" />
        </svg>
      );
    case "broken-grid":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <path {...common} d="M54 32H168V188H48Z" />
          <path {...common} d="M52 82H168M52 130H168M90 34V186M130 34V186" />
          <path d="M72 44L116 98L92 116L150 176" stroke="var(--accent)" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path {...common} d="M132 52L114 98L154 112L132 168" />
          <path d="M42 62L66 50M158 34L184 22M154 188L184 204M36 164L60 182" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <rect x="96" y="91" width="34" height="34" fill="#101010" stroke="currentColor" strokeWidth="3" />
        </svg>
      );
    case "north-star":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <path d="M110 26L126 92L194 110L126 128L110 194L94 128L26 110L94 92Z" fill="var(--accent)" />
          <circle {...common} cx="110" cy="110" r="58" />
          <circle {...common} cx="110" cy="110" r="30" />
          <path {...common} d="M36 110H184M110 36V184" />
          <path d="M58 58L78 78M162 58L142 78M58 162L78 142M162 162L142 142" stroke="currentColor" strokeWidth="2" strokeDasharray="4 8" />
        </svg>
      );
    case "pixel-chain":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <rect x="38" y="52" width="48" height="48" fill="var(--accent)" />
          <rect x="134" y="120" width="48" height="48" fill="var(--accent)" />
          <rect {...common} x="86" y="76" width="48" height="48" />
          <path {...common} d="M86 100H66V120M134 144H154V100M62 120H92M128 100H158" />
          <path d="M42 152H82V192H42ZM138 28H178V68H138Z" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M52 162H72M52 172H72M52 182H72M148 38H168M148 48H168M148 58H168" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "feedback-loop":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <path {...common} d="M65 126C44 104 56 62 92 62C122 62 126 94 150 94C174 94 184 70 168 54" />
          <path {...common} d="M155 94C178 116 166 158 130 158C100 158 94 126 70 126C48 126 38 148 52 166" />
          <path d="M56 156H88V186H62L48 200V156Z" fill="var(--accent)" />
          <path d="M132 28H174V64H142L126 78V28Z" fill="var(--accent)" />
          <path d="M64 168H78M140 42H162" stroke="#101010" strokeWidth="4" strokeLinecap="round" />
          <circle cx="110" cy="110" r="18" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="5 7" />
          <path {...common} d="M94 110H126" />
        </svg>
      );
    case "redline":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <rect {...common} x="48" y="46" width="124" height="128" />
          <path d="M32 72H188M66 30V190M154 30V190M36 160H184" stroke="var(--accent)" strokeWidth="4" strokeDasharray="8 8" />
          <path {...common} d="M82 92H138M82 118H118" />
          <circle cx="154" cy="160" r="12" fill="var(--accent)" />
        </svg>
      );
    case "deadline":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <circle {...common} cx="110" cy="110" r="70" />
          <path d="M110 48V112L154 138" stroke="var(--accent)" strokeWidth="8" strokeLinecap="round" />
          <path {...common} d="M68 28L48 48M152 28L172 48M74 176L58 198M146 176L162 198" />
        </svg>
      );
    case "ux-ghost":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <path d="M62 178V94C62 58 84 38 110 38C136 38 158 58 158 94V178L140 162L124 178L108 162L92 178L78 162Z" fill="var(--accent)" />
          <circle cx="92" cy="98" r="8" fill="#101010" />
          <circle cx="128" cy="98" r="8" fill="#101010" />
          <path {...common} d="M78 138H142M72 64C58 60 46 52 38 40M148 64C162 60 174 52 182 40" />
          <path d="M36 154C56 138 72 130 94 128M184 154C164 138 148 130 126 128" stroke="currentColor" strokeWidth="2" strokeDasharray="4 8" />
          <path d="M150 138L184 174L160 168L148 194Z" fill="#101010" stroke="currentColor" strokeWidth="3" />
        </svg>
      );
    case "many-heads":
      return (
        <svg viewBox="0 0 220 220" className="symbol-svg">
          <circle cx="72" cy="78" r="26" fill="var(--accent)" />
          <circle cx="146" cy="74" r="30" fill="var(--accent)" />
          <circle cx="110" cy="134" r="38" fill="var(--accent)" />
          <path {...common} d="M72 104L92 124M146 104L130 124M74 164H146M52 44L34 28M170 42L190 26" />
        </svg>
      );
    default:
      return <GenericSymbol symbol={symbol} />;
  }
}

function GenericSymbol({ symbol }: { symbol: VisualSymbol }) {
  const seed = symbol.length;
  return (
    <svg viewBox="0 0 220 220" className="symbol-svg">
      <rect x="48" y="44" width="124" height="132" rx="5" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="110" cy="110" r={34 + (seed % 18)} fill="var(--accent)" />
      <path d="M62 78H158M62 142H158M82 54V166M138 54V166" stroke="currentColor" strokeWidth="2" strokeDasharray="5 9" />
      <path d={`M${64 + (seed % 26)} 152L110 60L${158 - (seed % 24)} 152Z`} fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx={74 + (seed % 64)} cy={68 + (seed % 38)} r="7" fill="currentColor" />
      <path d="M138 150L172 184L148 178L136 202Z" fill="currentColor" />
    </svg>
  );
}

export default App;
