# PBI-07: 子供向けUI表現の改善

## User Story

ケンタくんとして、画面に表示されている言葉がもっとわかりやすく、子供にも理解しやすい表現になってほしい。難しい言葉や専門用語ではなく、日常的に使う言葉で説明してほしい。

## Gherkin Scenarios (Acceptance Criteria)

```gherkin
Feature: Child-Friendly UI Text
  As a Child (Kenta)
  I want to see simple and understandable text in the UI
  So that I can understand what each element means without adult help

  Scenario: Header text is child-friendly
    Given I open the Kube Santa application
    Then I should see the header with title "🎅 Kube Santa - プレゼント戦略"

  Scenario: Slider label is child-friendly
    Given I am at the Operation Center
    Then I should see the slider label "サンタさん (Pod) の数"

  Scenario: Status text is child-friendly
    Given I am at the Operation Center
    Then the status text should show "いて欲しいサンタさん: {int} / 今いるサンタさん: {int}" format

  Scenario: All UI text is understandable for children
    Given I am at the Operation Center
    Then I should not see difficult technical terms in the main UI
    And all labels should use simple Japanese words that children can understand
```

## Technical Notes

* **Text Replacements:**
  * Header: "作戦本部" → "プレゼント戦略 (Deployment)"
  * Slider Label: "📜 魔法の契約書" → "サンタさん (Pod) の数 (ReplicaSet)"
  * Status Text: "現在: X / 目標: Y" → "いて欲しいサンタさん: X / 今いるサンタさん: Y"
    * 注意: 「いて欲しい」= Desired State（目標数）、「今いる」= Current State（現在の数）

* **Design Considerations:**
  * 子供が理解しやすい言葉を優先
  * 技術用語は括弧内に英語表記を残す（学習効果のため）
  * 絵文字やアイコンを活用して視覚的に理解しやすくする
  * 文字サイズは大きく、読みやすく保つ

* **Terminology Mapping:**
  * "作戦本部" (Operation Center) → "プレゼント戦略" (Deployment)
  * "魔法の契約書" (Magic Contract) → "サンタさん (Pod) の数" (ReplicaSet)
  * "現在" (Current) → "今いるサンタさん" (Current State)
  * "目標" (Desired) → "いて欲しいサンタさん" (Desired State)

* **User Experience:**
  * 子供が直感的に理解できる表現にする
  * 「いて欲しい」と「今いる」の違いが明確に伝わるようにする
  * メタファーを維持しながら、より親しみやすい表現にする

