// Generated from: features/warning_logic_improvement.feature
import { test } from "playwright-bdd";

test.describe('Improved Warning Logic', () => {

  test('Warning when sleighs can be increased', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 3 sleighs active (Desired State is 3)', null, { page }); 
    await And('letters are flooding in', null, { page }); 
    await When('unprocessed letters exceed the threshold', null, { page }); 
    await Then('I should see a warning message "手紙が多すぎます！ソリを増やしてください"', null, { page }); 
    await And('the warning should suggest increasing sleighs', null, { page }); 
  });

  test('Dynamic threshold based on sleigh count', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 1 sleigh active (Desired State is 1)', null, { page }); 
    await And('letters are flooding in', null, { page }); 
    await When('unprocessed letters reach 15', null, { page }); 
    await Then('I should see a warning message', null, { page }); 
  });

  test('No warning with 5 sleighs', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 5 sleighs active (Desired State is 5)', null, { page }); 
    await And('letters are flooding in', null, { page }); 
    await When('I wait for a sufficient amount of time (e.g., 10 seconds)', null, { page }); 
    await Then('I should NOT see a warning message', null, { page }); 
    await And('the system should remain stable (no warning appears)', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/warning_logic_improvement.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I have 3 sleighs active (Desired State is 3)","stepMatchArguments":[{"group":{"start":7,"value":"3","children":[]},"parameterTypeName":"int"},{"group":{"start":42,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And letters are flooding in","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When unprocessed letters exceed the threshold","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then I should see a warning message \"手紙が多すぎます！ソリを増やしてください\"","stepMatchArguments":[{"group":{"start":31,"value":"\"手紙が多すぎます！ソリを増やしてください\"","children":[{"start":32,"value":"手紙が多すぎます！ソリを増やしてください","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And the warning should suggest increasing sleighs","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":14,"tags":[],"steps":[{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"And I have 1 sleigh active (Desired State is 1)","stepMatchArguments":[{"group":{"start":7,"value":"1","children":[]},"parameterTypeName":"int"},{"group":{"start":41,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"And letters are flooding in","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When unprocessed letters reach 15","stepMatchArguments":[{"group":{"start":26,"value":"15","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":20,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then I should see a warning message","stepMatchArguments":[]}]},
  {"pwTestLine":23,"pickleLine":21,"tags":[],"steps":[{"pwStepLine":24,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"And I have 5 sleighs active (Desired State is 5)","stepMatchArguments":[{"group":{"start":7,"value":"5","children":[]},"parameterTypeName":"int"},{"group":{"start":42,"value":"5","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":26,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"And letters are flooding in","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"When I wait for a sufficient amount of time (e.g., 10 seconds)","stepMatchArguments":[{"group":{"start":46,"value":"10","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":28,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then I should NOT see a warning message","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And the system should remain stable (no warning appears)","stepMatchArguments":[]}]},
]; // bdd-data-end