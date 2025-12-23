Feature: Application Layout
  As a Commander (Kenta)
  I want to see the operation center and the sky
  So that I can start the mission

  Scenario: Initial Load
    Given I open the Kube Santa application
    Then I should see the header with title "🎅 Kube Santa - プレゼント戦略"
    And I should see the "Night Sky" area (Cluster)
    And I should see the "Control Panel" area at the bottom
    And the background of the Night Sky should be dark blue

