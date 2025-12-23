# PBI-08: Scaling (手紙の殺到)

## User Story

ケンタくんとして、大量の手紙が飛んでくる状況で、スケールアップボタンやスライダーを使ってソリを増やし、手紙をプレゼントに変えていく体験をしたい。忙しくなったらすぐに仲間を増やして対応できるクラウドの強みを学びたい。

## Gherkin Scenarios (Acceptance Criteria)

```gherkin
Feature: Scaling with Traffic (Letter Overload)
  As a Commander (Kenta)
  I want to scale up sleighs when letters flood in
  So that I can handle the traffic and convert letters to presents

  Scenario: Letters flood in from screen edges
    Given I am at the Operation Center
    When I click the "Start Letter Flood" button
    Then I should see letters flying in from the screen edges
    And the letters should move across the Night Sky

  Scenario: Insufficient sleighs cause letter overflow
    Given I am at the Operation Center
    And I have 1 sleigh active (Desired State is 1)
    When I click the "Start Letter Flood" button
    Then I should see letters accumulating on the screen
    And the screen should become filled with unprocessed letters
    And I should see a warning message "手紙が多すぎます！ソリを増やしてください"

  Scenario: Scaling up to handle traffic
    Given I am at the Operation Center
    And I have 1 sleigh active (Desired State is 1)
    And letters are flooding in
    When I move the "Desired State" slider to 10
    Then I should see sleighs increase to 10
    And I should see letters being converted to presents by the sleighs
    And the accumulated letters should decrease
    And I should see a message from the Elf saying "これが増員（Scaling）だよ。忙しくなったらすぐに仲間を増やして対応できるのがクラウドの強みなんだ。"

  Scenario: Using scale-up button to handle traffic
    Given I am at the Operation Center
    And I have 1 sleigh active (Desired State is 1)
    And letters are flooding in
    When I click the "スケールアップ" button multiple times
    Then I should see sleighs increase
    And I should see letters being converted to presents
    And the accumulated letters should decrease

  Scenario: Letters are converted to presents
    Given I am at the Operation Center
    And I have at least 3 sleighs active
    When a letter comes into contact with a sleigh
    Then the letter should be converted to a present
    And the present should appear with a sparkle effect
```

## Technical Notes

* **Traffic (Letters) System:**
  * 画面端から手紙（📝 または ✉️）がランダムに飛んでくるアニメーション
  * 手紙は一定の速度で画面を横切る
  * 手紙は配列で管理し、定期的に新しい手紙を追加

* **Letter Processing Logic:**
  * ソリと手紙の衝突判定（距離ベースの簡易判定）
  * 衝突した手紙をプレゼント（🎁）に変換
  * 処理されなかった手紙は画面に蓄積される

* **Overflow Detection:**
  * 画面内の未処理手紙の数をカウント
  * 一定数（例: 20個）を超えると警告メッセージを表示
  * 画面が手紙で埋まる視覚的表現（透明度や重なり）

* **Scaling Controls:**
  * 既存のスライダーを使用
  * 新規に「スケールアップ」ボタンを追加（+1ずつ増やす）
  * スケールアップ時は即座にソリを追加

* **Visual Effects:**
  * 手紙がプレゼントに変わる際のスパークルエフェクト
  * 手紙の蓄積による画面の視覚的変化
  * ソリが手紙を処理する際のアニメーション

* **Performance Considerations:**
  * 手紙の数が多くなりすぎないよう、画面外に出た手紙は削除
  * 処理済み手紙は一定時間後に削除
  * アニメーションのパフォーマンスを考慮した実装

* **Educational Message:**
  * スケールアップ時にエルフが「これが増員（Scaling）だよ。忙しくなったらすぐに仲間を増やして対応できるのがクラウドの強みなんだ。」と説明

* **UI Components:**
  * 「手紙の殺到を開始」ボタン（テスト用、または自動開始）
  * 「スケールアップ」ボタン（+1ずつ増やす）
  * 警告メッセージ表示エリア
