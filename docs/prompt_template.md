# Prompt Templates

## 初期セットアップ用プロンプト

開発開始時、これを最初に Cursor に入力してください。

```plaintext
@.cursorrules を読み込んでください。
これから「Kube Santa」の開発を始めます。以下の手順で環境構築を行ってください。

1. **プロジェクト初期化:**
   Vite + React + TypeScript + Tailwind CSS で初期化。

2. **ATDD環境構築:**
   - `npm install -D @playwright/test playwright-bdd cucumber`
   - `playwright.config.ts` を作成し `playwright-bdd` (featuresDir: 'features', stepsDir: 'tests/steps') を設定。
   - `package.json` に `test:e2e`: `bddgen && playwright test` を追加。

3. **ディレクトリ作成:**
   - `features/`
   - `tests/steps/`
   - `docs/` (ここに私の提供する md ファイル群がある前提で構成を確認)

エラーが出ないよう、各設定ファイルの整合性を確認しながら実行してください。
```

## PBI 実装ループ用プロンプト

セットアップ完了後、PBI ごとに以下の指示を繰り返します。

```plaintext
@docs/project_context.md と @docs/pbi/01_foundation.md (または対象のPBIファイル) を読み込んでください。

ATDD 手順に従って実装を進めます。

Step 1: PBI の Gherkin シナリオを元に `.feature` ファイルを作成してください。
Step 2: `npx bddgen` を実行し、必要なステップ定義の雛形を生成・実装してください (`tests/steps/`).
Step 3: テストを実行し、**Fail (Red)** することを確認してください。
Step 4: テストを通すための最小限の React コンポーネント実装を行ってください。
Step 5: テストを再実行し、**Pass (Green)** することを確認してください。
Step 6: Done の定義を満たしていることを確認してください。

UI は子供向けに、Tailwind CSS でポップなデザインにしてください。
```
