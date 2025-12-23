// Generated from: features/japanese_ui.feature
import { test } from "playwright-bdd";

test.describe('Japanese UI Localization', () => {

  test('Header is in Japanese', async ({ Given, Then, page }) => { 
    await Given('I open the Kube Santa application', null, { page }); 
    await Then('I should see the header with title "🎅 Kube Santa - プレゼント戦略"', null, { page }); 
  });

  test('Control Panel labels are in Japanese', async ({ Given, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await Then('I should see the slider label "サンタさん (Pod) の数"', null, { page }); 
    await And('the status text should show "いて欲しいサンタさん: 0 / 今いるサンタさん: 0"', null, { page }); 
  });

  test('Button text is in Japanese', async ({ Given, Then, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await Then('I should see a button with text "🐒 イタズラ猿を呼ぶ"', null, { page }); 
  });

  test('Notification messages are in Japanese', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 3 sleighs active (Desired State is 3)', null, { page }); 
    await When('I click the "Call Chaos Monkey 🐒" button', null, { page }); 
    await And('the system automatically restores the sleigh', null, { page }); 
    await Then('I should see a notification "魔法の契約書がソリを復活させました！"', null, { page }); 
  });

  test('Elf messages are in Japanese', async ({ Given, When, Then, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await When('I increase the sleigh count from 1 to 5', null, { page }); 
    await Then('I should see a message from the Elf saying "これは増員（Scaling）です！リソースを追加しました。"', null, { page }); 
  });

  test('Elf message for Self-healing is in Japanese', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('the Chaos Monkey has destroyed a sleigh', null, { page }); 
    await When('the system automatically restores the sleigh', null, { page }); 
    await Then('I should see a message from the Elf saying "これは復活の魔法（Self-healing）です！Kubernetesが目標状態を維持しています。"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/japanese_ui.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I open the Kube Santa application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then I should see the header with title \"🎅 Kube Santa - プレゼント戦略\"","stepMatchArguments":[{"group":{"start":35,"value":"\"🎅 Kube Santa - プレゼント戦略\"","children":[{"start":36,"value":"🎅 Kube Santa - プレゼント戦略","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":11,"pickleLine":10,"tags":[],"steps":[{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then I should see the slider label \"サンタさん (Pod) の数\"","stepMatchArguments":[{"group":{"start":30,"value":"\"サンタさん (Pod) の数\"","children":[{"start":31,"value":"サンタさん (Pod) の数","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And the status text should show \"いて欲しいサンタさん: 0 / 今いるサンタさん: 0\"","stepMatchArguments":[{"group":{"start":28,"value":"\"いて欲しいサンタさん: 0 / 今いるサンタさん: 0\"","children":[{"start":29,"value":"いて欲しいサンタさん: 0 / 今いるサンタさん: 0","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":17,"pickleLine":15,"tags":[],"steps":[{"pwStepLine":18,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then I should see a button with text \"🐒 イタズラ猿を呼ぶ\"","stepMatchArguments":[{"group":{"start":32,"value":"\"🐒 イタズラ猿を呼ぶ\"","children":[{"start":33,"value":"🐒 イタズラ猿を呼ぶ","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":22,"pickleLine":19,"tags":[],"steps":[{"pwStepLine":23,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"And I have 3 sleighs active (Desired State is 3)","stepMatchArguments":[{"group":{"start":7,"value":"3","children":[]},"parameterTypeName":"int"},{"group":{"start":42,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":25,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When I click the \"Call Chaos Monkey 🐒\" button","stepMatchArguments":[{"group":{"start":12,"value":"\"Call Chaos Monkey 🐒\"","children":[{"start":13,"value":"Call Chaos Monkey 🐒","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"And the system automatically restores the sleigh","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then I should see a notification \"魔法の契約書がソリを復活させました！\"","stepMatchArguments":[{"group":{"start":28,"value":"\"魔法の契約書がソリを復活させました！\"","children":[{"start":29,"value":"魔法の契約書がソリを復活させました！","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":30,"pickleLine":26,"tags":[],"steps":[{"pwStepLine":31,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When I increase the sleigh count from 1 to 5","stepMatchArguments":[{"group":{"start":33,"value":"1","children":[]},"parameterTypeName":"int"},{"group":{"start":38,"value":"5","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":33,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then I should see a message from the Elf saying \"これは増員（Scaling）です！リソースを追加しました。\"","stepMatchArguments":[{"group":{"start":43,"value":"\"これは増員（Scaling）です！リソースを追加しました。\"","children":[{"start":44,"value":"これは増員（Scaling）です！リソースを追加しました。","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":36,"pickleLine":31,"tags":[],"steps":[{"pwStepLine":37,"gherkinStepLine":32,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"And the Chaos Monkey has destroyed a sleigh","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When the system automatically restores the sleigh","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then I should see a message from the Elf saying \"これは復活の魔法（Self-healing）です！Kubernetesが目標状態を維持しています。\"","stepMatchArguments":[{"group":{"start":43,"value":"\"これは復活の魔法（Self-healing）です！Kubernetesが目標状態を維持しています。\"","children":[{"start":44,"value":"これは復活の魔法（Self-healing）です！Kubernetesが目標状態を維持しています。","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end