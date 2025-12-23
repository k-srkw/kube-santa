// Generated from: features/letter_queue_visualization.feature
import { test } from "playwright-bdd";

test.describe('Letter Queue Visualization', () => {

  test('Letters accumulate in queue when processing capacity is full', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 1 sleigh active (Desired State is 1)', null, { page }); 
    await And('letters are flooding in', null, { page }); 
    await When('the sleigh is processing 5 letters (maximum capacity)', null, { page }); 
    await And('more letters arrive at the sleigh', null, { page }); 
    await Then('the new letters should be added to the queue', null, { page }); 
    await And('the queued letters should remain visible on the screen', null, { page }); 
    await And('the queued letters should accumulate near the sleigh', null, { page }); 
  });

  test('Queued letters are processed when capacity becomes available', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 1 sleigh active (Desired State is 1)', null, { page }); 
    await And('letters are flooding in', null, { page }); 
    await And('the sleigh is processing 5 letters (maximum capacity)', null, { page }); 
    await And('there are letters waiting in the queue', null, { page }); 
    await When('one letter finishes processing', null, { page }); 
    await Then('the next letter from the queue should start processing', null, { page }); 
    await And('the queued letters should decrease', null, { page }); 
  });

  test('Multiple sleighs have independent queues', async ({ Given, When, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await And('I have 3 sleighs active (Desired State is 3)', null, { page }); 
    await And('letters are flooding in', null, { page }); 
    await When('each sleigh reaches its maximum processing capacity', null, { page }); 
    await Then('each sleigh should have its own queue of waiting letters', null, { page }); 
    await And('the queued letters should accumulate near their respective sleighs', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/letter_queue_visualization.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I have 1 sleigh active (Desired State is 1)","stepMatchArguments":[{"group":{"start":7,"value":"1","children":[]},"parameterTypeName":"int"},{"group":{"start":41,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And letters are flooding in","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When the sleigh is processing 5 letters (maximum capacity)","stepMatchArguments":[{"group":{"start":25,"value":"5","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And more letters arrive at the sleigh","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the new letters should be added to the queue","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And the queued letters should remain visible on the screen","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And the queued letters should accumulate near the sleigh","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":16,"tags":[],"steps":[{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"And I have 1 sleigh active (Desired State is 1)","stepMatchArguments":[{"group":{"start":7,"value":"1","children":[]},"parameterTypeName":"int"},{"group":{"start":41,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":20,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"And letters are flooding in","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"And the sleigh is processing 5 letters (maximum capacity)","stepMatchArguments":[{"group":{"start":25,"value":"5","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":22,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"And there are letters waiting in the queue","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When one letter finishes processing","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then the next letter from the queue should start processing","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And the queued letters should decrease","stepMatchArguments":[]}]},
  {"pwTestLine":28,"pickleLine":26,"tags":[],"steps":[{"pwStepLine":29,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"And I have 3 sleighs active (Desired State is 3)","stepMatchArguments":[{"group":{"start":7,"value":"3","children":[]},"parameterTypeName":"int"},{"group":{"start":42,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":31,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"And letters are flooding in","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When each sleigh reaches its maximum processing capacity","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then each sleigh should have its own queue of waiting letters","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"And the queued letters should accumulate near their respective sleighs","stepMatchArguments":[]}]},
]; // bdd-data-end