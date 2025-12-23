import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';

const { Given, Then } = createBdd(test);

Given('I open the app', async ({ page }) => {
  await page.goto('/');
});

Then('I should see {string}', async ({ page }, text: string) => {
  await page.getByText(text).first().waitFor();
});

