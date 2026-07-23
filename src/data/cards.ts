export type Arcana = "major" | "designer";

export type VisualSymbol =
  | "empty-frame"
  | "wand-tools"
  | "intuition-eye"
  | "bloom"
  | "system-grid"
  | "classic-columns"
  | "paired-shapes"
  | "chariot-arrow"
  | "soft-force"
  | "lantern"
  | "fortune-wheel"
  | "scales"
  | "inverted-frame"
  | "cut-mark"
  | "balance-cups"
  | "pixel-chain"
  | "broken-grid"
  | "north-star"
  | "fog-moon"
  | "sun-proof"
  | "review-call"
  | "world-frame"
  | "feedback-loop"
  | "moodboard"
  | "deadline"
  | "ux-ghost"
  | "pitch-stage"
  | "blank-canvas"
  | "redline"
  | "many-heads";

export type DesignerTarotCard = {
  id: string;
  arcana: Arcana;
  sourceName: string;
  displayName: string;
  designContext: string;
  currentState: string;
  designReminder: string;
  nextAction: string;
  oracleLine: string;
  moodTags: string[];
  visual: {
    symbol: VisualSymbol;
    accentColor: string;
    pattern: "grid" | "broken" | "orbit" | "notes" | "radial" | "quiet";
    intensity: "low" | "medium" | "high";
    layout: "portal" | "axis" | "split" | "shrine" | "rupture" | "constellation" | "stack" | "stage";
  };
};

export const scenarios = [
  { id: "daily", label: "今日一抽", hint: "讓今日設計運勢先開稿" },
  { id: "stuck", label: "我卡住了", hint: "問問卡點背後的訊號" },
  { id: "bad-brief", label: "客戶提出奇妙需求", hint: "請宇宙翻譯需求" },
  { id: "pitch", label: "提案前求生", hint: "校準說服與信念" },
  { id: "feedback", label: "Feedback 打來了", hint: "看清楚真正要改的東西" },
  { id: "redo", label: "我想重做", hint: "確認該救還是放生" },
  { id: "tired", label: "我快沒力了", hint: "替審美疲勞留一盞燈" },
] as const;

export type ScenarioId = (typeof scenarios)[number]["id"];

