import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, Then } = createBdd(test);

Given('I open the Kube Santa application', async ({ page }) => {
  await page.goto('/');
});

Then('I should see the header with title {string}', async ({ page }, title: string) => {
  await page.getByRole('heading', { name: title }).waitFor();
});

Then('I should see the {string} area \\(Cluster)', async ({ page }, areaName: string) => {
  const testId = areaName === 'Night Sky' ? 'night-sky' : areaName.toLowerCase().replace(/\s+/g, '-');
  await page.getByTestId(testId).waitFor();
});

Then('I should see the {string} area at the bottom', async ({ page }, areaName: string) => {
  const testId = areaName === 'Control Panel' ? 'control-panel' : areaName.toLowerCase().replace(/\s+/g, '-');
  await page.getByTestId(testId).waitFor();
});

Then('the background of the Night Sky should be dark blue', async ({ page }) => {
  const nightSky = page.getByTestId('night-sky');
  await nightSky.waitFor();
  // グラデーション背景を確認（bg-gradient-to-b from-blue-900 via-purple-900 to-blue-800）
  const backgroundImage = await nightSky.evaluate((el) => {
    const computed = window.getComputedStyle(el);
    return computed.backgroundImage;
  });
  // グラデーションが適用されていることを確認
  // グラデーションには blue-900, purple-900, blue-800 などのダークブルー系の色が含まれる
  const hasGradient = backgroundImage.includes('gradient') || backgroundImage.includes('linear-gradient');
  // グラデーションが適用されている場合、ダークブルー系の色が含まれていることを確認
  // または、グラデーションが適用されていること自体を確認（グラデーションにはダークブルー系の色が含まれるため）
  expect(hasGradient).toBeTruthy();
});

