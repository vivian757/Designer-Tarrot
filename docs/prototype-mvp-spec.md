# Designer Tarot Prototype Spec

## 1. Project Positioning

**Designer Tarot** 是一個給設計師在卡住、疲乏、提案前後使用的創意對焦工具。

它不是算命，也不是 AI 幫你做設計，而是把設計工作中的混亂狀態，轉譯成一張牌、一段提醒，以及一個可以立刻執行的小行動。

### Product Promise

抽一張牌，讓設計腦重新對焦。

### First Impression Copy Candidates

首頁開場先保留短句候選，等 prototype 畫面與互動感出來後再選定。

- Brief 不說人話，牌會。
- 今日設計運勢：可能過稿，可能重構。
- 問牌之前，先問問 Figma。
- 讓宇宙幫你讀懂那份 brief。
- 抽一張，看看這版該救還是該放生。
- 給正在和 feedback 對抗的設計靈魂。

### Product Tone

- 玄，但不要過度神棍。
- 有梗，但不要變成純迷因。
- 懂設計師的痛，但不要只停在抱怨。
- 每次抽牌都要有情緒價值，也要有一個可執行的下一步。

---

## 2. MVP Goal

### Primary Goal

做出一個可以被設計師快速理解、願意互動、願意分享的抽牌 prototype。

### Validation Questions

- 使用者是否一進首頁就懂這是「給設計師的塔羅」？
- 抽牌流程是否有儀式感，但不拖慢使用？
- 牌義是否讓設計師覺得「有被講中」？
- 結果是否值得截圖或分享？
- 這個概念是否有延伸成完整牌組或日常工具的潛力？

### Success Signals

- 使用者願意連抽多次。
- 使用者會把抽到的結果傳給朋友或同事。
- 使用者能說出某張牌很像自己的工作狀態。
- 使用者會期待更多情境或更多牌。

---

## 3. MVP Scope

### In Scope

1. **首頁抽牌介面**
   - 第一屏直接進入抽牌，不做傳統 landing page。
   - 使用者可以選擇情境，也可以直接每日一抽。

2. **情境選擇**
   - 每日一抽
   - 我卡住了
   - 客戶提出奇妙需求
   - 提案前求生
   - Feedback 又來了
   - 這版還有救嗎？
   - 我沒電了

3. **抽牌互動**
   - 點擊或拖曳牌卡。
   - 牌卡翻轉後顯示結果。
   - 抽牌前後有短暫微動畫，營造儀式感。

4. **牌卡結果**
   - 牌名
   - 設計語境
   - 你現在的狀態
   - 設計提醒
   - 下一步行動
   - 一句牌語

5. **重新抽牌**
   - 使用者可以回到情境選擇，或直接再抽一次。

6. **分享卡初版**
   - MVP 可先用畫面截圖感設計。
   - 正式功能可以先不產圖，但畫面需具備分享卡視覺。

### Out of Scope

- 登入與帳號系統
- 歷史紀錄
- 收藏牌卡
- AI 即時生成解讀
- Behance / Dribbble / 色票靈感配對
- 完整小阿爾克那系統
- 付費功能

---

## 4. Prototype User Flow

### Flow A: Daily Pull

1. 使用者進入首頁。
2. 預設選中 `每日一抽`。
3. 使用者點擊中央牌卡或 `抽一張牌`。
4. 牌卡洗動、翻轉、定格。
5. 顯示牌卡結果。
6. 使用者可以 `再抽一次` 或 `切換情境`。

### Flow B: Context Pull

1. 使用者進入首頁。
2. 選擇一個情境，例如 `Feedback 又來了`。
3. 牌卡文案或背景氛圍輕微變化。
4. 使用者抽牌。
5. 結果以該情境語氣解讀。

### Flow C: Share Intent

1. 使用者抽到結果。
2. 畫面呈現可截圖的結果卡。
3. 使用者看到短牌語、牌名、情境標籤。
4. MVP 先以視覺可分享為主，之後再做下載圖片。

---

## 5. Information Architecture

### Home State

- Logo / product name: Designer Tarot
- 短句開場
- 情境 chips
- 中央牌卡
- Primary action: 抽一張牌

### Drawing State

- 牌卡洗動或偏移
- 背景符號輕微浮動
- Button 進入 loading / disabled

### Result State

- 牌名
- 英文原型或原創牌名
- 情境標籤
- 牌卡主視覺
- 四段解讀
- Actions:
  - 再抽一次
  - 換個情境
  - 分享結果

---

## 6. Card Data Model

