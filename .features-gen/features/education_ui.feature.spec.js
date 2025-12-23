// Generated from: features/education_ui.feature
import { test } from "playwright-bdd";

test.describe('Educational Feedback', () => {

  test('Explanation for Scaling', async ({ Given, When, Then, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await When('I increase the sleigh count from 1 to 5', null, { page }); 
    await Then('I should see a message from the Elf saying "これは増員（Scaling）です！リソースを追加しました。"', null, { page }); 
  });

  test('Explanation for Self-healing', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('the Chaos Monkey has destroyed a sleigh', null, { page }); 
    await When('the system automatically restores the sleigh', null, { page }); 
    await Then('I should see a message from the Elf saying "これは復活の魔法（Self-healing）です！Kubernetesが目標状態を維持しています。"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/education_ui.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When I increase the sleigh count from 1 to 5","stepMatchArguments":[{"group":{"start":33,"value":"1","children":[]},"parameterTypeName":"int"},{"group":{"start":38,"value":"5","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then I should see a message from the Elf saying \"これは増員（Scaling）です！リソースを追加しました。\"","stepMatchArguments":[{"group":{"start":43,"value":"\"これは増員（Scaling）です！リソースを追加しました。\"","children":[{"start":44,"value":"これは増員（Scaling）です！リソースを追加しました。","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":12,"pickleLine":11,"tags":[],"steps":[{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"And the Chaos Monkey has destroyed a sleigh","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When the system automatically restores the sleigh","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then I should see a message from the Elf saying \"これは復活の魔法（Self-healing）です！Kubernetesが目標状態を維持しています。\"","stepMatchArguments":[{"group":{"start":43,"value":"\"これは復活の魔法（Self-healing）です！Kubernetesが目標状態を維持しています。\"","children":[{"start":44,"value":"これは復活の魔法（Self-healing）です！Kubernetesが目標状態を維持しています。","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end