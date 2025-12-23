// Generated from: features/foundation.feature
import { test } from "playwright-bdd";

test.describe('Application Layout', () => {

  test('Initial Load', async ({ Given, Then, And, page }) => { 
    await Given('I open the Kube Santa application', null, { page }); 
    await Then('I should see the header with title "🎅 Kube Santa - プレゼント戦略"', null, { page }); 
    await And('I should see the "Night Sky" area (Cluster)', null, { page }); 
    await And('I should see the "Control Panel" area at the bottom', null, { page }); 
    await And('the background of the Night Sky should be dark blue', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/foundation.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I open the Kube Santa application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then I should see the header with title \"🎅 Kube Santa - プレゼント戦略\"","stepMatchArguments":[{"group":{"start":35,"value":"\"🎅 Kube Santa - プレゼント戦略\"","children":[{"start":36,"value":"🎅 Kube Santa - プレゼント戦略","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"And I should see the \"Night Sky\" area (Cluster)","stepMatchArguments":[{"group":{"start":17,"value":"\"Night Sky\"","children":[{"start":18,"value":"Night Sky","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"And I should see the \"Control Panel\" area at the bottom","stepMatchArguments":[{"group":{"start":17,"value":"\"Control Panel\"","children":[{"start":18,"value":"Control Panel","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"And the background of the Night Sky should be dark blue","stepMatchArguments":[]}]},
]; // bdd-data-end