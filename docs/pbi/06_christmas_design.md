# PBI-06: クリスマスデザインの強化

## User Story

ケンタくんとして、アプリを開いた瞬間に「わあ、クリスマスだ！」と感じるような、魅力的でワクワクする画面を見たい。サンタやクリスマスの雰囲気がもっと伝わってくるデザインにしてほしい。

## Gherkin Scenarios (Acceptance Criteria)

```gherkin
Feature: Enhanced Christmas Design
  As a Child (Kenta)
  I want to see a magical Christmas-themed interface
  So that I feel excited and engaged with the application

  Scenario: Magical Night Sky with Stars and Snow
    Given I open the Kube Santa application
    Then I should see twinkling stars in the Night Sky
    And I should see falling snowflakes animation
    And the Night Sky should have a gradient from dark blue to purple

  Scenario: Santa on Sleigh
    Given I have at least 1 sleigh active
    Then I should see a sleigh with Santa on it (not just a sleigh emoji)
    And the sleigh should have a glowing effect
    And the sleigh should move smoothly across the sky

  Scenario: Festive Header
    Given I open the Kube Santa application
    Then I should see a festive header with Christmas decorations
    And the header should have a warm color scheme (red, green, gold)
    And I should see Christmas icons or patterns in the header

  Scenario: Christmas-themed Control Panel
    Given I am at the Operation Center
    Then I should see the Control Panel with Christmas-themed styling
    And the Control Panel should have warm colors (red, green, gold accents)
    And I should see Christmas decorations around the controls

  Scenario: Enhanced Visual Feedback
    Given I interact with the application
    When I move the slider or click buttons
    Then I should see sparkle or magic effects
    And the animations should feel joyful and Christmas-like
```

## Technical Notes

* **Night Sky Enhancements:**
  * 星のアニメーション: CSS アニメーションまたは Framer Motion でキラキラ効果
  * 雪のアニメーション: 降る雪のパーティクル効果（CSS アニメーションまたはライブラリ）
  * グラデーション背景: `bg-gradient-to-b from-blue-900 via-purple-900 to-blue-800` など

* **Sleigh Design:**
  * ソリにサンタを追加: 🎅🛷 の組み合わせ、または SVG/画像
  * 光る効果: `drop-shadow` や `glow` 効果を追加
  * 動きの改善: `animate-bounce` に加えて、横移動や回転アニメーション

* **Header Design:**
  * クリスマスカラー: 赤（`bg-red-600`）、緑（`bg-green-600`）、金（`bg-yellow-400`）の組み合わせ
  * 装飾: リボン、ベル、星などのアイコンを追加
  * グラデーション: クリスマスカラーのグラデーション

* **Control Panel Design:**
  * 温かみのある色: ダークグレーではなく、赤や緑を基調に
  * 装飾: クリスマスツリー、星、ベルなどのアイコンを配置
  * ボタンのデザイン: よりポップでクリスマスらしいスタイル

* **Animation & Effects:**
  * インタラクション時のエフェクト: スパークル、キラキラ、マジックエフェクト
  * Framer Motion を使用してリッチなアニメーションを実装
  * パフォーマンスを考慮し、過度なアニメーションは避ける

* **Color Palette:**
  * メインカラー: 赤（`#DC2626`）、緑（`#16A34A`）、金（`#FACC15`）
  * アクセントカラー: 白、銀、濃い青
  * 背景: 温かみのあるダークトーン（濃い赤、濃い緑のグラデーション）

* **Assets:**
  * 絵文字を活用: 🎅🛷❄️⭐🎄🔔🎁
  * 必要に応じて SVG アイコンを使用
  * 画像は使用せず、CSS と絵文字で実現

