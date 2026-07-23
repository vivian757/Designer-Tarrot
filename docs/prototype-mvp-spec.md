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
   - 今日一抽
   - 我卡住了
   - 客戶提出奇妙需求
   - 提案前求生
   - Feedback 打來了
   - 我想重做
   - 我快沒力了

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
2. 預設選中 `今日一抽`。
3. 使用者點擊中央牌卡或 `抽一張牌`。
4. 牌卡洗動、翻轉、定格。
5. 顯示牌卡結果。
6. 使用者可以 `再抽一次` 或 `切換情境`。

### Flow B: Context Pull

1. 使用者進入首頁。
2. 選擇一個情境，例如 `Feedback 打來了`。
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
| major-00 | major | The Fool | 開稿者 | 新案開始、方向未定、亂提案 | 你站在一個還沒有形狀的案子前，手上只有一份不完整的 brief 和一點衝動。 | 不要等完美 brief 才開始，第一個不成熟的想法會幫你打開方向。 | 開一個空白 frame，先做 3 個很粗的方向，不准修細節。 | 先亂畫，宇宙才知道要給你什麼。 | start, brief, ideation |
| major-01 | major | The Magician | 工具魔術師 | 工具掌握、風格轉換、解法生成 | 你其實已經有足夠資源，只是還沒把它們排成一個解法。 | 工具不是重點，轉化能力才是。 | 列出手上已有的素材、限制與可用元件，組成第一個可展示版本。 | 你不是缺工具，你是還沒施法。 | craft, resources, execution |
| major-02 | major | The High Priestess | 直覺女祭司 | 審美判斷、潛意識靈感 | 你說不出原因，但知道有一個地方不太對。 | 有些設計判斷無法立刻被數據證明，但你的眼睛已經先看見了。 | 把「怪怪的」具體標出來：是節奏、比例、層級、語氣，還是資訊順序。 | 你的直覺不是任性，是尚未命名的判斷。 | intuition, taste, critique |
| major-03 | major | The Empress | 美感豐饒者 | 視覺創造、風格養成、靈感充沛 | 你的想像力開始滿出來，很多畫面都在同時冒出來。 | 先讓東西長出來，再決定要修剪什麼。 | 做一張情緒板，允許它過度豐富，暫時不要急著收斂。 | 美感需要出口，不需要先被批准。 | visual, moodboard, abundance |
| major-04 | major | The Emperor | 系統制定者 | Design system、規範、資訊架構 | 你開始意識到，這個設計不能只靠感覺撐下去。 | 好看的畫面需要秩序，秩序會讓它能被延展。 | 定義 3 條最重要的版面規則，例如間距、層級、狀態與元件用法。 | 沒有規則的美，很快就會變成災難。 | system, structure, rules |
| major-05 | major | The Hierophant | 規範守門人 | 設計原則、品牌規範、既有模式 | 你正在傳統做法與創新衝動之間拉扯。 | 不一定要反叛，經典模式能留下來通常有它的理由。 | 先找出既有規範真正想保護的是什麼，再決定要不要打破。 | 有些框架不是限制，是前人留下的捷徑。 | convention, brand, pattern |
| major-06 | major | The Lovers | 選擇與搭配 | 色彩選擇、合作、方向取捨 | 你面前有兩個都不錯的方向，但它們不能同時成為主角。 | 設計是一場選擇，留下什麼也代表你願意放棄什麼。 | 為每個方向寫一句核心主張，選那個最能服務目標的。 | 不是每個好東西都適合在一起。 | choice, pairing, collaboration |
| major-07 | major | The Chariot | 衝刺戰車 | 趕稿、提案、專案推進 | 你已經進入推進期，時間不適合再無限發散。 | 速度需要方向，不然只是在高速迷路。 | 鎖定今天必須完成的一個可展示切片，其他先放進停車場。 | 拉緊韁繩，別讓靈感把你載去別的案子。 | sprint, focus, deadline |
| major-08 | major | Strength | 柔性堅持 | 捍衛設計、跨職能溝通、說服 | 你知道這個設計有價值，但需要讓別人也看見。 | 真正的力量不是硬推，而是讓對方願意跟你一起往前。 | 把主張改成對方聽得懂的語言：風險、效率、轉換、維護或使用者價值。 | 溫柔不是退讓，是高階說服。 | persuasion, stakeholder, courage |
| major-09 | major | The Hermit | 深度模式 | 設計倦怠、靈感低潮、自我重整 | 你吸收太多參考、意見與雜訊，開始聽不到自己的判斷。 | 你需要的不是更多輸入，而是一段可以沉澱的空白。 | 關掉參考 30 分鐘，只看自己的畫面並寫下 5 個問題。 | 靈感有時不是找來的，是安靜後浮上來的。 | burnout, solitude, focus |
| major-10 | major | Wheel of Fortune | 流量之輪 | 爆紅、滑鐵盧、演算法波動 | 你正在被外部反應影響，開始懷疑作品的價值。 | 起落是系統的一部分，不是你整個人的評分。 | 分開看「作品品質」與「外部反應」，各寫一個可調整項目。 | 今日轉爆，明日沒人看；設計師仍要開稿。 | visibility, algorithm, uncertainty |
| major-11 | major | Justice | 設計審判 | 設計倫理、使用者價值、決策檢查 | 你正在面對一個看似合理、但內心不太踏實的決策。 | 問題不是畫面能不能成立，而是它是否誠實地服務使用者。 | 用一張表檢查：誰受益、誰受損、誰被忽略、資訊是否透明。 | 好看的設計，也要經得起良心放大。 | ethics, user, decision |
| major-12 | major | The Hanged Man | 反向觀看者 | 換位思考、暫停決策、重新理解問題 | 你卡在同一個解法裡太久，越改越像原地旋轉。 | 卡住不是壞事，可能只是視角需要翻面。 | 從使用者、PM、客服或工程角度各寫一句「他們真正怕的是什麼」。 | 倒過來看，問題可能就正了。 | perspective, stuck, reframing |
| major-13 | major | Death | 殺掉爛點子 | 捨棄過時風格、砍掉不必要功能 | 你知道有些東西不該留下，只是捨不得前面花過的力氣。 | 停止不是失敗，停止是替新的方向騰出空間。 | 刪掉一個最拖累畫面的元素，觀察整體是否更清楚。 | 有些 idea 的使命，就是被你親手埋葬。 | cut, reset, clarity |
| major-14 | major | Temperance | 視覺調和者 | 品牌一致、節制、平衡 | 你正在尋找剛剛好的比例，不需要再把聲量拉高。 | 這次不需要驚世駭俗，協調本身就是解法。 | 檢查色彩、字級、留白與元件狀態，讓其中一項安靜下來。 | 剛剛好，是一種很難的魔法。 | balance, visual, restraint |
| major-15 | major | The Devil | 像素執念 | 過度打磨、完美主義、自我綁架 | 你被細節綁住了，正在用 1px 的問題拖延真正的決策。 | 完美主義有時只是焦慮穿上了專業外套。 | 設一個 20 分鐘 timer，時間到就輸出，不准再調。 | 離開那個 1px，祂不值得你的靈魂。 | perfectionism, anxiety, polish |
| major-16 | major | The Tower | 重構之塔 | 客戶打槍、方向崩塌、全案重來 | 你原本相信的架構被推翻，現在看起來像一場災難。 | 舊架構撐不住不是壞事，它只是提早暴露了問題。 | 列出哪些要保留、哪些必須重來，先救核心，不救裝飾。 | 崩塌不是結束，是系統更新前的提示音。 | rebuild, feedback, crisis |
| major-17 | major | The Star | 初衷之星 | 願景、信念、設計熱情 | 你有點累，但還記得自己在意這件事的原因。 | 回到最初想服務的人，噪音會開始變小。 | 寫下這個設計最想改善的一個瞬間，讓它重新成為北極星。 | 你不是迷路，只是太久沒抬頭。 | hope, vision, purpose |
| major-18 | major | The Moon | 模糊需求 | 不確定、誤解、資訊不透明 | 你在霧裡前進，很多需求聽起來像真相，其實只是猜測。 | 不是你想太多，是資訊還沒清楚。 | 把所有不確定寫成問題，標出誰能回答、何時回答。 | 霧沒有要害你，它只是要你開燈。 | ambiguity, research, brief |
| major-19 | major | The Sun | 過稿之日 | 成果展現、理解被看見、正向回饋 | 你的設計終於被理解，能量也開始回來。 | 被看見的時候，記得保留這次成功的脈絡。 | 截圖並記錄這版為什麼成立，未來會用得上。 | 今天大家都看懂了，連投影機都站在你這邊。 | success, clarity, validation |
| major-20 | major | Judgement | 設計回顧 | Review、復盤、版本選擇 | 你站在一個階段的尾聲，需要判斷哪些經驗該留下。 | 復盤不是處罰自己，而是把混亂變成下次的判斷力。 | 寫下 3 件下次會保留的做法，以及 1 件不再重複的事。 | 每一次 review，都是下一個版本的召喚。 | review, learning, iteration |
| major-21 | major | The World | 交付完成 | 上線、結案、作品集、完整閉環 | 一個階段完成了，你終於可以把它整理成完整故事。 | 結案不是把檔案丟出去，而是替作品建立可被理解的脈絡。 | 整理 before / after、關鍵決策與影響，放進作品集或 handoff。 | 完成不是終點，是可被展示的入口。 | delivery, launch, portfolio |

