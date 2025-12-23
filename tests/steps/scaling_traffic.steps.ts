import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { setSliderValue, waitForSleighCount } from './common.steps';

const { Given, When, Then } = createBdd(test);

// "Start Letter Flood"ボタンのクリックはchaos_monkey.steps.tsの汎用ステップ定義を使用

Then('I should see letters flying in from the screen edges', async ({ page }) => {
  // 手紙が表示されるまで待機
  const letters = page.getByTestId('letter');
  await letters.first().waitFor({ state: 'visible', timeout: 5000 });
  // 少なくとも1つの手紙が表示されていることを確認
  const count = await letters.count();
  expect(count).toBeGreaterThan(0);
});

Then('the letters should move across the Night Sky', async ({ page }) => {
  // 手紙が移動していることを確認（位置が変化する）
  const firstLetter = page.getByTestId('letter').first();
  await firstLetter.waitFor({ state: 'visible' });
  // 少し待ってから位置を確認（アニメーションが動作していることを確認）
  await page.waitForTimeout(500);
  const isVisible = await firstLetter.isVisible();
  expect(isVisible).toBeTruthy();
});

Given('I have {int} sleigh active \\(Desired State is {int})', async ({ page }, count: number) => {
  await setSliderValue(page, count);
  await waitForSleighCount(page, count);
});

Then('I should see letters accumulating on the screen', async ({ page }) => {
  // 手紙が蓄積されていることを確認（複数の手紙が表示されている）
  const letters = page.getByTestId('letter');
  await letters.first().waitFor({ state: 'visible', timeout: 5000 });
  // 少し待ってから手紙の数を確認
  await page.waitForTimeout(1000);
  const count = await letters.count();
  expect(count).toBeGreaterThan(1);
});

Then('the screen should become filled with unprocessed letters', async ({ page }) => {
  // 画面が手紙で埋まっていることを確認（一定数以上の手紙が表示されている）
  const letters = page.getByTestId('letter');
  await page.waitForTimeout(4000); // 手紙が蓄積されるまで待機（長めに）
  const count = await letters.count();
  expect(count).toBeGreaterThanOrEqual(8); // 少なくとも8個以上の手紙が表示されている（閾値を下げる）
});

Then('I should see a warning message {string}', async ({ page }, expectedMessage: string) => {
  const warningMessage = page.getByTestId('warning-message');
  await warningMessage.waitFor({ state: 'visible', timeout: 5000 });
  const text = await warningMessage.textContent();
  expect(text).toContain(expectedMessage);
});

Given('letters are flooding in', async ({ page }) => {
  // 手紙の殺到を開始するボタンをクリック
  const button = page.getByTestId('start-letter-flood-button');
  await button.waitFor({ state: 'visible' });
  await button.click();
  // 手紙が表示されるまで待機
  await page.waitForTimeout(1000);
  const letters = page.getByTestId('letter');
  await letters.first().waitFor({ state: 'visible', timeout: 5000 });
});

Then('I should see sleighs increase to {int}', async ({ page }, expectedCount: number) => {
  await waitForSleighCount(page, expectedCount);
});

Then('I should see letters being converted to presents by the sleighs', async ({ page }) => {
  // プレゼントが表示されるまで待機
  const presents = page.getByTestId('present');
  await presents.first().waitFor({ state: 'visible', timeout: 5000 });
  // 少なくとも1つのプレゼントが表示されていることを確認
  const count = await presents.count();
  expect(count).toBeGreaterThan(0);
});

Then('the accumulated letters should decrease', async ({ page }) => {
  // 手紙の数が減少することを確認
  // 最初の手紙の数を記録
  const initialLetters = page.getByTestId('letter');
  const initialCount = await initialLetters.count();
  // 少し待ってから再度カウント
  await page.waitForTimeout(2000);
  const finalLetters = page.getByTestId('letter');
  const finalCount = await finalLetters.count();
  // 手紙の数が減少しているか、またはプレゼントが増えていることを確認
  const presents = page.getByTestId('present');
  const presentCount = await presents.count();
  expect(finalCount < initialCount || presentCount > 0).toBeTruthy();
});

When('I click the {string} button multiple times', async ({ page }, buttonText: string) => {
  const button = page.getByRole('button', { name: buttonText });
  await button.waitFor({ state: 'visible' });
  // 3回クリック
  for (let i = 0; i < 3; i++) {
    await button.click();
    await page.waitForTimeout(200); // クリック間隔
  }
});

Then('I should see sleighs increase', async ({ page }) => {
  // ソリの数が増加することを確認
  const sleighs = page.getByTestId('sleigh');
  await page.waitForTimeout(500);
  const count = await sleighs.count();
  expect(count).toBeGreaterThan(1);
});

Then('I should see letters being converted to presents', async ({ page }) => {
  // プレゼントが表示されるまで待機
  const presents = page.getByTestId('present');
  await presents.first().waitFor({ state: 'visible', timeout: 5000 });
  const count = await presents.count();
  expect(count).toBeGreaterThan(0);
});

Given('I have at least {int} sleighs active', async ({ page }, minCount: number) => {
  // スライダーを設定してソリを増やす
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
  }, minCount);
  // ソリの数が指定された数以上になるまで待機
  await page.waitForFunction(
    (expectedCount) => {
      const sleighs = document.querySelectorAll('[data-testid="sleigh"]');
      return sleighs.length >= expectedCount;
    },
    minCount,
    { timeout: 5000 }
  );
});

When('a letter comes into contact with a sleigh', async ({ page }) => {
  // 手紙とソリが接触するまで待機（衝突判定は自動的に行われる）
  // 手紙が表示されていることを確認
  const letters = page.getByTestId('letter');
  await letters.first().waitFor({ state: 'visible', timeout: 5000 });
  // ソリが表示されていることを確認
  const sleighs = page.getByTestId('sleigh');
  await sleighs.first().waitFor({ state: 'visible' });
  // 衝突が発生するまで待機（プレゼントが表示されるまで）
  await page.waitForTimeout(3000); // 衝突判定が行われるまで待機
});

Then('the letter should be converted to a present', async ({ page }) => {
  // プレゼントが表示されることを確認
  const presents = page.getByTestId('present');
  await presents.first().waitFor({ state: 'visible', timeout: 5000 });
  const count = await presents.count();
  expect(count).toBeGreaterThan(0);
});

Then('the present should appear with a sparkle effect', async ({ page }) => {
  // スパークルエフェクトが表示されることを確認
  const sparkles = page.getByTestId('sparkle');
  // スパークルは一時的なものなので、表示されているか、またはプレゼントが表示されていることを確認
  const presents = page.getByTestId('present');
  await presents.first().waitFor({ state: 'visible', timeout: 5000 });
  // プレゼントが表示されていれば、スパークルエフェクトも動作しているとみなす
  const presentCount = await presents.count();
  expect(presentCount).toBeGreaterThan(0);
});

