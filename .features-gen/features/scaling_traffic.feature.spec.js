// Generated from: features/scaling_traffic.feature
import { test } from "playwright-bdd";

test.describe('Scaling with Traffic (Letter Overload)', () => {

  test('Letters flood in from screen edges', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await When('I click the "Start Letter Flood" button', null, { page }); 
    await Then('I should see letters flying in from the screen edges', null, { page }); 
    await And('the letters should move across the Night Sky', null, { page }); 
  });

  test('Insufficient sleighs cause letter overflow', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 1 sleigh active (Desired State is 1)', null, { page }); 
    await When('I click the "Start Letter Flood" button', null, { page }); 
    await Then('I should see letters accumulating on the screen', null, { page }); 
    await And('the screen should become filled with unprocessed letters', null, { page }); 
    await And('I should see a warning message "手紙が多すぎます！ソリを増やしてください"', null, { page }); 
  });

  test('Scaling up to handle traffic', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 1 sleigh active (Desired State is 1)', null, { page }); 
    await And('letters are flooding in', null, { page }); 
    await When('I move the "Desired State" slider to 10', null, { page }); 
    await Then('I should see sleighs increase to 10', null, { page }); 
    await And('I should see letters being converted to presents by the sleighs', null, { page }); 
    await And('the accumulated letters should decrease', null, { page }); 
    await And('I should see a message from the Elf saying "これが増員（Scaling）だよ。忙しくなったらすぐに仲間を増やして対応できるのがクラウドの強みなんだ。"', null, { page }); 
  });

  test('Using scale-up button to handle traffic', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 1 sleigh active (Desired State is 1)', null, { page }); 
    await And('letters are flooding in', null, { page }); 
    await When('I click the "スケールアップ" button multiple times', null, { page }); 
    await Then('I should see sleighs increase', null, { page }); 
    await And('I should see letters being converted to presents', null, { page }); 
    await And('the accumulated letters should decrease', null, { page }); 
  });

  test('Letters are converted to presents', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have at least 3 sleighs active', null, { page }); 
    await When('I click the "Start Letter Flood" button', null, { page }); 
    await And('a letter comes into contact with a sleigh', null, { page }); 
    await Then('the letter should be converted to a present', null, { page }); 
    await And('the present should appear with a sparkle effect', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/scaling_traffic.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When I click the \"Start Letter Flood\" button","stepMatchArguments":[{"group":{"start":12,"value":"\"Start Letter Flood\"","children":[{"start":13,"value":"Start Letter Flood","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then I should see letters flying in from the screen edges","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"And the letters should move across the Night Sky","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":12,"tags":[],"steps":[{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"And I have 1 sleigh active (Desired State is 1)","stepMatchArguments":[{"group":{"start":7,"value":"1","children":[]},"parameterTypeName":"int"},{"group":{"start":41,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When I click the \"Start Letter Flood\" button","stepMatchArguments":[{"group":{"start":12,"value":"\"Start Letter Flood\"","children":[{"start":13,"value":"Start Letter Flood","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then I should see letters accumulating on the screen","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And the screen should become filled with unprocessed letters","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And I should see a warning message \"手紙が多すぎます！ソリを増やしてください\"","stepMatchArguments":[{"group":{"start":31,"value":"\"手紙が多すぎます！ソリを増やしてください\"","children":[{"start":32,"value":"手紙が多すぎます！ソリを増やしてください","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":22,"pickleLine":20,"tags":[],"steps":[{"pwStepLine":23,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"And I have 1 sleigh active (Desired State is 1)","stepMatchArguments":[{"group":{"start":7,"value":"1","children":[]},"parameterTypeName":"int"},{"group":{"start":41,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":25,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"And letters are flooding in","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When I move the \"Desired State\" slider to 10","stepMatchArguments":[{"group":{"start":11,"value":"\"Desired State\"","children":[{"start":12,"value":"Desired State","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":37,"value":"10","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":27,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then I should see sleighs increase to 10","stepMatchArguments":[{"group":{"start":33,"value":"10","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":28,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And I should see letters being converted to presents by the sleighs","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And the accumulated letters should decrease","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"And I should see a message from the Elf saying \"これが増員（Scaling）だよ。忙しくなったらすぐに仲間を増やして対応できるのがクラウドの強みなんだ。\"","stepMatchArguments":[{"group":{"start":43,"value":"\"これが増員（Scaling）だよ。忙しくなったらすぐに仲間を増やして対応できるのがクラウドの強みなんだ。\"","children":[{"start":44,"value":"これが増員（Scaling）だよ。忙しくなったらすぐに仲間を増やして対応できるのがクラウドの強みなんだ。","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":33,"pickleLine":30,"tags":[],"steps":[{"pwStepLine":34,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":32,"keywordType":"Context","textWithKeyword":"And I have 1 sleigh active (Desired State is 1)","stepMatchArguments":[{"group":{"start":7,"value":"1","children":[]},"parameterTypeName":"int"},{"group":{"start":41,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":36,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"And letters are flooding in","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When I click the \"スケールアップ\" button multiple times","stepMatchArguments":[{"group":{"start":12,"value":"\"スケールアップ\"","children":[{"start":13,"value":"スケールアップ","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then I should see sleighs increase","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"And I should see letters being converted to presents","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"And the accumulated letters should decrease","stepMatchArguments":[]}]},
  {"pwTestLine":43,"pickleLine":39,"tags":[],"steps":[{"pwStepLine":44,"gherkinStepLine":40,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"And I have at least 3 sleighs active","stepMatchArguments":[{"group":{"start":16,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":46,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When I click the \"Start Letter Flood\" button","stepMatchArguments":[{"group":{"start":12,"value":"\"Start Letter Flood\"","children":[{"start":13,"value":"Start Letter Flood","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":47,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"And a letter comes into contact with a sleigh","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Then the letter should be converted to a present","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"And the present should appear with a sparkle effect","stepMatchArguments":[]}]},
]; // bdd-data-end