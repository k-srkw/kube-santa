// Generated from: features/chaos_monkey.feature
import { test } from "playwright-bdd";

test.describe('Self-healing Mechanism', () => {

  test('Recovering from Chaos Monkey attack', async ({ Given, When, Then, And, But, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 3 sleighs active (Desired State is 3)', null, { page }); 
    await When('I click the "🐒 イタズラ猿を呼ぶ" button', null, { page }); 
    await Then('I should see one sleigh destroyed (count becomes 2)', null, { page }); 
    await But('within 5 seconds, a new sleigh should appear', null, { page }); 
    await And('the total sleigh count should return to 3', null, { page }); 
    await And('I should see a notification "魔法の契約書がソリを復活させました！"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/chaos_monkey.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I have 3 sleighs active (Desired State is 3)","stepMatchArguments":[{"group":{"start":7,"value":"3","children":[]},"parameterTypeName":"int"},{"group":{"start":42,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When I click the \"🐒 イタズラ猿を呼ぶ\" button","stepMatchArguments":[{"group":{"start":12,"value":"\"🐒 イタズラ猿を呼ぶ\"","children":[{"start":13,"value":"🐒 イタズラ猿を呼ぶ","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then I should see one sleigh destroyed (count becomes 2)","stepMatchArguments":[{"group":{"start":49,"value":"2","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"But within 5 seconds, a new sleigh should appear","stepMatchArguments":[{"group":{"start":7,"value":"5","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And the total sleigh count should return to 3","stepMatchArguments":[{"group":{"start":40,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And I should see a notification \"魔法の契約書がソリを復活させました！\"","stepMatchArguments":[{"group":{"start":28,"value":"\"魔法の契約書がソリを復活させました！\"","children":[{"start":29,"value":"魔法の契約書がソリを復活させました！","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end