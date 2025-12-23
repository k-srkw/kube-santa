// Generated from: features/load_balancing.feature
import { test } from "playwright-bdd";

test.describe('Load Balancing Visualization', () => {

  test('Letters are assigned to sleighs using load balancing', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have at least 3 sleighs active', null, { page }); 
    await When('letters are flooding in', null, { page }); 
    await Then('each letter should be assigned to a sleigh', null, { page }); 
    await And('letters should be distributed across all active sleighs', null, { page }); 
    await And('I should see letters moving toward their assigned sleigh', null, { page }); 
  });

  test('Load balancing distributes letters evenly', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 5 sleighs active', null, { page }); 
    await And('letters are flooding in', null, { page }); 
    await When('20 letters have been processed', null, { page }); 
    await Then('each sleigh should have processed approximately equal number of letters', null, { page }); 
    await And('I should see a load indicator showing the distribution', null, { page }); 
  });

  test('Load balancing adapts when sleighs are added', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 2 sleighs active', null, { page }); 
    await And('letters are flooding in', null, { page }); 
    await When('I scale up to 5 sleighs', null, { page }); 
    await Then('new letters should be distributed to all 5 sleighs', null, { page }); 
    await And('the load should be redistributed across all sleighs', null, { page }); 
  });

  test('Visual feedback shows load distribution', async ({ Given, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have at least 3 sleighs active', null, { page }); 
    await And('letters are flooding in', null, { page }); 
    await Then('I should see each sleigh\'s processing count displayed', null, { page }); 
    await And('I should see letters moving toward their assigned sleigh with a line or path', null, { page }); 
    await And('I should see a message from the Elf explaining load balancing', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/load_balancing.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I have at least 3 sleighs active","stepMatchArguments":[{"group":{"start":16,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When letters are flooding in","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then each letter should be assigned to a sleigh","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"And letters should be distributed across all active sleighs","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And I should see letters moving toward their assigned sleigh","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":14,"tags":[],"steps":[{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"And I have 5 sleighs active","stepMatchArguments":[{"group":{"start":7,"value":"5","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"And letters are flooding in","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When 20 letters have been processed","stepMatchArguments":[{"group":{"start":0,"value":"20","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":20,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then each sleigh should have processed approximately equal number of letters","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And I should see a load indicator showing the distribution","stepMatchArguments":[]}]},
  {"pwTestLine":24,"pickleLine":22,"tags":[],"steps":[{"pwStepLine":25,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"And I have 2 sleighs active","stepMatchArguments":[{"group":{"start":7,"value":"2","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":27,"gherkinStepLine":25,"keywordType":"Context","textWithKeyword":"And letters are flooding in","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"When I scale up to 5 sleighs","stepMatchArguments":[{"group":{"start":14,"value":"5","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":29,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then new letters should be distributed to all 5 sleighs","stepMatchArguments":[{"group":{"start":41,"value":"5","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":30,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"And the load should be redistributed across all sleighs","stepMatchArguments":[]}]},
  {"pwTestLine":33,"pickleLine":30,"tags":[],"steps":[{"pwStepLine":34,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":32,"keywordType":"Context","textWithKeyword":"And I have at least 3 sleighs active","stepMatchArguments":[{"group":{"start":16,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":36,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"And letters are flooding in","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then I should see each sleigh's processing count displayed","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"And I should see letters moving toward their assigned sleigh with a line or path","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"And I should see a message from the Elf explaining load balancing","stepMatchArguments":[]}]},
]; // bdd-data-end