Prototype 可先用前端靜態資料。建議欄位如下：

```ts
type DesignerTarotCard = {
  id: string;
  arcana: "major" | "designer";
  sourceName: string;
  displayName: string;
  designContext: string;
  currentState: string;
  designReminder: string;
  nextAction: string;
  oracleLine: string;
  moodTags: string[];
};
```

---

## 7. 30-Card Data Table

### 22 Major Cards

| ID | 牌組 | 原型 | 設計師牌名 | 設計語境 | 你現在的狀態 | 設計提醒 | 下一步行動 | 一句牌語 | Tags |
|---|---|---|---|---|---|---|---|---|---|
| major-00 | major | The Fool | 打開檔案 | 新案開始、方向未定、亂提案 | 案子剛開始，brief 還有點霧，你手上只有幾個零碎想法。 | 第一版不用像答案，先讓它有機會被討論。 | 開一個 frame，隨便排三個方向，各給它 10 分鐘。 | 今天先不要等靈感上班。 | start, brief, ideation |
| major-01 | major | The Magician | 工具魔術師 | 工具掌握、風格轉換、解法生成 | 你其實已經有足夠資源，只是還沒把它們排成一個解法。 | 工具不是重點，轉化能力才是。 | 列出手上已有的素材、限制與可用元件，組成第一個可展示版本。 | 你不是缺工具，你是還沒施法。 | craft, resources, execution |
| major-02 | major | The High Priestess | 相信直覺 | 審美判斷、潛意識靈感 | 畫面看起來都對，但你就是覺得哪裡卡卡的。 | 直覺不一定能立刻拿出證據，但它常常比你早一步發現問題。 | 把「怪怪的」圈出來，看看是比例、節奏、層級還是語氣。 | 先相信眼睛，理由晚點補。 | intuition, taste, critique |
| major-03 | major | The Empress | 美感豐饒者 | 視覺創造、風格養成、靈感充沛 | 腦袋裡同時住了好幾個方向，每個都想搶著出場。 | 現在不用急著收斂，先給想法一點長大的空間。 | 做一張可以很亂的 moodboard，先不急著選風格。 | 今天先讓靈感多佔一點桌面。 | visual, moodboard, abundance |
| major-04 | major | The Emperor | 系統制定者 | Design system、規範、資訊架構 | 你開始發現，光靠感覺撐不住這個設計了。 | 規則不是要綁住你，是讓下一個畫面不用重新猜一次。 | 先定三條規則：間距、層級和元件怎麼用。 | 沒有規則的美，最後都會開自己的會。 | system, structure, rules |
| major-05 | major | The Hierophant | 規範守門人 | 設計原則、品牌規範、既有模式 | 你在熟悉的做法和想試的新東西之間拉扯。 | 不是每個規則都要反對，能少踩一個坑也算創新。 | 找出這套規範最在意的事，再決定哪裡可以變。 | 老方法不一定老派，有時只是活得比較久。 | convention, brand, pattern |
| major-06 | major | The Lovers | 選擇與搭配 | 色彩選擇、合作、方向取捨 | 你面前有兩個都不錯的方向，它們正在搶同一個主角位置。 | 選擇不是放棄一切，是決定這次誰先說話。 | 各用一句話說明兩個方向，選最能服務目標的那個。 | 不是每個好東西都適合一起上台。 | choice, pairing, collaboration |
| major-07 | major | The Chariot | 進度衝刺 | 趕稿、提案、專案推進 | 時間開始趕了，新的支線還在冒出來，但你知道不能再無限發散。 | 速度需要方向，不然只是在高速迷路。 | 先決定今天一定要完成的部分，其他想法先放著。 | 先把方向顧好，別做到一半又被新靈感拐走。 | sprint, focus, deadline |
| major-08 | major | Strength | 柔性堅持 | 捍衛設計、跨職能溝通、說服 | 你知道這個設計有價值，只是還沒找到讓別人聽懂的說法。 | 堅持不是把聲音開最大，是把理由講到對方能接住。 | 用一句話說明這個選擇替誰省了什麼麻煩。 | 不用吼，讓理由自己站穩。 | persuasion, stakeholder, courage |
| major-09 | major | The Hermit | 深度模式 | 設計倦怠、靈感低潮、自我重整 | 你吸收太多參考、意見與雜訊，開始聽不到自己的判斷。 | 你需要的不是更多輸入，而是一段可以沉澱的空白。 | 關掉參考 30 分鐘，只看自己的畫面並寫下 5 個問題。 | 靈感有時不是找來的，是安靜後浮上來的。 | burnout, solitude, focus |
| major-10 | major | Wheel of Fortune | 變動之輪 | 優先順序變動、方向轉彎、時程與資源波動 | 昨天還被說最重要的事，今天又被新需求插隊，你開始懷疑原本做的到底算不算數。 | 變動是訊號，不是每次都需要你把整版推倒重來。 | 寫下今天變了什麼、沒變什麼，先守住仍然成立的目標。 | 風會換方向，先確認你還站在哪條路上。 | priority, change, uncertainty |
| major-11 | major | Justice | 設計審判 | 設計倫理、使用者價值、決策檢查 | 你正在面對一個看似合理、但內心不太踏實的決策。 | 問題不是畫面能不能成立，而是它是否誠實地服務使用者。 | 用一張表檢查：誰受益、誰受損、誰被忽略、資訊是否透明。 | 好看的設計，也要經得起良心放大。 | ethics, user, decision |
| major-12 | major | The Hanged Man | 反向觀看者 | 換位思考、暫停決策、重新理解問題 | 你在同一個解法裡繞太久了，越改越像原地打轉。 | 暫停一下不是偷懶，是讓腦袋換個位置。 | 從使用者、PM、客服或工程角度，各說一句他們可能在擔心什麼。 | 倒過來看，問題可能就正了。 | perspective, stuck, reframing |
| major-13 | major | Death | 殺掉爛點子 | 捨棄過時風格、砍掉不必要功能 | 你知道有些東西真的該放下，只是還捨不得前面花過的力氣。 | 做過不代表要一直留著，刪掉也算完成工作。 | 刪掉一個最拖累畫面的東西，再看看整體有沒有變清楚。 | 不是每個 idea 都要活到最後。 | cut, reset, clarity |
| major-14 | major | Temperance | 視覺調和者 | 品牌一致、節制、平衡 | 你正在調整畫面裡的比例，希望它不要太滿，也不要太安靜。 | 平衡不是把所有東西平均分配，是知道什麼時候該退一步。 | 挑一個太吵的元素，把它調低一點，再看整體。 | 今天的魔法叫做：少一點，剛剛好。 | balance, visual, restraint |
| major-15 | major | The Devil | 像素執念 | 過度打磨、完美主義、自我綁架 | 你可能不是在追求完美，只是在用細節拖延一個不想面對的決定。 | 完美主義有時只是焦慮穿上了專業外套。 | 設一個 20 分鐘 timer，時間到就輸出，不准再調。 | 離開那個 1px，先去做真正重要的事。 | perfectionism, anxiety, polish |
| major-16 | major | The Tower | 重構之塔 | 客戶打槍、方向崩塌、全案重來 | 你原本相信的架構被推翻，現在看起來像一場災難。 | 舊架構撐不住不是壞事，它只是提早暴露了問題。 | 列出哪些要保留、哪些必須重來，先救核心，不救裝飾。 | 崩塌不是結束，是系統更新前的提示音。 | rebuild, feedback, crisis |
| major-17 | major | The Star | 初衷之星 | 願景、信念、設計熱情 | 你有點累，但還記得自己在意這件事的原因。 | 回到最初想服務的人，噪音會開始變小。 | 寫下這個設計最想改善的一個瞬間，讓它重新成為北極星。 | 你不是迷路，只是太久沒抬頭。 | hope, vision, purpose |
| major-18 | major | The Moon | 模糊需求 | 不確定、誤解、資訊不透明 | 需求說得像真相，但裡面有不少還沒確認的猜測。 | 資訊不清楚，不代表你想太多。 | 把不確定的地方列成問題，寫下誰能回答。 | 霧不會自己散，先開一盞燈。 | ambiguity, research, brief |
| major-19 | major | The Sun | 過稿之日 | 成果展現、理解被看見、正向回饋 | 這次終於沒有人問「這是要幹嘛」，你也終於可以鬆一口氣。 | 順利不是運氣而已，把做對的地方記下來。 | 截圖，記下三個讓這版成立的決定。 | 今天連投影機都站在你這邊。 | success, clarity, validation |
| major-20 | major | Judgement | 設計回顧 | Review、復盤、版本選擇 | 案子告一段落，你開始回想哪些地方差點重來、哪些做法值得留下。 | 復盤不是找人算帳，包含算自己的帳。 | 寫下三件下次要保留的事，和一件不想再重複的事。 | 把混亂整理好，下次就少繞一圈。 | review, learning, iteration |
| major-21 | major | The World | 交付完成 | 上線、結案、作品集、完整閉環 | 檔案交出去的那一刻，你才發現有些重要決定還留在自己的腦袋裡。 | 交付不是把檔案丟出去，是讓下一個接手的人少猜一點。 | 整理前後差異、關鍵決定和最後結果。 | 完成了，現在可以把檔案關掉了。 | delivery, launch, portfolio |

