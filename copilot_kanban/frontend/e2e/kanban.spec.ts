import { test, expect } from '@playwright/test';

test.describe('Kanban Board', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads with dummy data', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Kanban Board');
    await expect(page.locator('h2')).toHaveCount(5);
    
    const columns = page.locator('h2');
    await expect(columns.nth(0)).toHaveText('To Do');
    await expect(columns.nth(1)).toHaveText('In Progress');
    await expect(columns.nth(2)).toHaveText('Review');
    await expect(columns.nth(3)).toHaveText('Testing');
    await expect(columns.nth(4)).toHaveText('Done');
  });

  test('can add a new card', async ({ page }) => {
    await page.locator('button:has-text("+ Add Card")').first().click();
    await page.fill('input[placeholder="Card title"]', 'New Test Card');
    await page.fill('textarea[placeholder="Details"]', 'Test card details');
    await page.locator('button:has-text("Add")').click();
    
    await expect(page.locator('text=New Test Card')).toBeVisible();
    await expect(page.locator('text=Test card details')).toBeVisible();
  });

  test('can delete a card', async ({ page }) => {
    const firstCard = page.locator('[class*="bg-white rounded-lg shadow"]').first();
    const cardText = await firstCard.locator('h3').textContent();
    
    await firstCard.locator('button[aria-label="Delete card"]').click();
    
    await expect(page.locator(`text=${cardText}`)).not.toBeVisible();
  });

  test('can rename a column', async ({ page }) => {
    await page.locator('h2').first().click();
    await page.fill('input[value="To Do"]', 'Backlog');
    await page.keyboard.press('Enter');
    
    await expect(page.locator('h2').first()).toHaveText('Backlog');
  });

  test('full workflow: add, move, and delete card', async ({ page }) => {
    await page.locator('button:has-text("+ Add Card")').first().click();
    await page.fill('input[placeholder="Card title"]', 'E2E Test Card');
    await page.fill('textarea[placeholder="Details"]', 'Testing the full workflow');
    await page.locator('button:has-text("Add")').click();
    
    await expect(page.locator('text=E2E Test Card')).toBeVisible();
    
    await page.locator('text=E2E Test Card').locator('..').locator('..').locator('button[aria-label="Delete card"]').click();
    
    await expect(page.locator('text=E2E Test Card')).not.toBeVisible();
  });
});
