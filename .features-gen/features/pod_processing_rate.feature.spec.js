// Generated from: features/pod_processing_rate.feature
import { test } from "playwright-bdd";

test.describe('Pod Maximum Processing Limit', () => {

  test('Single sleigh processes up to 5 letters at a time', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 1 sleigh active (Desired State is 1)', null, { page }); 
    await And('letters are flooding in', null, { page }); 
    await When('I wait for a sufficient amount of time', null, { page }); 
    await Then('the sleigh should process letters one by one', null, { page }); 
    await And('the sleigh should process at most 5 letters simultaneously', null, { page }); 
    await And('once a letter is processed, the next letter should be processed', null, { page }); 
  });

  test('Multiple sleighs process letters independently', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 3 sleighs active (Desired State is 3)', null, { page }); 
    await And('letters are flooding in', null, { page }); 
    await When('I wait for a sufficient amount of time', null, { page }); 
    await Then('each sleigh should process at most 5 letters simultaneously', null, { page }); 
    await And('the total processing capacity should be 15 letters (3 sleighs × 5 letters)', null, { page }); 
  });

  test('Processing continues when letters are completed', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 1 sleigh active (Desired State is 1)', null, { page }); 
    await And('letters are flooding in', null, { page }); 
    await When('I wait for a sufficient amount of time', null, { page }); 
    await Then('the sleigh should continuously process letters', null, { page }); 
    await And('the number of letters being processed should not exceed 5 at any time', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/pod_processing_rate.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I have 1 sleigh active (Desired State is 1)","stepMatchArguments":[{"group":{"start":7,"value":"1","children":[]},"parameterTypeName":"int"},{"group":{"start":41,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And letters are flooding in","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I wait for a sufficient amount of time","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then the sleigh should process letters one by one","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And the sleigh should process at most 5 letters simultaneously","stepMatchArguments":[{"group":{"start":34,"value":"5","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And once a letter is processed, the next letter should be processed","stepMatchArguments":[]}]},
  {"pwTestLine":16,"pickleLine":15,"tags":[],"steps":[{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"And I have 3 sleighs active (Desired State is 3)","stepMatchArguments":[{"group":{"start":7,"value":"3","children":[]},"parameterTypeName":"int"},{"group":{"start":42,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"And letters are flooding in","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When I wait for a sufficient amount of time","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then each sleigh should process at most 5 letters simultaneously","stepMatchArguments":[{"group":{"start":35,"value":"5","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":22,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And the total processing capacity should be 15 letters (3 sleighs × 5 letters)","stepMatchArguments":[{"group":{"start":40,"value":"15","children":[]},"parameterTypeName":"int"},{"group":{"start":52,"value":"3","children":[]},"parameterTypeName":"int"},{"group":{"start":64,"value":"5","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":25,"pickleLine":23,"tags":[],"steps":[{"pwStepLine":26,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":25,"keywordType":"Context","textWithKeyword":"And I have 1 sleigh active (Desired State is 1)","stepMatchArguments":[{"group":{"start":7,"value":"1","children":[]},"parameterTypeName":"int"},{"group":{"start":41,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":28,"gherkinStepLine":26,"keywordType":"Context","textWithKeyword":"And letters are flooding in","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"When I wait for a sufficient amount of time","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Then the sleigh should continuously process letters","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"And the number of letters being processed should not exceed 5 at any time","stepMatchArguments":[{"group":{"start":56,"value":"5","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end