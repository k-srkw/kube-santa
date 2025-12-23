Feature: ReplicaSet Scaling
  As a Commander (Kenta)
  I want to control the number of sleighs
  So that I can deliver presents according to the plan

  Scenario: Scaling Up (Increase Replicas)
    Given I am at the Operation Center
    And the current sleigh count is 0
    When I move the "Desired State" slider to 3
    Then I should see 3 sleighs appear in the Night Sky
    And the status text should show "いて欲しいサンタさん: 3 / 今いるサンタさん: 3"

  Scenario: Scaling Down (Decrease Replicas)
    Given I am at the Operation Center
    And I have 5 sleighs active
    When I move the "Desired State" slider to 2
    Then I should see 3 sleighs disappear
    And only 2 sleighs should remain in the Night Sky