### 8 Designer Original Cards

| ID | 牌組 | 原型 | 設計師牌名 | 設計語境 | 你現在的狀態 | 設計提醒 | 下一步行動 | 一句牌語 | Tags |
|---|---|---|---|---|---|---|---|---|---|
| designer-01 | designer | Original | 回饋迴圈 | 不斷被改、卡審核、意見來回 | 你不是沒做事，你只是被困在「再調一下」的結界裡。 | 這不一定是做不好，可能是對方還沒放心。 | 問出這次 feedback 真正想降低的風險，而不是只照字面改。 | 改稿不是輪迴，除非你沒有問清楚。 | feedback, revision, stakeholder |
| designer-02 | designer | Original | 靈感牆 | 收集參考、風格未定、方向發散 | 你開了很多視窗，每個都很美，但沒有一個真的成為方向。 | 參考不是用來複製，是用來辨認你想靠近什麼。 | 把 moodboard 分成「想要的感覺」與「不適合的誘惑」。 | 多看不是迷路，是在召喚下一個判斷。 | moodboard, inspiration, style |
| designer-03 | designer | Original | 死線 | 時間壓力、趕稿、設計過勞 | 時間開始收縮，你的腦袋也跟著變得很吵。 | 死線會壓縮選擇，也會逼出真正重要的東西。 | 切出 must-have、should-have、nice-to-have，先保住 must-have。 | 死線不是神，但它很常裝成神。 | deadline, pressure, prioritization |
| designer-04 | designer | Original | 用戶幽靈 | 忘記使用者、自嗨設計、會議室視角 | 會議室裡每個人都很有意見，唯獨真正使用的人不在場。 | 使用者不一定會出聲，但他會用行為投票。 | 寫下這個畫面中使用者最想完成的一件事，刪掉干擾它的元素。 | 那個點按鈕的人不在場，但他一直都在。 | ux, user, empathy |
| designer-05 | designer | Original | 提案場 | 簡報、說服、客戶發表 | 你要把設計從畫面變成一個別人願意相信的方向。 | 提案不是把畫面念完，而是帶大家走過你的判斷。 | 用「問題、選擇、理由、影響」重排簡報，而不是照頁面順序講。 | 你賣的不是畫面，是通往畫面的信念。 | pitch, presentation, narrative |
| designer-06 | designer | Original | 空白畫布 | 開不了稿、第一步困難、創意焦慮 | 空白正在看著你，你也正在看著空白。 | 第一版不需要好看，它只需要存在。 | 先做一個故意很醜的版本，讓腦袋有東西可以反駁。 | 空白不是敵人，是還沒被醜草稿開光。 | blank, start, anxiety |
| designer-07 | designer | Original | 標註紅線 | Handoff、設計規格、工程溝通 | 你開始進入細節交接，任何含糊都可能變成未來的誤會。 | 好的標註不是控制工程，而是減少彼此猜測。 | 補上狀態、間距、錯誤情境與響應規則，不只標漂亮畫面。 | 魔法要落地，就要寫清楚咒語。 | handoff, spec, engineering |
| designer-08 | designer | Original | 多頭需求 | 多方意見、方向分裂、需求膨脹 | 每個人都說得有道理，於是畫面開始長出太多頭。 | 合理的需求不等於都該被滿足，優先順序才是設計的刀。 | 把所有需求映射到同一個目標，沒有服務目標的先暫停。 | 每個聲音都聽見，不代表每個都上版。 | stakeholder, scope, priority |

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
Feedback 打來了

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
