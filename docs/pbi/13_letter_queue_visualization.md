# PBI-13: 処理待ち手紙の視覚化（キューに溜まる）

## User Story

ケンタくんとして、処理できない手紙が画面上を通り過ぎるのではなく、処理待ちとして画面内に溜まっていく様子を見たい。これにより、キューに溜まっている手紙の数を視覚的に理解できるようにしたい。

## Gherkin Scenarios (Acceptance Criteria)

```gherkin
Feature: Letter Queue Visualization
  As a Commander (Kenta)
  I want letters that cannot be processed to accumulate in the queue
  So that I can visually understand how many letters are waiting to be processed

  Scenario: Letters accumulate in queue when processing capacity is full
    Given I am at the Operation Center
    And I have 1 sleigh active (Desired State is 1)
    And letters are flooding in
    When the sleigh is processing 5 letters (maximum capacity)
    And more letters arrive at the sleigh
    Then the new letters should be added to the queue
    And the queued letters should remain visible on the screen
    And the queued letters should accumulate near the sleigh

  Scenario: Queued letters are processed when capacity becomes available
    Given I am at the Operation Center
    And I have 1 sleigh active (Desired State is 1)
    And letters are flooding in
    And the sleigh is processing 5 letters (maximum capacity)
    And there are letters waiting in the queue
    When one letter finishes processing
    Then the next letter from the queue should start processing
    And the queued letters should decrease

  Scenario: Multiple sleighs have independent queues
    Given I am at the Operation Center
    And I have 3 sleighs active (Desired State is 3)
    And letters are flooding in
    When each sleigh reaches its maximum processing capacity
    Then each sleigh should have its own queue of waiting letters
    And the queued letters should accumulate near their respective sleighs
```

## Technical Notes

* **Current Implementation:**
  * 手紙がソリに到達したら、キューに追加される
  * キューに追加された手紙は`queued: true`フラグが設定される
  * しかし、キューに追加された手紙は画面上で移動し続ける可能性がある
  * 処理待ちの手紙が視覚的に溜まっている様子が分からない

* **Required Changes:**
  * キューに追加された手紙（`queued: true`）は、ソリの近くに留まる
  * 処理待ちの手紙は、ソリの周辺に視覚的に溜まっていく
  * 手紙が処理されると、次の手紙が処理開始される

* **Visual Behavior:**
  * キューに追加された手紙は、ソリの位置に近い位置で停止する
  * 複数の手紙がキューに追加された場合、ソリの周辺に配置される
  * 手紙の位置は、キュー内の順序に基づいて配置される（例：ソリの右側に順番に並ぶ）

* **Implementation Details:**
  * `src/App.tsx` の手紙移動ロジックを変更
  * `queued: true` の手紙は、ソリの位置に近い位置で停止
  * キュー内の順序に基づいて、手紙の位置を調整
  * 処理中の手紙（`processing: true`）も同様にソリの近くに配置

* **Letter Position Calculation:**
  ```typescript
  // キューに追加された手紙の位置を計算
  if (letter.queued && letter.assignedSleighId) {
    const sleighPosition = sleighPositions.find((pos) => pos.id === letter.assignedSleighId);
    if (sleighPosition) {
      // キュー内の順序を取得
      const queue = sleighProcessingQueues[letter.assignedSleighId] || [];
      const queueIndex = queue.findIndex((q) => q.id === letter.id);
      
      if (queueIndex >= 0) {
        // ソリの右側に順番に並べる（処理中の手紙の後ろ）
        const processingCount = sleighActiveProcessingCounts[letter.assignedSleighId] || 0;
        const offsetX = (processingCount + queueIndex) * 60; // 手紙の幅 + 間隔
        const offsetY = (queueIndex % 2) * 30; // 交互に上下に配置
        
        return {
          ...letter,
          x: sleighPosition.x - nightSkyRect.left + offsetX,
          y: sleighPosition.y - nightSkyRect.top + offsetY,
        };
      }
    }
  }
  ```

* **Queue Visualization:**
  * 処理中の手紙（`processing: true`）: ソリのすぐ近くに配置
  * キューに追加された手紙（`queued: true`）: 処理中の手紙の後ろに順番に並ぶ
  * 手紙の位置は、キュー内の順序に基づいて動的に更新される

* **Educational Value:**
  * キューに溜まっている手紙の数を視覚的に理解できる
  * 処理能力が限界に達したときの挙動を理解できる
  * スケーリングの必要性をより明確に体験できる

