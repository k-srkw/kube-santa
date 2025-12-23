# PBI-05: UI の日本語化

## User Story

ケンタくんとして、画面に表示されているすべてのテキストを日本語で読みたい。英語が分からなくても、アプリの機能を理解できるようにしたい。

## Gherkin Scenarios (Acceptance Criteria)

```gherkin
Feature: Japanese UI Localization
  As a Japanese Learner (Kenta)
  I want to see all UI text in Japanese
  So that I can understand the application without English knowledge

  Scenario: Header is in Japanese
    Given I open the Kube Santa application
    Then I should see the header with title "🎅 Kube Santa - 作戦本部"

  Scenario: Control Panel labels are in Japanese
    Given I am at the Operation Center
    Then I should see the slider label "📜 魔法の契約書"
    And the status text should show "現在: {int} / 目標: {int}" format

  Scenario: Button text is in Japanese
    Given I am at the Operation Center
    Then I should see a button with text "🐒 イタズラ猿を呼ぶ"

  Scenario: Notification messages are in Japanese
    Given I have 3 sleighs active (Desired State is 3)
    When I click the "Call Chaos Monkey 🐒" button
    And the system automatically restores the sleigh
    Then I should see a notification "魔法の契約書がソリを復活させました！"

  Scenario: Elf messages are in Japanese
    Given I am at the Operation Center
    When I increase the sleigh count from 1 to 5
    Then I should see a message from the Elf saying "これは増員（Scaling）です！リソースを追加しました。"
    
    Given the Chaos Monkey has destroyed a sleigh
    When the system automatically restores the sleigh
    Then I should see a message from the Elf saying "これは復活の魔法（Self-healing）です！Kubernetesが目標状態を維持しています。"
```

## Technical Notes

* **Localization Strategy:**
  * すべてのUIテキストを日本語に置き換える。
  * コード内の変数名やコメントは英語のまま（開発者向け）。
  * UI表示のみを日本語化。

* **Text Replacements:**
  * Header: "Operation Center" → "作戦本部"
  * Slider Label: "魔法の契約書 (Desired State)" → "📜 魔法の契約書"
  * Status Text: "Current: X / Desired: Y" → "現在: X / 目標: Y"
  * Button: "Call Chaos Monkey" → "イタズラ猿を呼ぶ"
  * Notification: "Magic Contract restored the sleigh!" → "魔法の契約書がソリを復活させました！"
  * Scaling Message: "This is Scaling! We added resources." → "これは増員（Scaling）です！リソースを追加しました。"
  * Self-healing Message: "This is Self-healing! Kubernetes maintains the Desired State." → "これは復活の魔法（Self-healing）です！Kubernetesが目標状態を維持しています。"

* **Design Considerations:**
  * 日本語の文字数が英語より長くなる可能性があるため、レイアウトの調整が必要な場合がある。
  * フォントサイズや吹き出しのサイズを適切に調整する。
  * 子供向けに読みやすい大きなフォントを維持する。

