import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

When('I increase the sleigh count from {int} to {int}', async ({ page }, fromCount: number, toCount: number) => {
  // まず、スライダーをfromCountに設定
  const slider = page.getByTestId('desired-state-slider');
  await slider.waitFor({ state: 'visible' });
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
  }, fromCount);
  
  // ソリの数がfromCountになるまで待機
  await page.waitForFunction(
    (expectedCount) => {
      const sleighs = document.querySelectorAll('[data-testid="sleigh"]');
      return sleighs.length === expectedCount;
    },
    fromCount,
    { timeout: 5000 }
  );
  
  // 次に、スライダーをtoCountに設定
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
  }, toCount);
  
  // ソリの数が更新されるまで待機
  await page.waitForTimeout(500);
});

Then('I should see a message from the Elf saying {string}', async ({ page }, expectedMessage: string) => {
  // エルフの吹き出しを待機
  const elfMessage = page.getByTestId('elf-message');
  await elfMessage.waitFor({ state: 'visible', timeout: 5000 });
  // メッセージの内容を確認
  const actualText = await elfMessage.textContent();
  expect(actualText).toContain(expectedMessage);
});

Given('the Chaos Monkey has destroyed a sleigh', async ({ page }) => {
  // まず、ソリを3つ用意
  const slider = page.getByTestId('desired-state-slider');
  await slider.waitFor({ state: 'visible' });
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
  }, 3);
  
  // ソリの数が3になるまで待機
  await page.waitForFunction(
    (expectedCount) => {
      const sleighs = document.querySelectorAll('[data-testid="sleigh"]');
      return sleighs.length === expectedCount;
    },
    3,
    { timeout: 5000 }
  );
  
  // Chaos Monkeyボタンをクリック
  const chaosButton = page.getByTestId('chaos-monkey-button');
  await chaosButton.waitFor({ state: 'visible' });
  await chaosButton.click();
  
  // ソリが1つ減るまで待機
  await page.waitForFunction(
    (expectedCount) => {
      const sleighs = document.querySelectorAll('[data-testid="sleigh"]');
      return sleighs.length === expectedCount;
    },
    2,
    { timeout: 2000 }
  );
});

When('the system automatically restores the sleigh', async ({ page }) => {
  // ソリが自動的に復活するまで待機（最大6秒）
  await page.waitForFunction(
    () => {
      const sleighs = document.querySelectorAll('[data-testid="sleigh"]');
      return sleighs.length === 3;
    },
    { timeout: 6000 }
  );
});

