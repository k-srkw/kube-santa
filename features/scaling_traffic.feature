Feature: Scaling with Traffic (Letter Overload)
  As a Commander (Kenta)
  I want to scale up sleighs when letters flood in
  So that I can handle the traffic and convert letters to presents

  Scenario: Letters flood in from screen edges
    Given I am at the Operation Center
    When I click the "Start Letter Flood" button
    Then I should see letters flying in from the screen edges
    And the letters should move across the Night Sky

  Scenario: Insufficient sleighs cause letter overflow
    Given I am at the Operation Center
    And I have 1 sleigh active (Desired State is 1)
    When I click the "Start Letter Flood" button
    Then I should see letters accumulating on the screen
    And the screen should become filled with unprocessed letters
    And I should see a warning message "手紙が多すぎます！ソリを増やしてください"

  Scenario: Scaling up to handle traffic
    Given I am at the Operation Center
    And I have 1 sleigh active (Desired State is 1)
    And letters are flooding in
    When I move the "Desired State" slider to 10
    Then I should see sleighs increase to 10
    And I should see letters being converted to presents by the sleighs
    And the accumulated letters should decrease
    And I should see a message from the Elf saying "これが増員（Scaling）だよ。忙しくなったらすぐに仲間を増やして対応できるのがクラウドの強みなんだ。"

  Scenario: Using scale-up button to handle traffic
    Given I am at the Operation Center
    And I have 1 sleigh active (Desired State is 1)
    And letters are flooding in
    When I click the "スケールアップ" button multiple times
    Then I should see sleighs increase
    And I should see letters being converted to presents
    And the accumulated letters should decrease

  Scenario: Letters are converted to presents
    Given I am at the Operation Center
    And I have at least 3 sleighs active
    When I click the "Start Letter Flood" button
    And a letter comes into contact with a sleigh
    Then the letter should be converted to a present
    And the present should appear with a sparkle effect

