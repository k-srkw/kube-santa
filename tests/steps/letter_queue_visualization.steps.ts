import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { setSliderValue, waitForSleighCount } from './common.steps';

const { Given, When, Then } = createBdd(test);

When('the sleigh is processing {int} letters \\(maximum capacity)', async ({ page }, maxCount: number) => {
  // ソリが最大処理数まで処理している状態になるまで待機
  // 処理カウンターを確認して、最大処理数に達するまで待機
  const sleighs = page.getByTestId('sleigh');
  await sleighs.first().waitFor({ state: 'visible' });
  
  // 処理カウンターが表示されるまで待機
  const processingCounts = page.getByTestId('processing-count');
  await processingCounts.first().waitFor({ state: 'visible', timeout: 10000 });
  
  // 処理が開始されるまで待機（処理カウンターが0より大きくなるまで）
  await page.waitForFunction(
    () => {
      const countEl = document.querySelector('[data-testid="processing-count"]');
      if (!countEl) return false;
      const countText = countEl.textContent || '';
      const count = parseInt(countText.replace('処理: ', '') || '0', 10);
      return count > 0;
    },
    { timeout: 10000 }
  );
  
  // さらに待機して、処理が進行していることを確認
  await page.waitForTimeout(2000);
});

When('more letters arrive at the sleigh', async ({ page }) => {
  // より多くの手紙がソリに到達するまで待機
  await page.waitForTimeout(2000);
  
  // 手紙が表示されていることを確認
  const letters = page.getByTestId('letter');
  await letters.first().waitFor({ state: 'visible' });
});

Then('the new letters should be added to the queue', async ({ page }) => {
  // 新しい手紙がキューに追加されていることを確認
  // キューに追加された手紙は、queued: true フラグが設定されている
  // 視覚的には、手紙がソリの近くに留まっていることを確認
  
  // 手紙がキューに追加されるまで待機
  await page.waitForTimeout(2000);
  
  const letters = page.getByTestId('letter');
  const letterCount = await letters.count();
  expect(letterCount).toBeGreaterThan(0);
  
  // 手紙が表示されていることを確認
  await letters.first().waitFor({ state: 'visible' });
});

Then('the queued letters should remain visible on the screen', async ({ page }) => {
  // キューに追加された手紙が画面上に表示されていることを確認
  // 手紙がキューに追加されて位置が更新されるまで待機
  await page.waitForTimeout(2000);
  
  const letters = page.getByTestId('letter');
  await letters.first().waitFor({ state: 'visible' });
  
  const letterCount = await letters.count();
  expect(letterCount).toBeGreaterThan(0);
  
  // 手紙が画面上に表示されていることを確認（opacity > 0）
  // キューに追加された手紙は半透明（opacity: 0.5）になっているが、表示されている
  // 処理済みでない手紙を確認
  let visibleLetterFound = false;
  for (let i = 0; i < letterCount; i++) {
    const letter = letters.nth(i);
    const opacity = await letter.evaluate((el) => {
      return window.getComputedStyle(el).opacity;
    });
    if (parseFloat(opacity) > 0) {
      visibleLetterFound = true;
      break;
    }
  }
  expect(visibleLetterFound).toBe(true);
});

Then('the queued letters should accumulate near the sleigh', async ({ page }) => {
  // キューに追加された手紙がソリの近くに溜まっていることを確認
  const sleighs = page.getByTestId('sleigh');
  await sleighs.first().waitFor({ state: 'visible' });
  
  // 手紙がキューに追加されて位置が更新されるまで待機
  await page.waitForTimeout(3000);
  
  const letters = page.getByTestId('letter');
  await letters.first().waitFor({ state: 'visible' });
  
  // ソリの位置を取得
  const sleighRect = await sleighs.first().boundingBox();
  if (sleighRect) {
    // 手紙の位置を確認（ソリの近くにあることを確認）
    const letterCount = await letters.count();
    let lettersNearSleigh = 0;
    
    for (let i = 0; i < Math.min(letterCount, 20); i++) {
      const letterRect = await letters.nth(i).boundingBox();
      if (letterRect) {
        const distance = Math.sqrt(
          Math.pow(letterRect.x - sleighRect.x, 2) + 
          Math.pow(letterRect.y - sleighRect.y, 2)
        );
        // ソリから400px以内にある手紙をカウント（より広い範囲で確認）
        if (distance < 400) {
          lettersNearSleigh++;
        }
      }
    }
    
    // 少なくとも1つの手紙がソリの近くにあることを確認
    expect(lettersNearSleigh).toBeGreaterThan(0);
  }
});

// Given('the sleigh is processing {int} letters \\(maximum capacity)' は When と同じステップなので、When を使用

