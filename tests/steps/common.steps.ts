import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect, Page } from '@playwright/test';

const { Given } = createBdd(test);

/**
 * スライダーの値を設定する共通ヘルパー関数
 */
export async function setSliderValue(page: Page, value: number): Promise<void> {
  const slider = page.getByTestId('desired-state-slider');
  await slider.waitFor({ state: 'visible', timeout: 10000 });
  await slider.evaluate((el: HTMLInputElement, val: number) => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    )?.set;
    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(el, val.toString());
    }
    const event = new Event('input', { bubbles: true });
    el.dispatchEvent(event);
    const changeEvent = new Event('change', { bubbles: true });
    el.dispatchEvent(changeEvent);
  }, value);
}

/**
 * ソリの数が指定された数になるまで待機する共通ヘルパー関数
 */
export async function waitForSleighCount(page: Page, expectedCount: number, timeout = 5000): Promise<void> {
  await page.waitForFunction(
    (expectedCount) => {
      const sleighs = document.querySelectorAll('[data-testid="sleigh"]');
      return sleighs.length === expectedCount;
    },
    expectedCount,
    { timeout }
  );
  const sleighs = page.getByTestId('sleigh');
  await expect(sleighs).toHaveCount(expectedCount);
}

Given('I am at the Operation Center', async ({ page }) => {
  await page.goto('/');
});

