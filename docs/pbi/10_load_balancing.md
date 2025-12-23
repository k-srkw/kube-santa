# PBI-10: 負荷分散（Load Balancing）の視覚化

## User Story

ケンタくんとして、手紙が複数のソリに均等に分散されて処理されている様子を見たい。どのソリがどのくらいの手紙を処理しているかがわかると、負荷分散の仕組みが理解しやすくなる。

## Gherkin Scenarios (Acceptance Criteria)

```gherkin
Feature: Load Balancing Visualization
  As a Learner (Kenta)
  I want to see how letters are distributed across multiple sleighs
  So that I can understand how load balancing works in Kubernetes

  Scenario: Letters are assigned to sleighs using load balancing
    Given I am at the Operation Center
    And I have at least 3 sleighs active
    When letters are flooding in
    Then each letter should be assigned to a sleigh
    And letters should be distributed across all active sleighs
    And I should see letters moving toward their assigned sleigh

  Scenario: Load balancing distributes letters evenly
    Given I am at the Operation Center
    And I have 5 sleighs active
    And letters are flooding in
    When 20 letters have been processed
    Then each sleigh should have processed approximately equal number of letters
    And I should see a load indicator showing the distribution

  Scenario: Load balancing adapts when sleighs are added
    Given I am at the Operation Center
    And I have 2 sleighs active
    And letters are flooding in
    When I scale up to 5 sleighs
    Then new letters should be distributed to all 5 sleighs
    And the load should be redistributed across all sleighs

  Scenario: Visual feedback shows load distribution
    Given I am at the Operation Center
    And I have at least 3 sleighs active
    And letters are flooding in
    Then I should see each sleigh's processing count displayed
    And I should see letters moving toward their assigned sleigh with a line or path
    And I should see a message from the Elf explaining load balancing
```

## Technical Notes

* **Load Balancing Algorithm:**
  * ラウンドロビン方式: 手紙を順番に各ソリに割り当て
  * または、各ソリの現在の負荷（処理中の手紙数）を考慮した負荷分散
  * 各手紙に「割り当て先ソリID」を設定

* **Letter Assignment:**
  * 手紙が生成された時点で、利用可能なソリの中から1つを選択
  * 各ソリに「処理待ち手紙のキュー」を管理
  * 手紙は割り当てられたソリに向かって移動

* **Visual Feedback:**
  * 各ソリの近くに処理済み手紙数を表示（例: "処理: 5"）
  * 手紙とソリの間に線やパスを表示（オプション）
  * 各ソリの負荷状況を色やサイズで表現（オプション）

* **State Management:**
  * 各ソリ（Pod）に処理済み手紙数のカウンターを追加
  * 各手紙に `assignedSleighId` プロパティを追加
  * 手紙の移動方向を割り当て先ソリに向ける

* **Load Balancing Logic:**
  * ラウンドロビン: `currentSleighIndex = (currentSleighIndex + 1) % sleighCount`
  * または、最小負荷優先: 処理待ち手紙数が最も少ないソリを選択

* **UI Components:**
  * 各ソリの上または近くに処理カウンターを表示
  * 負荷分散の説明をエルフメッセージで表示
  * 手紙がソリに向かうアニメーション（直線移動または曲線）

* **Educational Message:**
  * エルフが「これが負荷分散（Load Balancing）だよ。手紙を複数のサンタさんに分けて処理することで、1つのサンタさんに負荷が集中しないようにしているんだ。」と説明

* **Implementation Details:**
  * 衝突判定を削除し、手紙の割り当てロジックに置き換え
  * 手紙は割り当てられたソリの位置に向かって移動
  * ソリに到達した手紙をプレゼントに変換
  * 各ソリの処理カウンターを更新
