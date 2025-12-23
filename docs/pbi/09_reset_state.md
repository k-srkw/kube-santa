# PBI-09: 状態リセットボタン

## User Story

ケンタくんとして、アプリの状態を最初からやり直したい。サンタさんの数を0に戻したり、手紙の殺到を止めたりして、クリーンな状態から始めたい。

## Gherkin Scenarios (Acceptance Criteria)

```gherkin
Feature: State Reset
  As a Commander (Kenta)
  I want to reset the application state
  So that I can start fresh from the beginning

  Scenario: Reset sleigh count to zero
    Given I am at the Operation Center
    And I have 5 sleighs active (Desired State is 5)
    When I click the "リセット" button
    Then the sleigh count should be reset to 0
    And the status text should show "いて欲しいサンタさん: 0 / 今いるサンタさん: 0"
    And I should see 0 sleighs in the Night Sky

  Scenario: Reset letter flood state
    Given I am at the Operation Center
    And letters are flooding in
    When I click the "リセット" button
    Then the letter flood should stop
    And I should see no letters on the screen
    And the "手紙の殺到を開始" button should be enabled again

  Scenario: Reset all states at once
    Given I am at the Operation Center
    And I have 3 sleighs active (Desired State is 3)
    And letters are flooding in
    When I click the "リセット" button
    Then the sleigh count should be reset to 0
    And the letter flood should stop
    And I should see no letters on the screen
    And I should see 0 sleighs in the Night Sky
    And the status text should show "いて欲しいサンタさん: 0 / 今いるサンタさん: 0"
```

## Technical Notes

* **Reset Button:**
  * コントロールパネルに「リセット」ボタンを追加
  * ボタンのデザインは子供向けに大きく、わかりやすく（例: 🔄 リセット）

* **Reset Logic:**
  * `desiredState` を 0 に設定
  * `pods` 配列を空配列にリセット
  * `isLetterFloodActive` を `false` に設定
  * `letters` 配列を空配列にクリア
  * `presents` 配列を空配列にクリア
  * `warningMessage` を空文字列にクリア
  * `notification` を空文字列にクリア（必要に応じて）
  * `elfMessage` を空文字列にクリア（必要に応じて）

* **UI/UX Considerations:**
  * リセットボタンは目立つ色（例: オレンジや黄色）を使用
  * クリック時に確認メッセージは不要（子供向けなのでシンプルに）
  * リセット後は即座に状態が反映される

* **State Management:**
  * 既存のstate変数を直接リセットする関数を実装
  * `handleReset` 関数を作成し、すべての関連stateをリセット

* **Visual Feedback:**
  * リセット時にスパークルエフェクトを表示（オプション）
  * リセット後、画面がクリーンな状態になることを視覚的に確認できる
