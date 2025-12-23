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

