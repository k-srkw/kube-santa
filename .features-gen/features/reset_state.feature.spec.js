// Generated from: features/reset_state.feature
import { test } from "playwright-bdd";

test.describe('State Reset', () => {

  test('Reset sleigh count to zero', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 5 sleighs active (Desired State is 5)', null, { page }); 
    await When('I click the "リセット" button', null, { page }); 
    await Then('the sleigh count should be reset to 0', null, { page }); 
    await And('the status text should show "いて欲しいサンタさん: 0 / 今いるサンタさん: 0"', null, { page }); 
    await And('I should see 0 sleighs in the Night Sky', null, { page }); 
  });

  test('Reset letter flood state', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('letters are flooding in', null, { page }); 
    await When('I click the "リセット" button', null, { page }); 
    await Then('the letter flood should stop', null, { page }); 
    await And('I should see no letters on the screen', null, { page }); 
    await And('the "手紙の殺到を開始" button should be enabled again', null, { page }); 
  });

  test('Reset all states at once', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 3 sleighs active (Desired State is 3)', null, { page }); 
    await And('letters are flooding in', null, { page }); 
    await When('I click the "リセット" button', null, { page }); 
    await Then('the sleigh count should be reset to 0', null, { page }); 
    await And('the letter flood should stop', null, { page }); 
    await And('I should see no letters on the screen', null, { page }); 
    await And('I should see 0 sleighs in the Night Sky', null, { page }); 
    await And('the status text should show "いて欲しいサンタさん: 0 / 今いるサンタさん: 0"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/reset_state.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I have 5 sleighs active (Desired State is 5)","stepMatchArguments":[{"group":{"start":7,"value":"5","children":[]},"parameterTypeName":"int"},{"group":{"start":42,"value":"5","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When I click the \"リセット\" button","stepMatchArguments":[{"group":{"start":12,"value":"\"リセット\"","children":[{"start":13,"value":"リセット","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then the sleigh count should be reset to 0","stepMatchArguments":[{"group":{"start":36,"value":"0","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"And the status text should show \"いて欲しいサンタさん: 0 / 今いるサンタさん: 0\"","stepMatchArguments":[{"group":{"start":28,"value":"\"いて欲しいサンタさん: 0 / 今いるサンタさん: 0\"","children":[{"start":29,"value":"いて欲しいサンタさん: 0 / 今いるサンタさん: 0","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And I should see 0 sleighs in the Night Sky","stepMatchArguments":[{"group":{"start":13,"value":"0","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":15,"pickleLine":14,"tags":[],"steps":[{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"And letters are flooding in","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When I click the \"リセット\" button","stepMatchArguments":[{"group":{"start":12,"value":"\"リセット\"","children":[{"start":13,"value":"リセット","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then the letter flood should stop","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And I should see no letters on the screen","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And the \"手紙の殺到を開始\" button should be enabled again","stepMatchArguments":[{"group":{"start":4,"value":"\"手紙の殺到を開始\"","children":[{"start":5,"value":"手紙の殺到を開始","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":24,"pickleLine":22,"tags":[],"steps":[{"pwStepLine":25,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"And I have 3 sleighs active (Desired State is 3)","stepMatchArguments":[{"group":{"start":7,"value":"3","children":[]},"parameterTypeName":"int"},{"group":{"start":42,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":27,"gherkinStepLine":25,"keywordType":"Context","textWithKeyword":"And letters are flooding in","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"When I click the \"リセット\" button","stepMatchArguments":[{"group":{"start":12,"value":"\"リセット\"","children":[{"start":13,"value":"リセット","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":29,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then the sleigh count should be reset to 0","stepMatchArguments":[{"group":{"start":36,"value":"0","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":30,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"And the letter flood should stop","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"And I should see no letters on the screen","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And I should see 0 sleighs in the Night Sky","stepMatchArguments":[{"group":{"start":13,"value":"0","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":33,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And the status text should show \"いて欲しいサンタさん: 0 / 今いるサンタさん: 0\"","stepMatchArguments":[{"group":{"start":28,"value":"\"いて欲しいサンタさん: 0 / 今いるサンタさん: 0\"","children":[{"start":29,"value":"いて欲しいサンタさん: 0 / 今いるサンタさん: 0","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end