Feature: Load Balancing Visualization
  As a Learner (Kenta)
  I want to see how letters are distributed across multiple sleighs
  So that I can understand how load balancing works in Kubernetes

  Scenario: Letters are assigned to sleighs using load balancing
    Given I am at the Operation Center
    And I have at least 3 sleighs active
    When letters are flooding in
    Then each letter should be assigned to a sleigh
    And letters should be distributed across all active sleighs
    And I should see letters moving toward their assigned sleigh

  Scenario: Load balancing distributes letters evenly
    Given I am at the Operation Center
    And I have 5 sleighs active
    And letters are flooding in
    When 20 letters have been processed
    Then each sleigh should have processed approximately equal number of letters
    And I should see a load indicator showing the distribution

  Scenario: Load balancing adapts when sleighs are added
    Given I am at the Operation Center
    And I have 2 sleighs active
    And letters are flooding in
    When I scale up to 5 sleighs
    Then new letters should be distributed to all 5 sleighs
    And the load should be redistributed across all sleighs

  Scenario: Visual feedback shows load distribution
    Given I am at the Operation Center
    And I have at least 3 sleighs active
    And letters are flooding in
    Then I should see each sleigh's processing count displayed
    And I should see letters moving toward their assigned sleigh with a line or path
    And I should see a message from the Elf explaining load balancing