### 8 Designer Original Cards

| ID | 牌組 | 原型 | 設計師牌名 | 設計語境 | 你現在的狀態 | 設計提醒 | 下一步行動 | 一句牌語 | Tags |
|---|---|---|---|---|---|---|---|---|---|
| designer-01 | designer | Original | 回饋迴圈 | 不斷被改、卡審核、意見來回 | 這一輪可能不是最後一輪，熟悉的那句「字放大一點」又回來了。 | 這不一定是做不好，可能只是對方還沒找到一句讓自己放心的話。 | 把 feedback 改寫成：對方到底怕什麼沒有被解決？ | 字放大一點，通常不是最後一次。 | feedback, revision, stakeholder |
| designer-02 | designer | Original | 靈感牆 | 收集參考、風格未定、方向發散 | 你開了很多視窗，每個都很美，但沒有一個真的成為方向。 | 參考很多不等於方向很多，先找出你真正想靠近的感覺。 | 從參考中挑三個共同特徵，寫成三個形容詞。 | 靈感很多沒關係，先不要讓它們一起主持會議。 | moodboard, inspiration, style |
| designer-03 | designer | Original | 死線 | 時間壓力、趕稿、設計過勞 | 時間開始收縮，你的腦袋也跟著變得很吵。 | 死線會壓縮選擇，也會逼出真正重要的東西。 | 切出 must-have、should-have、nice-to-have，先保住 must-have。 | 時間不會自己變多，先救最重要的那一塊。 | deadline, pressure, prioritization |
| designer-04 | designer | Original | 用戶幽靈 | 忘記使用者、自嗨設計、會議室視角 | 大家都在替使用者說話，但真正會按那顆按鈕的人不在這裡。 | 你設計的是給人用的，不是給會議室裡的人互相欣賞的。 | 寫下使用者最想完成的一件事，刪掉擋在前面的東西。 | 那個點按鈕的人不在現場，但他一直都在。 | ux, user, empathy |
| designer-05 | designer | Original | 提案場 | 簡報、說服、客戶發表 | 投影畫面都排好了，你卻還在想該從哪裡開始講，怕大家只看見畫面、沒聽懂理由。 | 提案不是把畫面念完，是讓大家願意相信這個方向。 | 用「問題、選擇、理由、影響」重排簡報。 | 你賣的不是畫面，是一條大家走得懂的路。 | pitch, presentation, narrative |
| designer-06 | designer | Original | 空白畫布 | 開不了稿、第一步困難、創意焦慮 | 空白正在看著你，你也正在看著空白。 | 空白不代表沒想法，只是第一個想法還沒被你放出來。 | 做一個故意很醜的版本，讓腦袋有東西可以反駁。 | 空白畫布不會自己上班，先替它開門。 | blank, start, anxiety |
| designer-07 | designer | Original | 標註紅線 | Handoff、設計規格、工程溝通 | 畫面看起來都完成了，但你突然想到：工程會怎麼知道這些狀態？ | 交接寫清楚一點，下一個人就不用靠猜。 | 補上狀態、間距、錯誤情境與響應規則。 | 魔法要落地，咒語得寫清楚。 | handoff, spec, engineering |
| designer-08 | designer | Original | 多頭需求 | 多方意見、方向分裂、需求膨脹 | 每個人都有理由，畫面開始長出太多頭。 | 每個理由都值得理解，不代表每個要求都要同時上場。 | 把需求對到同一個目標，沒有服務目標的先暫停。 | 先救船，不要替每個杯子安排座位。 | stakeholder, scope, priority |

