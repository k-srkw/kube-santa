// Generated from: features/replicaset.feature
import { test } from "playwright-bdd";

test.describe('ReplicaSet Scaling', () => {

  test('Scaling Up (Increase Replicas)', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('the current sleigh count is 0', null, { page }); 
    await When('I move the "Desired State" slider to 3', null, { page }); 
    await Then('I should see 3 sleighs appear in the Night Sky', null, { page }); 
    await And('the status text should show "いて欲しいサンタさん: 3 / 今いるサンタさん: 3"', null, { page }); 
  });

  test('Scaling Down (Decrease Replicas)', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 5 sleighs active', null, { page }); 
    await When('I move the "Desired State" slider to 2', null, { page }); 
    await Then('I should see 3 sleighs disappear', null, { page }); 
    await And('only 2 sleighs should remain in the Night Sky', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/replicaset.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the current sleigh count is 0","stepMatchArguments":[{"group":{"start":28,"value":"0","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When I move the \"Desired State\" slider to 3","stepMatchArguments":[{"group":{"start":11,"value":"\"Desired State\"","children":[{"start":12,"value":"Desired State","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":37,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then I should see 3 sleighs appear in the Night Sky","stepMatchArguments":[{"group":{"start":13,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"And the status text should show \"いて欲しいサンタさん: 3 / 今いるサンタさん: 3\"","stepMatchArguments":[{"group":{"start":28,"value":"\"いて欲しいサンタさん: 3 / 今いるサンタさん: 3\"","children":[{"start":29,"value":"いて欲しいサンタさん: 3 / 今いるサンタさん: 3","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":14,"pickleLine":13,"tags":[],"steps":[{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"And I have 5 sleighs active","stepMatchArguments":[{"group":{"start":7,"value":"5","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When I move the \"Desired State\" slider to 2","stepMatchArguments":[{"group":{"start":11,"value":"\"Desired State\"","children":[{"start":12,"value":"Desired State","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":37,"value":"2","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then I should see 3 sleighs disappear","stepMatchArguments":[{"group":{"start":13,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And only 2 sleighs should remain in the Night Sky","stepMatchArguments":[{"group":{"start":5,"value":"2","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end