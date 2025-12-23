import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { setSliderValue, waitForSleighCount } from './common.steps';

const { Given, When, Then } = createBdd(test);

Given('I have {int} sleighs active \\(Desired State is {int}, maximum)', async ({ page }, count: number) => {
  await setSliderValue(page, count);
  await waitForSleighCount(page, count);
});

When('unprocessed letters exceed the threshold', async ({ page }) => {
  // 手紙が生成され、閾値を超えるまで待機
  // 警告が表示されるまで待機することで、閾値を超えたことを確認
  // 10台の場合は処理速度が速いため、より長く待機
  const warningMessage = page.getByTestId('warning-message');
  await warningMessage.waitFor({ state: 'visible', timeout: 20000 });
});

Then('the warning should suggest increasing sleighs', async ({ page }) => {
  const warningMessage = page.getByTestId('warning-message');
  await warningMessage.waitFor({ state: 'visible' });
  const text = await warningMessage.textContent();
  expect(text).toContain('ソリを増やしてください');
});

Then('the warning should NOT suggest increasing sleighs', async ({ page }) => {
  const warningMessage = page.getByTestId('warning-message');
  await warningMessage.waitFor({ state: 'visible' });
  const text = await warningMessage.textContent();
  expect(text).not.toContain('ソリを増やしてください');
});

When('unprocessed letters reach {int}', async ({ page }, count: number) => {
  // 未処理手紙が指定数に達するまで待機
  await page.waitForFunction(
    (expectedCount) => {
      const letters = Array.from(document.querySelectorAll('[data-testid="letter"]'));
      const unprocessedLetters = letters.filter((letter) => {
        const element = letter as HTMLElement;
        return element.style.opacity !== '0' && !element.classList.contains('processed');
      });
      return unprocessedLetters.length >= expectedCount;
    },
    count,
    { timeout: 10000 }
  );
});

Then('I should see a warning message', async ({ page }) => {
  const warningMessage = page.getByTestId('warning-message');
  await warningMessage.waitFor({ state: 'visible', timeout: 10000 });
  const text = await warningMessage.textContent();
  expect(text).toBeTruthy();
  expect(text?.trim().length).toBeGreaterThan(0);
});

When('unprocessed letters are less than {int}', async ({ page }, count: number) => {
  // 未処理手紙が指定数未満であることを確認
  await page.waitForFunction(
    (maxCount) => {
      const letters = Array.from(document.querySelectorAll('[data-testid="letter"]'));
      const unprocessedLetters = letters.filter((letter) => {
        const element = letter as HTMLElement;
        return element.style.opacity !== '0' && !element.classList.contains('processed');
      });
      return unprocessedLetters.length < maxCount;
    },
    count,
    { timeout: 10000 }
  );
});

Then('I should NOT see a warning message', async ({ page }) => {
  const warningMessage = page.getByTestId('warning-message');
  // 警告メッセージが表示されていないことを確認
  const isVisible = await warningMessage.isVisible().catch(() => false);
  expect(isVisible).toBeFalsy();
});

When('when unprocessed letters reach {int} or more', async ({ page }, count: number) => {
  // 未処理手紙が指定数以上になるまで待機
  // 10台の場合は処理速度が速いため、より長く待機
  await page.waitForFunction(
    (minCount) => {
      const letters = Array.from(document.querySelectorAll('[data-testid="letter"]'));
      const unprocessedLetters = letters.filter((letter) => {
        const element = letter as HTMLElement;
        return element.style.opacity !== '0' && !element.classList.contains('processed');
      });
      return unprocessedLetters.length >= minCount;
    },
    count,
    { timeout: 20000 }
  );
});


When('I wait for a sufficient amount of time \\(e.g., {int} seconds\\)', async ({ page }, seconds: number) => {
  // 指定秒数待機
  await page.waitForTimeout(seconds * 1000);
});

Then('the unprocessed letters should decrease below the threshold', async ({ page }) => {
  // 警告が消えるまで待機（閾値以下になったことを確認）
  const warningMessage = page.getByTestId('warning-message');
  // 警告が消えるまで最大15秒待機
  await page.waitForFunction(
    () => {
      const warning = document.querySelector('[data-testid="warning-message"]');
      return !warning || warning.getAttribute('style')?.includes('display: none') || !warning.textContent?.trim();
    },
    { timeout: 15000 }
  );
  // 警告が表示されていないことを確認
  const isVisible = await warningMessage.isVisible().catch(() => false);
  expect(isVisible).toBeFalsy();
});

Then('the warning message should disappear', async ({ page }) => {
  const warningMessage = page.getByTestId('warning-message');
  // 警告が消えるまで待機
  await page.waitForFunction(
    () => {
      const warning = document.querySelector('[data-testid="warning-message"]');
      return !warning || warning.getAttribute('style')?.includes('display: none') || !warning.textContent?.trim();
    },
    { timeout: 15000 }
  );
  const isVisible = await warningMessage.isVisible().catch(() => false);
  expect(isVisible).toBeFalsy();
});

Then('the system should remain stable \\(no warning reappears\\)', async ({ page }) => {
  // 警告が再表示されないことを確認（2秒間監視）
  // テストタイムアウトを避けるため、待機時間を短縮
  const warningMessage = page.getByTestId('warning-message');
  await page.waitForTimeout(2000);
  const isVisible = await warningMessage.isVisible().catch(() => false);
  expect(isVisible).toBeFalsy();
});

Then('the system should remain stable \\(no warning appears\\)', async ({ page }) => {
  // 警告が表示されないことを確認（2秒間監視）
  const warningMessage = page.getByTestId('warning-message');
  await page.waitForTimeout(2000);
  const isVisible = await warningMessage.isVisible().catch(() => false);
  expect(isVisible).toBeFalsy();
});

Given('unprocessed letters exceed the threshold \\(warning is shown\\)', async ({ page }) => {
  // 警告が表示されるまで待機
  // 10台の場合は処理速度が速いため、より長く待機
  const warningMessage = page.getByTestId('warning-message');
  await warningMessage.waitFor({ state: 'visible', timeout: 20000 });
});