export const cards: DesignerTarotCard[] = [
  {
    id: "major-00",
    arcana: "major",
    sourceName: "The Fool",
    displayName: "開稿者",
    designContext: "新案開始、方向未定、亂提案",
    currentState: "你站在一個還沒有形狀的案子前，手上只有一份不完整的 brief 和一點衝動。",
    designReminder: "不要等完美 brief 才開始，第一個不成熟的想法會幫你打開方向。",
    nextAction: "開一個空白 frame，先做 3 個很粗的方向，不准修細節。",
    oracleLine: "先亂畫，宇宙才知道要給你什麼。",
    moodTags: ["start", "brief", "ideation"],
    visual: { symbol: "empty-frame", accentColor: "#E7FF4F", pattern: "grid", intensity: "medium", layout: "portal" },
  },
  {
    id: "major-01",
    arcana: "major",
    sourceName: "The Magician",
    displayName: "工具魔術師",
    designContext: "工具掌握、風格轉換、解法生成",
    currentState: "你其實已經有足夠資源，只是還沒把它們排成一個解法。",
    designReminder: "工具不是重點，轉化能力才是。",
    nextAction: "列出手上已有的素材、限制與可用元件，組成第一個可展示版本。",
    oracleLine: "你不是缺工具，你是還沒施法。",
    moodTags: ["craft", "resources", "execution"],
    visual: { symbol: "wand-tools", accentColor: "#59D8FF", pattern: "orbit", intensity: "medium", layout: "axis" },
  },
  {
    id: "major-02",
    arcana: "major",
    sourceName: "The High Priestess",
    displayName: "直覺女祭司",
    designContext: "審美判斷、潛意識靈感",
    currentState: "你說不出原因，但知道有一個地方不太對。",
    designReminder: "有些設計判斷無法立刻被數據證明，但你的眼睛已經先看見了。",
    nextAction: "把「怪怪的」具體標出來：是節奏、比例、層級、語氣，還是資訊順序。",
    oracleLine: "你的直覺不是任性，是尚未命名的判斷。",
    moodTags: ["intuition", "taste", "critique"],
    visual: { symbol: "intuition-eye", accentColor: "#8BAA91", pattern: "quiet", intensity: "low", layout: "shrine" },
  },
  {
    id: "major-03",
    arcana: "major",
    sourceName: "The Empress",
    displayName: "美感豐饒者",
    designContext: "視覺創造、風格養成、靈感充沛",
    currentState: "你的想像力開始滿出來，很多畫面都在同時冒出來。",
    designReminder: "先讓東西長出來，再決定要修剪什麼。",
    nextAction: "做一張情緒板，允許它過度豐富，暫時不要急著收斂。",
    oracleLine: "美感需要出口，不需要先被批准。",
    moodTags: ["visual", "moodboard", "abundance"],
    visual: { symbol: "bloom", accentColor: "#FF6FAE", pattern: "radial", intensity: "medium", layout: "constellation" },
  },
  {
    id: "major-04",
    arcana: "major",
    sourceName: "The Emperor",
    displayName: "系統制定者",
    designContext: "Design system、規範、資訊架構",
    currentState: "你開始意識到，這個設計不能只靠感覺撐下去。",
    designReminder: "好看的畫面需要秩序，秩序會讓它能被延展。",
    nextAction: "定義 3 條最重要的版面規則，例如間距、層級、狀態與元件用法。",
    oracleLine: "沒有規則的美，很快就會變成災難。",
    moodTags: ["system", "structure", "rules"],
    visual: { symbol: "system-grid", accentColor: "#4067FF", pattern: "grid", intensity: "high", layout: "stack" },
  },
  {
    id: "major-05",
    arcana: "major",
    sourceName: "The Hierophant",
    displayName: "規範守門人",
    designContext: "設計原則、品牌規範、既有模式",
    currentState: "你正在傳統做法與創新衝動之間拉扯。",
    designReminder: "不一定要反叛，經典模式能留下來通常有它的理由。",
    nextAction: "先找出既有規範真正想保護的是什麼，再決定要不要打破。",
    oracleLine: "有些框架不是限制，是前人留下的捷徑。",
    moodTags: ["convention", "brand", "pattern"],
    visual: { symbol: "classic-columns", accentColor: "#C8C0B5", pattern: "quiet", intensity: "low", layout: "shrine" },
  },
  {
    id: "major-06",
    arcana: "major",
    sourceName: "The Lovers",
    displayName: "選擇與搭配",
    designContext: "色彩選擇、合作、方向取捨",
    currentState: "你面前有兩個都不錯的方向，但它們不能同時成為主角。",
    designReminder: "設計是一場選擇，留下什麼也代表你願意放棄什麼。",
    nextAction: "為每個方向寫一句核心主張，選那個最能服務目標的。",
    oracleLine: "不是每個好東西都適合在一起。",
    moodTags: ["choice", "pairing", "collaboration"],
    visual: { symbol: "paired-shapes", accentColor: "#FF6FAE", pattern: "orbit", intensity: "medium", layout: "split" },
  },
  {
    id: "major-07",
    arcana: "major",
    sourceName: "The Chariot",
    displayName: "衝刺戰車",
    designContext: "趕稿、提案、專案推進",
    currentState: "你已經進入推進期，時間不適合再無限發散。",
    designReminder: "速度需要方向，不然只是在高速迷路。",
    nextAction: "鎖定今天必須完成的一個可展示切片，其他先放進停車場。",
    oracleLine: "拉緊韁繩，別讓靈感把你載去別的案子。",
    moodTags: ["sprint", "focus", "deadline"],
    visual: { symbol: "chariot-arrow", accentColor: "#FF563F", pattern: "grid", intensity: "high", layout: "axis" },
  },
  {
    id: "major-08",
    arcana: "major",
    sourceName: "Strength",
    displayName: "柔性堅持",
    designContext: "捍衛設計、跨職能溝通、說服",
    currentState: "你知道這個設計有價值，但需要讓別人也看見。",
    designReminder: "真正的力量不是硬推，而是讓對方願意跟你一起往前。",
    nextAction: "把主張改成對方聽得懂的語言：風險、效率、轉換、維護或使用者價值。",
    oracleLine: "溫柔不是退讓，是高階說服。",
    moodTags: ["persuasion", "stakeholder", "courage"],
    visual: { symbol: "soft-force", accentColor: "#8BAA91", pattern: "orbit", intensity: "medium", layout: "split" },
  },
  {
    id: "major-09",
    arcana: "major",
    sourceName: "The Hermit",
    displayName: "深度模式",
    designContext: "設計倦怠、靈感低潮、自我重整",
    currentState: "你吸收太多參考、意見與雜訊，開始聽不到自己的判斷。",
    designReminder: "你需要的不是更多輸入，而是一段可以沉澱的空白。",
    nextAction: "關掉參考 30 分鐘，只看自己的畫面並寫下 5 個問題。",
    oracleLine: "靈感有時不是找來的，是安靜後浮上來的。",
    moodTags: ["burnout", "solitude", "focus"],
    visual: { symbol: "lantern", accentColor: "#E7FF4F", pattern: "quiet", intensity: "low", layout: "shrine" },
  },
  {
    id: "major-10",
    arcana: "major",
    sourceName: "Wheel of Fortune",
    displayName: "流量之輪",
    designContext: "爆紅、滑鐵盧、演算法波動",
    currentState: "你正在被外部反應影響，開始懷疑作品的價值。",
    designReminder: "起落是系統的一部分，不是你整個人的評分。",
    nextAction: "分開看「作品品質」與「外部反應」，各寫一個可調整項目。",
    oracleLine: "今日轉爆，明日沒人看；設計師仍要開稿。",
    moodTags: ["visibility", "algorithm", "uncertainty"],
    visual: { symbol: "fortune-wheel", accentColor: "#59D8FF", pattern: "radial", intensity: "high", layout: "constellation" },
  },
  {
    id: "major-11",
    arcana: "major",
    sourceName: "Justice",
    displayName: "設計審判",
    designContext: "設計倫理、使用者價值、決策檢查",
    currentState: "你正在面對一個看似合理、但內心不太踏實的決策。",
    designReminder: "問題不是畫面能不能成立，而是它是否誠實地服務使用者。",
    nextAction: "用一張表檢查：誰受益、誰受損、誰被忽略、資訊是否透明。",
    oracleLine: "好看的設計，也要經得起良心放大。",
    moodTags: ["ethics", "user", "decision"],
    visual: { symbol: "scales", accentColor: "#F4F0E8", pattern: "grid", intensity: "medium", layout: "split" },
  },
  {
    id: "major-12",
    arcana: "major",
    sourceName: "The Hanged Man",
    displayName: "反向觀看者",
    designContext: "換位思考、暫停決策、重新理解問題",
    currentState: "你卡在同一個解法裡太久，越改越像原地旋轉。",
    designReminder: "卡住不是壞事，可能只是視角需要翻面。",
    nextAction: "從使用者、PM、客服或工程角度各寫一句「他們真正怕的是什麼」。",
    oracleLine: "倒過來看，問題可能就正了。",
    moodTags: ["perspective", "stuck", "reframing"],
    visual: { symbol: "inverted-frame", accentColor: "#6D5D7A", pattern: "quiet", intensity: "medium", layout: "portal" },
  },
  {
    id: "major-13",
    arcana: "major",
    sourceName: "Death",
    displayName: "殺掉爛點子",
    designContext: "捨棄過時風格、砍掉不必要功能",
    currentState: "你知道有些東西不該留下，只是捨不得前面花過的力氣。",
    designReminder: "停止不是失敗，停止是替新的方向騰出空間。",
    nextAction: "刪掉一個最拖累畫面的元素，觀察整體是否更清楚。",
    oracleLine: "有些 idea 的使命，就是被你親手埋葬。",
    moodTags: ["cut", "reset", "clarity"],
    visual: { symbol: "cut-mark", accentColor: "#FF5A5F", pattern: "broken", intensity: "high", layout: "rupture" },
  },
  {
    id: "major-14",
    arcana: "major",
    sourceName: "Temperance",
    displayName: "視覺調和者",
    designContext: "品牌一致、節制、平衡",
    currentState: "你正在尋找剛剛好的比例，不需要再把聲量拉高。",
    designReminder: "這次不需要驚世駭俗，協調本身就是解法。",
    nextAction: "檢查色彩、字級、留白與元件狀態，讓其中一項安靜下來。",
    oracleLine: "剛剛好，是一種很難的魔法。",
    moodTags: ["balance", "visual", "restraint"],
    visual: { symbol: "balance-cups", accentColor: "#8BAA91", pattern: "orbit", intensity: "low", layout: "axis" },
  },
  {
    id: "major-15",
    arcana: "major",
    sourceName: "The Devil",
    displayName: "像素執念",
    designContext: "過度打磨、完美主義、自我綁架",
    currentState: "你被細節綁住了，正在用 1px 的問題拖延真正的決策。",
    designReminder: "完美主義有時只是焦慮穿上了專業外套。",
    nextAction: "設一個 20 分鐘 timer，時間到就輸出，不准再調。",
    oracleLine: "離開那個 1px，祂不值得你的靈魂。",
    moodTags: ["perfectionism", "anxiety", "polish"],
    visual: { symbol: "pixel-chain", accentColor: "#C8FF3D", pattern: "broken", intensity: "high", layout: "stack" },
  },
  {
    id: "major-16",
    arcana: "major",
    sourceName: "The Tower",
    displayName: "重構之塔",
    designContext: "客戶打槍、方向崩塌、全案重來",
    currentState: "你原本相信的架構被推翻，現在看起來像一場災難。",
    designReminder: "舊架構撐不住不是壞事，它只是提早暴露了問題。",
    nextAction: "列出哪些要保留、哪些必須重來，先救核心，不救裝飾。",
    oracleLine: "崩塌不是結束，是系統更新前的提示音。",
    moodTags: ["rebuild", "feedback", "crisis"],
    visual: { symbol: "broken-grid", accentColor: "#FF563F", pattern: "broken", intensity: "high", layout: "rupture" },
  },
  {
    id: "major-17",
    arcana: "major",
    sourceName: "The Star",
    displayName: "初衷之星",
    designContext: "願景、信念、設計熱情",
    currentState: "你有點累，但還記得自己在意這件事的原因。",
    designReminder: "回到最初想服務的人，噪音會開始變小。",
    nextAction: "寫下這個設計最想改善的一個瞬間，讓它重新成為北極星。",
    oracleLine: "你不是迷路，只是太久沒抬頭。",
    moodTags: ["hope", "vision", "purpose"],
    visual: { symbol: "north-star", accentColor: "#59D8FF", pattern: "radial", intensity: "medium", layout: "constellation" },
  },
  {
    id: "major-18",
    arcana: "major",
    sourceName: "The Moon",
    displayName: "模糊需求",
    designContext: "不確定、誤解、資訊不透明",
    currentState: "你在霧裡前進，很多需求聽起來像真相，其實只是猜測。",
    designReminder: "不是你想太多，是資訊還沒清楚。",
    nextAction: "把所有不確定寫成問題，標出誰能回答、何時回答。",
    oracleLine: "霧沒有要害你，它只是要你開燈。",
    moodTags: ["ambiguity", "research", "brief"],
    visual: { symbol: "fog-moon", accentColor: "#6D5D7A", pattern: "quiet", intensity: "medium", layout: "shrine" },
  },
  {
    id: "major-19",
    arcana: "major",
    sourceName: "The Sun",
    displayName: "過稿之日",
    designContext: "成果展現、理解被看見、正向回饋",
    currentState: "你的設計終於被理解，能量也開始回來。",
    designReminder: "被看見的時候，記得保留這次成功的脈絡。",
    nextAction: "截圖並記錄這版為什麼成立，未來會用得上。",
    oracleLine: "今天大家都看懂了，連投影機都站在你這邊。",
    moodTags: ["success", "clarity", "validation"],
    visual: { symbol: "sun-proof", accentColor: "#E7FF4F", pattern: "radial", intensity: "high", layout: "constellation" },
  },
  {
    id: "major-20",
    arcana: "major",
    sourceName: "Judgement",
    displayName: "設計回顧",
    designContext: "Review、復盤、版本選擇",
    currentState: "你站在一個階段的尾聲，需要判斷哪些經驗該留下。",
    designReminder: "復盤不是處罰自己，而是把混亂變成下次的判斷力。",
    nextAction: "寫下 3 件下次會保留的做法，以及 1 件不再重複的事。",
    oracleLine: "每一次 review，都是下一個版本的召喚。",
    moodTags: ["review", "learning", "iteration"],
    visual: { symbol: "review-call", accentColor: "#FF6FAE", pattern: "notes", intensity: "medium", layout: "stage" },
  },
  {
    id: "major-21",
    arcana: "major",
    sourceName: "The World",
    displayName: "交付完成",
    designContext: "上線、結案、作品集、完整閉環",
    currentState: "一個階段完成了，你終於可以把它整理成完整故事。",
    designReminder: "結案不是把檔案丟出去，而是替作品建立可被理解的脈絡。",
    nextAction: "整理 before / after、關鍵決策與影響，放進作品集或 handoff。",
    oracleLine: "完成不是終點，是可被展示的入口。",
    moodTags: ["delivery", "launch", "portfolio"],
    visual: { symbol: "world-frame", accentColor: "#4067FF", pattern: "grid", intensity: "medium", layout: "portal" },
  },
  {
    id: "designer-01",
    arcana: "designer",
    sourceName: "Original",
    displayName: "回饋迴圈",
    designContext: "不斷被改、卡審核、意見來回",
    currentState: "你不是沒做事，你只是被困在「再調一下」的結界裡。",
    designReminder: "這不一定是做不好，可能是對方還沒放心。",
    nextAction: "問出這次 feedback 真正想降低的風險，而不是只照字面改。",
    oracleLine: "改稿不是輪迴，除非你沒有問清楚。",
    moodTags: ["feedback", "revision", "stakeholder"],
    visual: { symbol: "feedback-loop", accentColor: "#FF6FAE", pattern: "notes", intensity: "high", layout: "rupture" },
  },
  {
    id: "designer-02",
    arcana: "designer",
    sourceName: "Original",
    displayName: "靈感牆",
    designContext: "收集參考、風格未定、方向發散",
    currentState: "你開了很多視窗，每個都很美，但沒有一個真的成為方向。",
    designReminder: "參考不是用來複製，是用來辨認你想靠近什麼。",
    nextAction: "把 moodboard 分成「想要的感覺」與「不適合的誘惑」。",
    oracleLine: "多看不是迷路，是在召喚下一個判斷。",
    moodTags: ["moodboard", "inspiration", "style"],
    visual: { symbol: "moodboard", accentColor: "#59D8FF", pattern: "notes", intensity: "medium", layout: "stack" },
  },
  {
    id: "designer-03",
    arcana: "designer",
    sourceName: "Original",
    displayName: "死線",
    designContext: "時間壓力、趕稿、設計過勞",
    currentState: "時間開始收縮，你的腦袋也跟著變得很吵。",
    designReminder: "死線會壓縮選擇，也會逼出真正重要的東西。",
    nextAction: "切出 must-have、should-have、nice-to-have，先保住 must-have。",
    oracleLine: "死線不是神，但它很常裝成神。",
    moodTags: ["deadline", "pressure", "prioritization"],
    visual: { symbol: "deadline", accentColor: "#FF563F", pattern: "radial", intensity: "high", layout: "axis" },
  },
  {
    id: "designer-04",
    arcana: "designer",
    sourceName: "Original",
    displayName: "用戶幽靈",
    designContext: "忘記使用者、自嗨設計、會議室視角",
    currentState: "會議室裡每個人都很有意見，唯獨真正使用的人不在場。",
    designReminder: "使用者不一定會出聲，但他會用行為投票。",
    nextAction: "寫下這個畫面中使用者最想完成的一件事，刪掉干擾它的元素。",
    oracleLine: "那個點按鈕的人不在場，但他一直都在。",
    moodTags: ["ux", "user", "empathy"],
    visual: { symbol: "ux-ghost", accentColor: "#8BAA91", pattern: "quiet", intensity: "medium", layout: "shrine" },
  },
  {
    id: "designer-05",
    arcana: "designer",
    sourceName: "Original",
    displayName: "提案場",
    designContext: "簡報、說服、客戶發表",
    currentState: "你要把設計從畫面變成一個別人願意相信的方向。",
    designReminder: "提案不是把畫面念完，而是帶大家走過你的判斷。",
    nextAction: "用「問題、選擇、理由、影響」重排簡報，而不是照頁面順序講。",
    oracleLine: "你賣的不是畫面，是通往畫面的信念。",
    moodTags: ["pitch", "presentation", "narrative"],
    visual: { symbol: "pitch-stage", accentColor: "#E7FF4F", pattern: "grid", intensity: "medium", layout: "stage" },
  },
  {
    id: "designer-06",
    arcana: "designer",
    sourceName: "Original",
    displayName: "空白畫布",
    designContext: "開不了稿、第一步困難、創意焦慮",
    currentState: "空白正在看著你，你也正在看著空白。",
    designReminder: "第一版不需要好看，它只需要存在。",
    nextAction: "先做一個故意很醜的版本，讓腦袋有東西可以反駁。",
    oracleLine: "空白不是敵人，是還沒被醜草稿開光。",
    moodTags: ["blank", "start", "anxiety"],
    visual: { symbol: "blank-canvas", accentColor: "#F4F0E8", pattern: "quiet", intensity: "low", layout: "portal" },
  },
  {
    id: "designer-07",
    arcana: "designer",
    sourceName: "Original",
    displayName: "標註紅線",
    designContext: "Handoff、設計規格、工程溝通",
    currentState: "你開始進入細節交接，任何含糊都可能變成未來的誤會。",
    designReminder: "好的標註不是控制工程，而是減少彼此猜測。",
    nextAction: "補上狀態、間距、錯誤情境與響應規則，不只標漂亮畫面。",
    oracleLine: "魔法要落地，就要寫清楚咒語。",
    moodTags: ["handoff", "spec", "engineering"],
    visual: { symbol: "redline", accentColor: "#FF5A5F", pattern: "notes", intensity: "high", layout: "stage" },
  },
  {
    id: "designer-08",
    arcana: "designer",
    sourceName: "Original",
    displayName: "多頭需求",
    designContext: "多方意見、方向分裂、需求膨脹",
    currentState: "每個人都說得有道理，於是畫面開始長出太多頭。",
    designReminder: "合理的需求不等於都該被滿足，優先順序才是設計的刀。",
    nextAction: "把所有需求映射到同一個目標，沒有服務目標的先暫停。",
    oracleLine: "每個聲音都聽見，不代表每個都上版。",
    moodTags: ["stakeholder", "scope", "priority"],
    visual: { symbol: "many-heads", accentColor: "#4067FF", pattern: "broken", intensity: "high", layout: "rupture" },
  },
];
