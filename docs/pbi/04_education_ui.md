# PBI-04: 教育的な解説とエルフのガイド

## User Story

ケンタくんとして、画面で起きていることが技術的にどういう意味なのかを知りたい。エルフ（妖精）に優しく教えてほしい。

## Gherkin Scenarios (Acceptance Criteria)

```gherkin
Feature: Educational Feedback
  As a Learner (Kenta)
  I want to receive explanations when events happen
  So that I understand the Kubernetes concepts behind the game

  Scenario: Explanation for Scaling
    Given I am at the Operation Center
    When I increase the sleigh count from 1 to 5
    Then I should see a message from the Elf saying "This is Scaling! We added resources."

  Scenario: Explanation for Self-healing
    Given the Chaos Monkey has destroyed a sleigh
    When the system automatically restores the sleigh
    Then I should see a message from the Elf saying "This is Self-healing! Kubernetes maintains the Desired State."

```

## Technical Notes

* **UI Component:**
  * 画面の隅（右下など）に「エルフのアイコン 🧝」と「吹き出し」を配置する。

* **Trigger:**
  * Scaling 発生時、Self-healing 発生時のイベントをフックして、吹き出しの中身を書き換える。

* **Content:**
  * 子供向けに優しい言葉遣いにする（Project Context のメタファーを参照）。
