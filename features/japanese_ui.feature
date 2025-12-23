Feature: Japanese UI Localization
  As a Japanese Learner (Kenta)
  I want to see all UI text in Japanese
  So that I can understand the application without English knowledge

  Scenario: Header is in Japanese
    Given I open the Kube Santa application
    Then I should see the header with title "🎅 Kube Santa - プレゼント戦略"

  Scenario: Control Panel labels are in Japanese
    Given I am at the Operation Center
    Then I should see the slider label "サンタさん (Pod) の数"
    And the status text should show "いて欲しいサンタさん: 0 / 今いるサンタさん: 0"

  Scenario: Button text is in Japanese
    Given I am at the Operation Center
    Then I should see a button with text "🐒 イタズラ猿を呼ぶ"

  Scenario: Notification messages are in Japanese
    Given I am at the Operation Center
    And I have 3 sleighs active (Desired State is 3)
    When I click the "Call Chaos Monkey 🐒" button
    And the system automatically restores the sleigh
    Then I should see a notification "魔法の契約書がソリを復活させました！"

  Scenario: Elf messages are in Japanese
    Given I am at the Operation Center
    When I increase the sleigh count from 1 to 5
    Then I should see a message from the Elf saying "これは増員（Scaling）です！リソースを追加しました。"

  Scenario: Elf message for Self-healing is in Japanese
    Given I am at the Operation Center
    And the Chaos Monkey has destroyed a sleigh
    When the system automatically restores the sleigh
    Then I should see a message from the Elf saying "これは復活の魔法（Self-healing）です！Kubernetesが目標状態を維持しています。"