---

## 8. Result Copy Template

每張牌的結果頁建議固定結構：

```txt
[情境標籤]

[牌名]
[英文原型 / Original]

你現在的狀態
[currentState]

設計提醒
[designReminder]

下一步行動
[nextAction]

牌語
[oracleLine]
```

### Example

```txt
Feedback 又來了

重構之塔
The Tower

你現在的狀態
你原本相信的架構被推翻，現在看起來像一場災難。

設計提醒
舊架構撐不住不是壞事，它只是提早暴露了問題。

下一步行動
列出哪些要保留、哪些必須重來，先救核心，不救裝飾。

牌語
崩塌不是結束，是系統更新前的提示音。
```

---

## 9. Initial Visual Direction

### Core Mood

**Mystic design desk**

像是深夜的設計工作台、Figma frame、印刷校樣、塔羅儀式與一點點宇宙訊號混在一起。

### Visual Keywords

- editorial poster
- design artifact
- mystic interface
- late-night workspace
- soft occult
- grid, cursor, annotation, crop mark
- not fantasy, not witchy, not generic astrology

### Color Direction

避免整體過度紫色或單一神秘漸層。建議用低彩度底色搭配少量高彩度訊號色。

#### Palette A: Dark Proof

- Ink: `#141414`
- Paper: `#F4F0E8`
- Grid: `#3A3A36`
- Signal Yellow: `#E7FF4F`
- Error Red: `#FF5A5F`
- Cyan Note: `#59D8FF`

