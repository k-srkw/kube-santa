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

