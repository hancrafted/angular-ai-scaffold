import { test, expect } from '@playwright/test';

test.describe('Smoke test', () => {
	test('happy path: app loads and redirects to the Home dashboard shell', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveURL(/\/home$/);
		await expect(page.getByText('Frontend')).toBeVisible();
		await expect(page.getByRole('heading', { level: 1, name: 'Dashboard' })).toBeVisible();
	});
});
