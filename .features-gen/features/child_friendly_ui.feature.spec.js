// Generated from: features/child_friendly_ui.feature
import { test } from "playwright-bdd";

test.describe('Child-Friendly UI Text', () => {

  test('Header text is child-friendly', async ({ Given, Then, page }) => { 
    await Given('I open the Kube Santa application', null, { page }); 
    await Then('I should see the header with title "🎅 Kube Santa - プレゼント戦略"', null, { page }); 
  });

  test('Slider label is child-friendly', async ({ Given, Then, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await Then('I should see the slider label "サンタさん (Pod) の数"', null, { page }); 
  });

  test('Status text is child-friendly', async ({ Given, Then, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await Then('the status text should show "いて欲しいサンタさん: 0 / 今いるサンタさん: 0"', null, { page }); 
  });

  test('All UI text is understandable for children', async ({ Given, Then, And, page }) => { 
    await Given('I am at the Operation Center', null, { page }); 
    await Then('I should not see difficult technical terms in the main UI', null, { page }); 
    await And('all labels should use simple Japanese words that children can understand', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/child_friendly_ui.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I open the Kube Santa application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then I should see the header with title \"🎅 Kube Santa - プレゼント戦略\"","stepMatchArguments":[{"group":{"start":35,"value":"\"🎅 Kube Santa - プレゼント戦略\"","children":[{"start":36,"value":"🎅 Kube Santa - プレゼント戦略","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":11,"pickleLine":10,"tags":[],"steps":[{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then I should see the slider label \"サンタさん (Pod) の数\"","stepMatchArguments":[{"group":{"start":30,"value":"\"サンタさん (Pod) の数\"","children":[{"start":31,"value":"サンタさん (Pod) の数","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":16,"pickleLine":14,"tags":[],"steps":[{"pwStepLine":17,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then the status text should show \"いて欲しいサンタさん: 0 / 今いるサンタさん: 0\"","stepMatchArguments":[{"group":{"start":28,"value":"\"いて欲しいサンタさん: 0 / 今いるサンタさん: 0\"","children":[{"start":29,"value":"いて欲しいサンタさん: 0 / 今いるサンタさん: 0","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":21,"pickleLine":18,"tags":[],"steps":[{"pwStepLine":22,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given I am at the Operation Center","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then I should not see difficult technical terms in the main UI","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And all labels should use simple Japanese words that children can understand","stepMatchArguments":[]}]},
]; // bdd-data-end