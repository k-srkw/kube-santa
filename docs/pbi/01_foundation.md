# PBI-01: 基盤とレイアウト (Foundation)

## User Story

ケンタくんとして、サンタが飛ぶ「夜空」と、それを操作する「基地（コントロールパネル）」の画面を見たい。まずはゲームの舞台が整っていることを確認したい。

## Gherkin Scenarios (Acceptance Criteria)

```gherkin
Feature: Application Layout
  As a Commander (Kenta)
  I want to see the operation center and the sky
  So that I can start the mission

  Scenario: Initial Load
    Given I open the Kube Santa application
    Then I should see the header with title "🎅 Kube Santa - Operation Center"
    And I should see the "Night Sky" area (Cluster)
    And I should see the "Control Panel" area at the bottom
    And the background of the Night Sky should be dark blue

```

## Technical Notes

* **Layout:** Flexbox または Grid を使用して画面を上下に分割する。
  * 上部 (Flex-grow): 夜空エリア。
  * 下部 (Fixed height): コントロールパネル。

* **Design:** Tailwind CSS を使用。
  * 夜空: `bg-slate-900` やグラデーション。
  * パネル: `bg-slate-800` など、計器類っぽさを出す。
