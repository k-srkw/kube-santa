Feature: Self-healing Mechanism
  As a Commander (Kenta)
  I want the system to automatically replace destroyed sleighs
  So that the mission continues without my manual intervention

  Scenario: Recovering from Chaos Monkey attack
    Given I am at the Operation Center
    And I have 3 sleighs active (Desired State is 3)
    When I click the "🐒 イタズラ猿を呼ぶ" button
    Then I should see one sleigh destroyed (count becomes 2)
    But within 5 seconds, a new sleigh should appear
    And the total sleigh count should return to 3
    And I should see a notification "魔法の契約書がソリを復活させました！"

