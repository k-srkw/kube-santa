Feature: Educational Feedback
  As a Learner (Kenta)
  I want to receive explanations when events happen
  So that I understand the Kubernetes concepts behind the game

  Scenario: Explanation for Scaling
    Given I am at the Operation Center
    When I increase the sleigh count from 1 to 5
    Then I should see a message from the Elf saying "これは増員（Scaling）です！リソースを追加しました。"

  Scenario: Explanation for Self-healing
    Given I am at the Operation Center
    And the Chaos Monkey has destroyed a sleigh
    When the system automatically restores the sleigh
    Then I should see a message from the Elf saying "これは復活の魔法（Self-healing）です！Kubernetesが目標状態を維持しています。"

