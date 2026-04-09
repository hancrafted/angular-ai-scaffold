import { test, expect } from '@playwright/test';

test.describe('Smoke test', () => {
	test('happy path: app loads and renders heading', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('heading', { level: 1 })).toContainText('Hello, frontend');
	});
});
