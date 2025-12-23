Feature: Child-Friendly UI Text
  As a Child (Kenta)
  I want to see simple and understandable text in the UI
  So that I can understand what each element means without adult help

  Scenario: Header text is child-friendly
    Given I open the Kube Santa application
    Then I should see the header with title "🎅 Kube Santa - プレゼント戦略"

  Scenario: Slider label is child-friendly
    Given I am at the Operation Center
    Then I should see the slider label "サンタさん (Pod) の数"

  Scenario: Status text is child-friendly
    Given I am at the Operation Center
    Then the status text should show "いて欲しいサンタさん: 0 / 今いるサンタさん: 0"

  Scenario: All UI text is understandable for children
    Given I am at the Operation Center
    Then I should not see difficult technical terms in the main UI
    And all labels should use simple Japanese words that children can understand

