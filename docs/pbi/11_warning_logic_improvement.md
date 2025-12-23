# PBI-11: 警告ロジックの改善（最大レプリカ数時の適切な警告）

## User Story

ケンタくんとして、ソリの数に関係なく、未処理手紙が閾値を超えた場合は常に「手紙が多すぎます！ソリを増やしてください」というメッセージを表示したい。手紙の生成速度はレプリカ数に関わらず常に一定とし、レプリカ数5で警告が出ないように手紙の初期生成速度を決定したい。

## Gherkin Scenarios (Acceptance Criteria)

```gherkin
Feature: Improved Warning Logic
  As a Commander (Kenta)
  I want to see appropriate warning messages based on the current sleigh count
  So that I understand the situation correctly

  Scenario: Warning when sleighs can be increased
    Given I am at the Operation Center
    And I have 3 sleighs active (Desired State is 3)
    And letters are flooding in
    When unprocessed letters exceed the threshold
    Then I should see a warning message "手紙が多すぎます！ソリを増やしてください"
    And the warning should suggest increasing sleighs

  Scenario: Dynamic threshold based on sleigh count
    Given I am at the Operation Center
    And I have 1 sleigh active (Desired State is 1)
    And letters are flooding in
    When unprocessed letters reach 15
    Then I should see a warning message

  Scenario: No warning with 5 sleighs
    Given I am at the Operation Center
    And I have 5 sleighs active (Desired State is 5)
    And letters are flooding in
    When I wait for a sufficient amount of time (e.g., 10 seconds)
    Then I should NOT see a warning message
    And the system should remain stable (no warning appears)
```

## Technical Notes

* **Current Problem:**
  * 現在の警告ロジックは、未処理手紙が15個以上で常に「手紙が多すぎます！ソリを増やしてください」と表示
  * 最大レプリカ数（10 Pod）に達している場合でも、同じメッセージが表示される

* **Improved Warning Logic:**
  * ソリの数（`desiredState`）に応じて警告の閾値を動的に調整
    * 1台: 15個以上で警告
    * 5台: 25個以上で警告
    * 10台: 30個以上で警告
    * 式: `threshold = 15 + (desiredState * 1.5)` （1台の場合は15個）
  * 最大レプリカ数（10）に達している場合でも、同じメッセージを表示
    * 「手紙が多すぎます！ソリを増やしてください」

* **Warning Message Logic:**

  ```typescript
  const getWarningMessage = (unprocessedCount: number, desiredState: number) => {
    const threshold = getWarningThreshold(desiredState); // 動的閾値

    if (unprocessedCount >= threshold) {
      // 最大レプリカ数に関係なく、常に同じメッセージを表示
      return '手紙が多すぎます！ソリを増やしてください';
    }
    return '';
  };
  ```

* **State Management:**
  * `warningMessage` の更新ロジックを改善
  * `desiredState` を考慮した警告判定に変更
  * `useEffect` の依存配列に `desiredState` を追加

* **UI/UX Considerations:**
  * 警告メッセージの色やスタイルは既存のものを維持
  * メッセージが長い場合は、適切に折り返されるようにする
  * 子供向けにわかりやすい表現を使用

* **Educational Value:**
  * リソースの限界について学ぶ機会を提供
  * スケーリングには上限があることを理解できる
  * システムの処理能力と負荷のバランスを体験できる

* **Letter Generation Rate:**
  * 手紙の生成速度はレプリカ数に関わらず常に一定
  * レプリカ数5で警告が出ないように手紙の初期生成速度を決定
  * レプリカ数5の閾値は22個（`15 + Math.floor(5 * 1.5) = 22`）
  * 5台のソリが処理できる速度で手紙を生成するように設定
  * 固定間隔: `LETTER_GENERATION_INTERVAL` を一定値に設定（例: 400ms以上）

* **Processing Balance:**
  * 手紙の生成速度は固定のため、レプリカ数が少ない場合は警告が出やすくなる
  * レプリカ数が多い場合は処理能力が高いため、警告が出にくくなる
  * レプリカ数5を基準として、警告が出ないように生成速度を調整

* **Implementation Details:**
  * `src/App.tsx` の379-391行目の警告ロジックを改善
  * 動的閾値の計算ロジックを追加
  * `src/App.tsx` の222-257行目の手紙生成ロジックを改善
  * `LETTER_GENERATION_INTERVAL` を固定値に設定（レプリカ数5で警告が出ないように調整）
  * 動的生成間隔の計算関数を削除し、固定値を使用
  * `useEffect` の依存配列から `pods.length` を削除（生成速度が固定のため）
