# PBI-12: Pod の最大処理数制限（最大5つ）

## User Story

ケンタくんとして、1つのソリ（Pod）が同時に処理できる手紙の数を最大5つに制限したい。これにより、ソリの処理能力が明確になり、スケーリングの必要性をより理解しやすくしたい。

## Gherkin Scenarios (Acceptance Criteria)

```gherkin
Feature: Pod Maximum Processing Limit
  As a Commander (Kenta)
  I want each sleigh to process a maximum of 5 letters at a time
  So that I understand the processing capacity of each sleigh

  Scenario: Single sleigh processes up to 5 letters at a time
    Given I am at the Operation Center
    And I have 1 sleigh active (Desired State is 1)
    And letters are flooding in
    When I wait for a sufficient amount of time
    Then the sleigh should process letters one by one
    And the sleigh should process at most 5 letters simultaneously
    And once a letter is processed, the next letter should be processed

  Scenario: Multiple sleighs process letters independently
    Given I am at the Operation Center
    And I have 3 sleighs active (Desired State is 3)
    And letters are flooding in
    When I wait for a sufficient amount of time
    Then each sleigh should process at most 5 letters simultaneously
    And the total processing capacity should be 15 letters (3 sleighs × 5 letters)

  Scenario: Processing continues when letters are completed
    Given I am at the Operation Center
    And I have 1 sleigh active (Desired State is 1)
    And letters are flooding in
    When I wait for a sufficient amount of time
    Then the sleigh should continuously process letters
    And the number of letters being processed should not exceed 5 at any time
```

## Technical Notes

* **Maximum Processing Limit:**
  * 1 Pod = 最大5つの手紙を同時に処理可能
  * 手紙が処理完了したら、次の手紙を処理開始
  * 処理中の手紙が5つ未満の場合、新しい手紙を処理開始

* **Current Implementation:**
  * 現在は手紙がソリに到達したら即座に処理される
  * 処理数の制限がないため、無限に処理できる状態

* **Required Changes:**
  * 各ソリ（Pod）に処理中の手紙の数を管理
  * 各ソリが最大5つまで同時に処理できるように制限
  * 処理中の手紙が5つ未満の場合、キューから新しい手紙を取り出して処理開始

* **Processing Queue Management:**
  * 各ソリに処理待ちの手紙キューを追加
  * 手紙がソリに到達したら、キューに追加
  * 各ソリは処理中の手紙が5つ未満の場合、キューから手紙を取り出して処理
  * 手紙の処理が完了したら、処理中の手紙数を減らし、次の手紙を処理開始

* **State Management:**
  * 各ソリ（Pod ID）に処理中の手紙数を追加
  * `sleighProcessingCounts: Record<number, number>` を処理中の手紙数として使用
  * 各ソリの処理キューを管理: `sleighProcessingQueues: Record<number, Letter[]>`

* **Implementation Details:**
  * `src/App.tsx` の手紙処理ロジックを変更
  * 手紙がソリに到達したら、即座に処理せずにキューに追加
  * 各ソリごとに処理中の手紙数をチェック
  * 処理中の手紙数が5未満の場合、キューから手紙を取り出して処理開始
  * 手紙の処理が完了したら（プレゼントに変換されたら）、処理中の手紙数を減らす

* **Processing Logic:**
  ```typescript
  // 各ソリの処理キューと処理中の手紙数
  const [sleighProcessingQueues, setSleighProcessingQueues] = useState<Record<number, Letter[]>>({});
  const [sleighProcessingCounts, setSleighProcessingCounts] = useState<Record<number, number>>({});
  
  // 手紙がソリに到達したらキューに追加
  if (distance < LETTER_PROCESSING_DISTANCE) {
    if (!letter.processed && !letter.queued && letter.assignedSleighId) {
      setSleighProcessingQueues((prevQueues) => {
        const queue = prevQueues[letter.assignedSleighId!] || [];
        if (!queue.find((q) => q.id === letter.id)) {
          return {
            ...prevQueues,
            [letter.assignedSleighId!]: [...queue, letter],
          };
        }
        return prevQueues;
      });
      return { ...letter, queued: true };
    }
    return letter;
  }
  
  // 処理中の手紙数が5未満の場合、キューから手紙を取り出して処理
  useEffect(() => {
    pods.forEach((podId) => {
      setSleighProcessingQueues((prevQueues) => {
        const queue = prevQueues[podId] || [];
        const processingCount = sleighProcessingCounts[podId] || 0;
        
        // 処理中の手紙数が5未満で、キューに手紙がある場合
        if (processingCount < 5 && queue.length > 0) {
          const letterToProcess = queue[0];
          // 処理開始
          convertLetterToPresent(letterToProcess, sleighX, sleighY);
          // 処理中の手紙数を増やす
          setSleighProcessingCounts((prev) => ({
            ...prev,
            [podId]: (prev[podId] || 0) + 1,
          }));
          // キューから削除
          return {
            ...prevQueues,
            [podId]: queue.slice(1),
          };
        }
        return prevQueues;
      });
    });
  }, [pods, sleighProcessingCounts]);
  
  // 手紙の処理が完了したら、処理中の手紙数を減らす
  const convertLetterToPresent = (letter: Letter, sleighX: number, sleighY: number) => {
    // プレゼントに変換
    setPresents((prev) => [...prev, { id: presentIdRef.current++, x: sleighX, y: sleighY }]);
    // 処理中の手紙数を減らす
    setSleighProcessingCounts((prev) => ({
      ...prev,
      [letter.assignedSleighId!]: Math.max(0, (prev[letter.assignedSleighId!] || 0) - 1),
    }));
  };
  ```

* **Letter Queue Assignment:**
  * 手紙がソリに到達したら（距離 < LETTER_PROCESSING_DISTANCE）、キューに追加
  * 手紙を`processed: true`にする代わりに、キューに追加
  * キューに追加された手紙は、処理中の手紙数が5未満の場合に処理開始

* **Visual Feedback:**
  * 各ソリの処理カウンターを更新（既存の実装を維持）
  * 処理中の手紙数を表示（オプション）

* **Educational Value:**
  * 各リソース（Pod）の処理能力が有限であることを理解できる
  * スケーリングの必要性をより明確に体験できる
  * システムの処理能力と負荷のバランスを理解できる
