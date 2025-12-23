import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { setSliderValue, waitForSleighCount } from './common.steps';

const { Given, When, Then } = createBdd(test);

Given('I have {int} sleighs active \\(Desired State is {int})', async ({ page }, sleighCount: number, desiredState: number) => {
  // ページが読み込まれるまで待機
  await page.waitForLoadState('networkidle');
  await setSliderValue(page, desiredState);
  await waitForSleighCount(page, sleighCount);
});

When('I click the {string} button', async ({ page }, buttonText: string) => {
  // ボタンのテキストに基づいて適切なtestidを選択
  if (buttonText.includes('イタズラ猿') || buttonText.includes('Chaos Monkey')) {
    const button = page.getByTestId('chaos-monkey-button');
    await button.waitFor({ state: 'visible' });
    await button.click();
  } else if (buttonText.includes('Start Letter Flood') || buttonText.includes('手紙の殺到')) {
    const button = page.getByTestId('start-letter-flood-button');
    await button.waitFor({ state: 'visible' });
    await button.click();
    // 手紙が表示されるまで少し待機
    await page.waitForTimeout(1000);
  } else if (buttonText.includes('スケールアップ') || buttonText.includes('scale-up')) {
    const button = page.getByTestId('scale-up-button');
    await button.waitFor({ state: 'visible' });
    await button.click();
  } else if (buttonText.includes('リセット') || buttonText.includes('Reset')) {
    const button = page.getByTestId('reset-button');
    // ボタンが表示され、クリック可能になるまで待機
    await button.waitFor({ state: 'visible', timeout: 10000 });
    await button.waitFor({ state: 'attached', timeout: 10000 });
    // ボタンが有効になっていることを確認
    await expect(button).toBeEnabled({ timeout: 5000 });
    // ボタンがクリック可能になるまで少し待機
    await page.waitForTimeout(500);
    // ボタンをビューポートにスクロール
    await button.scrollIntoViewIfNeeded();
    // ボタンがクリック可能か確認（他の要素に隠れていないか）
    const isVisible = await button.isVisible();
    if (!isVisible) {
      throw new Error('Reset button is not visible');
    }
    // クリック実行（JavaScriptの直接実行も試す）
    try {
      await button.click({ timeout: 10000 });
    } catch (error) {
      // 通常のクリックが失敗した場合、JavaScriptで直接クリック
      await button.evaluate((el: HTMLElement) => {
        (el as HTMLButtonElement).click();
      });
    }
    // クリック後に状態が更新されるまで待機（Reactの状態更新を待つ）
    await page.waitForTimeout(1000);
  } else {
    // その他のボタンは汎用的に処理
    const button = page.getByRole('button', { name: buttonText });
    await button.waitFor({ state: 'visible' });
    await button.click();
  }
});

Then('I should see one sleigh destroyed \\(count becomes {int})', async ({ page }, expectedCount: number) => {
  await waitForSleighCount(page, expectedCount, 2000);
});

Then('within {int} seconds, a new sleigh should appear', async ({ page }, maxSeconds: number) => {
  // ソリが1つ増えるまで待機（最大指定秒数）
  const startTime = Date.now();
  const timeout = maxSeconds * 1000;
  
  await page.waitForFunction(
    ({ startTime, timeout }) => {
      const sleighs = document.querySelectorAll('[data-testid="sleigh"]');
      const elapsed = Date.now() - startTime;
      // ソリが増えたか、またはタイムアウトに達したか
      return sleighs.length > 2 || elapsed >= timeout;
    },
    { startTime, timeout },
    { timeout: timeout + 1000 }
  );
  
  // ソリが実際に増えていることを確認
  const sleighs = page.getByTestId('sleigh');
  const count = await sleighs.count();
  expect(count).toBeGreaterThan(2);
});

Then('the total sleigh count should return to {int}', async ({ page }, expectedCount: number) => {
  await waitForSleighCount(page, expectedCount, 6000);
});

Then('I should see a notification {string}', async ({ page }, expectedText: string) => {
  // 通知が表示されるまで待機
  const notification = page.getByTestId('notification');
  await notification.waitFor({ state: 'visible', timeout: 6000 });
  // 通知テキストに絵文字が含まれる可能性があるため、部分一致でチェック
  const actualText = await notification.textContent();
  expect(actualText).toContain(expectedText);
});

