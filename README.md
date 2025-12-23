# Kube Santa 🎅

Kubernetes の概念をクリスマスの世界観で学ぶ教育用 Web アプリケーション。

## コンセプト

Kube Santa は、Kubernetes の核心概念である「あるべき状態 (Desired State)」を維持する仕組みを、クリスマスの世界観を通じて体験できる教育アプリです。子供たちが楽しみながら Kubernetes の動作原理を理解できるよう、専門用語をクリスマスのメタファーに置き換えています。

## 世界観・メタファー

| Kubernetes 用語 | Kube Santa の世界 | 説明 |
| :--- | :--- | :--- |
| **Cluster** | **夜空 (Night Sky)** | アプリケーションの背景エリア |
| **Pod** | **サンタのソリ (Sleigh) 🛷** | 生成・消滅する最小単位 |
| **ReplicaSet** | **魔法の契約書 (Magic Contract) 📜** | 「常にN台必要」と定義するルール |
| **Deployment** | **クリスマス作戦 (Operation)** | ソリの管理全体 |
| **Scaling** | **サンタの増員** | ソリを一瞬で増やすこと |
| **Self-healing** | **復活の魔法 (Revival Magic) ✨** | 壊されたソリが自動生成される挙動 |
| **Chaos Monkey** | **イタズラ猿 (Naughty Monkey) 🐒** | ソリを破壊するランダム要素 |

## 技術スタック

- **Framework:** React 19 (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion (予定)
- **Icons:** Lucide React or Emojis
- **State Management:** React Context or Zustand
- **Testing:** Playwright + playwright-bdd (ATDD)

## プロジェクト構造

```plaintext
kube-santa/
├── .cursor/
│   └── rules/              # プロジェクトルール
│       ├── 00-stack-and-persona.mdc
│       ├── 01-atdd-testing.mdc
│       └── 02-domain-metaphor.mdc
├── docs/                   # プロジェクトドキュメント
│   ├── project_context.md # 用語集・世界観定義
│   └── pbi/               # プロダクトバックログアイテム
│       ├── 01_foundation.md
│       ├── 02_replicaset_logic.md
│       ├── 03_chaos_monkey.md
│       └── 04_education_ui.md
├── features/               # Gherkin 仕様書 (.feature)
│   ├── foundation.feature
│   └── ...
├── tests/
│   └── steps/             # テストステップ定義 (.ts)
│       ├── foundation.steps.ts
│       └── ...
├── src/                    # ソースコード
│   ├── components/
│   ├── hooks/             # useKubeLogic (Reconciliation Loop)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── playwright.config.ts    # E2Eテスト設定 (BDD統合)
├── vite.config.ts
└── package.json
```

## セットアップ

### 必要な環境

- Node.js 22.x 以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# Playwright ブラウザのインストール
npx playwright install chromium
```

## 開発

### 開発サーバーの起動

```bash
npm run dev
```

開発サーバーは `http://localhost:5173` で起動します。

### ビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

## テスト

このプロジェクトは **ATDD (Acceptance Test-Driven Development)** 手法で開発されています。

### E2Eテストの実行

```bash
npm run test:e2e
```

このコマンドは以下を実行します：

1. `bddgen` - Gherkin ファイルからテストコードを生成
2. `playwright test` - E2Eテストを実行

### ATDD の開発フロー

1. **Spec First:** 実装コードを書く前に、Gherkin (`.feature`) ファイルを作成
2. **Red:** ステップ定義を書き、テストを実行して**失敗**することを確認
3. **Green:** テストを通過させるための最小限のコードを実装
4. **Refactor:** コードを整理

詳細は [.cursor/rules/01-atdd-testing.mdc](.cursor/rules/01-atdd-testing.mdc) を参照してください。

## コアロジック: Reconciliation Loop

Kubernetes の Reconciliation Loop をフロントエンドで擬似的に実装します。

Loop:

  1. Current State (現在のソリの数) を観測
  2. Desired State (設定値) と比較
  3. 差異があれば、Create または Delete アクションを実行

このループは `useEffect` や `setInterval` を使用して実装されます。

## 開発ガイドライン

### コーディング規約

- **Component Design:** 機能ごとに小さく分割し、再利用性を高める
- **Type Safety:** `any` 型は禁止。TypeScript の型定義を厳密に行う
- **Comments:** 日本語で簡潔に記述。特に複雑なロジック（Reconciliation Loopなど）には解説を入れる

### セレクター戦略

テストの堅牢性を保つため、重要な UI 要素には必ず `data-testid` 属性を付与すること。

- ❌ Bad: `button.className.includes('red')`
- ✅ Good: `data-testid="chaos-monkey-button"`

### UI/UX 設計原則

- **Kids First Design:** ボタンは大きく、フィードバック（クリック時の反応など）を大げさにする
- **メタファーの使用:** 難しい専門用語は UI にそのまま出さず、メタファーを使用する
- **視認性:** カラフルで視認性の高い配色を使用

## プロダクトバックログ

- [x] **PBI-01:** 基盤とレイアウト (Foundation)
- [x] **PBI-02:** ReplicaSet ロジック (魔法の契約書)
- [x] **PBI-03:** Chaos Monkey と Self-healing (イタズラ猿と復活の魔法)
- [x] **PBI-04:** 教育UI (説明・チュートリアル)
- [x] **PBI-05:** UI の日本語化
- [x] **PBI-06:** クリスマスデザインの強化
- [x] **PBI-07:** 子供向けUI表現の改善
- [x] **PBI-08:** Scaling (手紙の殺到)
- [x] **PBI-09:** 状態リセットボタン
- [x] **PBI-10:** 負荷分散（Load Balancing）の視覚化
- [x] **PBI-11:** 警告ロジックの改善（最大レプリカ数時の適切な警告）
- [x] **PBI-12:** Pod の最大処理数制限（最大5つ）
- [x] **PBI-13:** 処理待ち手紙の視覚化（キューに溜まる）

詳細は [docs/pbi/](docs/pbi/) を参照してください。

## ライセンス

ISC

## 貢献

このプロジェクトは教育目的で開発されています。バグ報告や機能提案は Issue でお願いします。

---

Happy Kubernetes Learning! 🎄✨
