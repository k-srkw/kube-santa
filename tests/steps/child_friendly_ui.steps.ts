import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Then } = createBdd(test);

Then('I should not see difficult technical terms in the main UI', async ({ page }) => {
  // メインUIの主要な要素を取得
  const header = page.getByRole('heading');
  const statusText = page.getByTestId('status-text');
  // スライダーラベルを取得（label要素内のspan要素を直接取得）
  const sliderLabel = page.locator('label[for="desired-state-slider"] span').filter({ hasText: /サンタさん/ });
  const controlPanel = page.getByTestId('control-panel');
  
  // 各要素のテキストを取得
  const headerText = await header.textContent();
  const statusTextContent = await statusText.textContent();
  const controlPanelText = await controlPanel.textContent();
  
  // 難しい技術用語が直接表示されていないことを確認
  // 括弧内の英語表記は許容されるが、メインのテキストに英語の専門用語が直接出ていないことを確認
  const difficultTerms = ['ReplicaSet', 'Deployment', 'Cluster', 'Operation Center', 'Magic Contract'];
  
  // メインのテキスト（括弧内を除く）に難しい用語が含まれていないことを確認
  if (headerText) {
    const mainHeaderText = headerText.replace(/\([^)]*\)/g, ''); // 括弧内を除去
    for (const term of difficultTerms) {
      expect(mainHeaderText).not.toContain(term);
    }
  }
  
  if (statusTextContent) {
    for (const term of difficultTerms) {
      expect(statusTextContent).not.toContain(term);
    }
  }
  
  if (controlPanelText) {
    const mainControlPanelText = controlPanelText.replace(/\([^)]*\)/g, ''); // 括弧内を除去
    for (const term of difficultTerms) {
      expect(mainControlPanelText).not.toContain(term);
    }
  }
});

Then('all labels should use simple Japanese words that children can understand', async ({ page }) => {
  // 主要なUI要素を確認
  const header = page.getByRole('heading');
  const statusText = page.getByTestId('status-text');
  // スライダーラベルを取得（label要素内のspan要素を直接取得）
  const sliderLabel = page.locator('label[for="desired-state-slider"] span').filter({ hasText: /サンタさん/ });
  
  // 各要素が表示されていることを確認
  await expect(header).toBeVisible();
  await expect(statusText).toBeVisible();
  await expect(sliderLabel).toBeVisible();
  
  // テキストを取得して、子供が理解できる簡単な日本語が使われていることを確認
  const headerText = await header.textContent();
  const statusTextContent = await statusText.textContent();
  const sliderLabelText = await sliderLabel.textContent();
  
  // 子供が理解できる簡単な言葉が含まれていることを確認
  const childFriendlyWords = ['サンタ', 'プレゼント', 'いて欲しい', '今いる'];
  
  if (headerText) {
    const hasChildFriendlyWord = childFriendlyWords.some(word => headerText.includes(word));
    expect(hasChildFriendlyWord || headerText.includes('Kube Santa')).toBeTruthy();
  }
  
  if (statusTextContent) {
    const hasChildFriendlyWord = childFriendlyWords.some(word => statusTextContent.includes(word));
    expect(hasChildFriendlyWord).toBeTruthy();
  }
  
  if (sliderLabelText) {
    const hasChildFriendlyWord = childFriendlyWords.some(word => sliderLabelText.includes(word));
    expect(hasChildFriendlyWord).toBeTruthy();
  }
});

