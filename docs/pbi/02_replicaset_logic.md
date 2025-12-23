# PBI-02: ReplicaSet（魔法の契約書）の実装

## User Story

ケンタくんとして、飛ばしたいソリの数を指定して、その数通りにソリを出現させたい。「数字を変えると即座に世界が変わる」体験をしたい。

## Gherkin Scenarios (Acceptance Criteria)

```gherkin
Feature: ReplicaSet Scaling
  As a Commander (Kenta)
  I want to control the number of sleighs
  So that I can deliver presents according to the plan

  Scenario: Scaling Up (Increase Replicas)
    Given I am at the Operation Center
    And the current sleigh count is 0
    When I move the "Desired State" slider to 3
    Then I should see 3 sleighs appear in the Night Sky
    And the status text should show "Current: 3 / Desired: 3"

  Scenario: Scaling Down (Decrease Replicas)
    Given I have 5 sleighs active
    When I move the "Desired State" slider to 2
    Then I should see 3 sleighs disappear
    And only 2 sleighs should remain in the Night Sky

```

## Technical Notes

* **State Management:**
  * `desiredState` (number): スライダーの値。
  * `pods` (array): 実際に画面に表示されているオブジェクトの配列。

* **Reconciliation Logic:**
  * スライダー変更時 (`onChange`) に即座に `pods` 配列の長さを調整するロジックを入れる（この段階ではシンプルな同期処理で良い）。

* **Animation:**
  * Framer Motion の `<AnimatePresence>` と `<motion.div>` を使い、出現時は `scale: 0 -> 1`、消滅時は `opacity: 1 -> 0` などの動きをつける。

* **Assets:**
  * ソリは絵文字 (🛷) または Lucide Icon (`<Sleigh />` など、なければ近いもの) を使用。
