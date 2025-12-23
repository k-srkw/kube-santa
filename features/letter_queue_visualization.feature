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

