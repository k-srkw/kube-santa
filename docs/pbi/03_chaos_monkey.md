# PBI-03: Chaos Monkey と Self-healing

## User Story

ケンタくんとして、イタズラ猿にソリを壊させたい。そして、壊されても自動的にソリが復活して、元の数に戻る「魔法（Self-healing）」を見て驚きたい。

## Gherkin Scenarios (Acceptance Criteria)

```gherkin
Feature: Self-healing Mechanism
  As a Commander (Kenta)
  I want the system to automatically replace destroyed sleighs
  So that the mission continues without my manual intervention

  Scenario: Recovering from Chaos Monkey attack
    Given I have 3 sleighs active (Desired State is 3)
    When I click the "Call Chaos Monkey 🐒" button
    Then I should see one sleigh destroyed (count becomes 2)
    But within 5 seconds, a new sleigh should appear
    And the total sleigh count should return to 3
    And I should see a notification "Magic Contract restored the sleigh!"

```

## Technical Notes

* **Chaos Logic:**
  * ボタン押下で `pods` 配列からランダムに1つ要素を削除する。

* **Self-healing Logic (The Loop):**
  * `useEffect` または `useInterval` を使用して監視ループを作る。
  * ループ条件: `pods.length < desiredState` ならば、不足分を追加する。
  * UXのため、即時復活ではなく「1〜2秒の遅延」を持たせると「直してくれた感」が出る。

* **Notification:**
  * `react-hot-toast` やシンプルな自作トーストコンポーネントを使用。
