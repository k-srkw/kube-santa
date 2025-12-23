import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { waitForSleighCount } from './common.steps';

const { Then } = createBdd(test);

Then('the sleigh count should be reset to {int}', async ({ page }, expectedCount: number) => {
  // ソリの数が指定された数になるまで待機
  // リセット後は少し待機してから確認
  await page.waitForTimeout(500);
  
  // ステータステキストが更新されるまで待機（desiredStateが更新されたことを確認）
  if (expectedCount === 0) {
    const statusText = page.getByTestId('status-text');
    // ステータステキストが「いて欲しいサンタさん: 0」を含むまで待機（desiredStateが0になったことを確認）
    await expect(statusText).toContainText('いて欲しいサンタさん: 0', { timeout: 10000 });
    // さらに「今いるサンタさん: 0」も含むまで待機（podsが0になったことを確認）
    await expect(statusText).toContainText('今いるサンタさん: 0', { timeout: 10000 });
  }
  
  // ソリの数を直接確認
  const sleighs = page.getByTestId('sleigh');
  // ソリの数が期待値になるまで待機
  await expect(sleighs).toHaveCount(expectedCount, { timeout: 5000 });
});

Then('I should see {int} sleighs in the Night Sky', async ({ page }, expectedCount: number) => {
  await waitForSleighCount(page, expectedCount);
});

Then('the letter flood should stop', async ({ page }) => {
  // 手紙の殺到が停止していることを確認（手紙が生成されなくなる）
  const initialCount = await page.getByTestId('letter').count();
  // 少し待ってから再度カウント（手紙が増えていないことを確認）
  await page.waitForTimeout(2000);
  const finalCount = await page.getByTestId('letter').count();
  // 手紙の数が増えていない、または減っていることを確認
  expect(finalCount).toBeLessThanOrEqual(initialCount);
  // 手紙の殺到開始ボタンが有効になっていることを確認
  const button = page.getByTestId('start-letter-flood-button');
  await expect(button).toBeEnabled();
});

Then('I should see no letters on the screen', async ({ page }) => {
  // 手紙が表示されていないことを確認
  await page.waitForTimeout(1000); // 手紙がクリアされるまで待機
  const letters = page.getByTestId('letter');
  const count = await letters.count();
  expect(count).toBe(0);
});

Then('the {string} button should be enabled again', async ({ page }, buttonText: string) => {
  // ボタンが有効になっていることを確認
  if (buttonText.includes('手紙の殺到') || buttonText.includes('Start Letter Flood')) {
    const button = page.getByTestId('start-letter-flood-button');
    await expect(button).toBeEnabled();
  } else {
    const button = page.getByRole('button', { name: buttonText });
    await expect(button).toBeEnabled();
  }
});