#### Palette B: Soft Studio

- Warm Paper: `#F7F0E3`
- Charcoal: `#1D1D1B`
- Dust Green: `#8BAA91`
- Proof Blue: `#4067FF`
- Markup Pink: `#FF6FAE`
- Shadow Gray: `#C8C0B5`

#### Palette C: Neon Ritual

- Deep Black: `#0E0E10`
- Off White: `#EFECE2`
- Acid Green: `#C8FF3D`
- Electric Blue: `#4F7DFF`
- Warm Red: `#FF563F`
- Muted Purple: `#6D5D7A`

### Typography Direction

- 中文：思源黑體、Noto Sans TC、或系統黑體。
- 英文牌名：可使用高對比 serif 或 condensed sans，營造牌卡標題感。
- UI 操作文字：乾淨、短、像工具介面。
- 牌語：可以稍微 editorial，但不要太詩到看不懂。

### Layout Direction

- 第一屏以中央牌卡為主，不做大段介紹。
- 情境 chips 置於牌卡上方或側邊，像儀式前的問題選擇。
- 背景可以有淡淡 grid、crop marks、游標軌跡、annotation lines。
- 結果頁像一張可截圖的設計海報，不要像一般 app card 堆疊。
- 避免多層卡片包卡片。

---

## 10. Interaction Direction

### Home Card Idle

- 牌卡輕微浮動。
- 游標 hover 時卡面有 3D tilt。
- 背景 grid 或星點非常慢地位移。

### Scenario Selection

- 點選情境 chip 時，中央牌背符號或背景色有微幅變化。
- 避免過度花俏，讓使用者感覺是在「設定問題」。

### Draw Interaction

- 使用者點擊牌卡或按鈕。
- 牌卡短暫洗動，像多張 frame 疊在一起。
- 翻轉時可帶一點 overshoot，但不要像遊戲抽卡太浮誇。
- 動畫時間建議 900-1400ms。

### Result Reveal

- 先出現牌名。
- 再依序浮現四段解讀。
- 牌語最後出現，像結論。

### Microcopy

Button 與狀態文字可以更有角色感：

- 抽一張牌
- 重新洗牌
- 換個問題
- 讓宇宙讀取 brief
- 牌面正在對齊圖層
- 正在召喚 feedback 的本體

---

## 11. Prototype Build Recommendation

### Suggested Stack

- React
- Vite
- Framer Motion
- CSS variables or Tailwind
- 靜態 card data file

### Recommended First Build Order

1. 建立靜態首頁 layout。
2. 建立 card data。
3. 完成情境選擇狀態。
4. 完成抽牌隨機邏輯。
5. 加入翻牌動畫。
6. 完成結果頁與再抽一次。
7. 加入第一輪視覺質感。
8. 做桌機與手機版檢查。

### Prototype Acceptance Criteria

- 桌機與手機都可以完整抽牌。
- 使用者可以不閱讀說明就知道怎麼開始。
- 抽牌動畫有儀式感，但不超過使用者耐心。
- 結果文字不溢出，不遮擋主要操作。
- 至少 30 張牌都可被抽到。
- 色彩與畫面氣質不像一般星座占卜網站，也不像純 SaaS dashboard。

---

## 12. Next Iteration Ideas

- 分享卡下載成 PNG。
- 每日一抽固定當日結果。
- 問題輸入框：使用者輸入自己的問題後抽牌。
- 三張牌陣：現在狀態、盲點、下一步。
- AI 牌義延伸，但保持「輔助解讀」而非取代牌卡文案。
- 設計靈感配對：色票、排版參考、UX checklist、作品集提示。