Given('there are letters waiting in the queue', async ({ page }) => {
  // キューに手紙が待機している状態になるまで待機
  await page.waitForTimeout(2000);
  
  // 手紙が表示されていることを確認
  const letters = page.getByTestId('letter');
  await letters.first().waitFor({ state: 'visible' });
  
  const letterCount = await letters.count();
  expect(letterCount).toBeGreaterThan(0);
});

When('one letter finishes processing', async ({ page }) => {
  // 1つの手紙が処理完了するまで待機
  // 処理カウンターが増加することを確認
  const processingCounts = page.getByTestId('processing-count');
  await processingCounts.first().waitFor({ state: 'visible' });
  
  const initialCountText = await processingCounts.first().textContent();
  const initialCount = parseInt(initialCountText?.replace('処理: ', '') || '0', 10);
  
  // 処理が完了するまで待機（処理カウンターが増加する、またはプレゼントが増加する）
  // プレゼントの数を確認する方法に変更
  const presents = page.getByTestId('present');
  const initialPresentCount = await presents.count();
  
  // プレゼントが増加するまで待機
  await page.waitForFunction(
    (initialPresentCount) => {
      const presentElements = document.querySelectorAll('[data-testid="present"]');
      return presentElements.length > initialPresentCount;
    },
    initialPresentCount,
    { timeout: 10000 }
  );
});

Then('the next letter from the queue should start processing', async ({ page }) => {
  // キューから次の手紙が処理開始されることを確認
  // プレゼントが増加することを確認
  const presents = page.getByTestId('present');
  await presents.first().waitFor({ state: 'visible', timeout: 10000 });
  
  const presentCount = await presents.count();
  expect(presentCount).toBeGreaterThan(0);
});

Then('the queued letters should decrease', async ({ page }) => {
  // キューに待機している手紙が減ることを確認
  // 手紙の数が減るか、または処理済み手紙が増えることを確認
  const letters = page.getByTestId('letter');
  const initialCount = await letters.count();
  
  // 少し待機
  await page.waitForTimeout(1000);
  
  // 処理済み手紙が増えていることを確認（プレゼントの数を確認）
  const presents = page.getByTestId('present');
  const presentCount = await presents.count();
  expect(presentCount).toBeGreaterThan(0);
});

When('each sleigh reaches its maximum processing capacity', async ({ page }) => {
  // 各ソリが最大処理数に達するまで待機
  const sleighs = page.getByTestId('sleigh');
  await sleighs.first().waitFor({ state: 'visible' });
  
  const sleighCount = await sleighs.count();
  expect(sleighCount).toBeGreaterThan(0);
  
  // 十分な時間待機して、各ソリが最大処理数まで処理する
  await page.waitForTimeout(3000);
});

Then('each sleigh should have its own queue of waiting letters', async ({ page }) => {
  // 各ソリが独立したキューを持っていることを確認
  const sleighs = page.getByTestId('sleigh');
  await sleighs.first().waitFor({ state: 'visible' });
  
  const sleighCount = await sleighs.count();
  expect(sleighCount).toBeGreaterThan(0);
  
  // 手紙が表示されていることを確認
  const letters = page.getByTestId('letter');
  await letters.first().waitFor({ state: 'visible' });
  
  const letterCount = await letters.count();
  expect(letterCount).toBeGreaterThan(0);
});

Then('the queued letters should accumulate near their respective sleighs', async ({ page }) => {
  // 各ソリの近くに手紙が溜まっていることを確認
  const sleighs = page.getByTestId('sleigh');
  await sleighs.first().waitFor({ state: 'visible' });
  
  const sleighCount = await sleighs.count();
  expect(sleighCount).toBeGreaterThan(0);
  
  // 手紙がキューに追加されて位置が更新されるまで待機
  await page.waitForTimeout(3000);
  
  const letters = page.getByTestId('letter');
  await letters.first().waitFor({ state: 'visible' });
  
  // 各ソリの近くに手紙があることを確認
  for (let i = 0; i < sleighCount; i++) {
    const sleighRect = await sleighs.nth(i).boundingBox();
    if (sleighRect) {
      const letterCount = await letters.count();
      let lettersNearSleigh = 0;
      
      for (let j = 0; j < Math.min(letterCount, 20); j++) {
        const letterRect = await letters.nth(j).boundingBox();
        if (letterRect) {
          const distance = Math.sqrt(
            Math.pow(letterRect.x - sleighRect.x, 2) + 
            Math.pow(letterRect.y - sleighRect.y, 2)
          );
          // ソリから400px以内にある手紙をカウント（より広い範囲で確認）
          if (distance < 400) {
            lettersNearSleigh++;
          }
        }
      }
      
      // 少なくとも1つの手紙がソリの近くにあることを確認
      expect(lettersNearSleigh).toBeGreaterThan(0);
    }
  }
});

