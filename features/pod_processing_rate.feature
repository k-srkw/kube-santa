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

