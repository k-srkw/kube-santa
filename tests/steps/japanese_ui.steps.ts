import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Then } = createBdd(test);

// 新しいステップ定義のみを追加（既存のステップは他のファイルで定義済み）

Then('I should see the slider label {string}', async ({ page }, expectedLabel: string) => {
  const label = page.getByText(expectedLabel);
  await expect(label).toBeVisible();
});

Then('I should see a button with text {string}', async ({ page }, buttonText: string) => {
  const button = page.getByRole('button', { name: buttonText });
  await expect(button).toBeVisible();
});

