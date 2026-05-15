import { test, expect } from '@playwright/test';

test.describe('ReviewBisnisku E2E Tests', () => {
  
  test('Landing Page renders correctly with review images', async ({ page }) => {
    await page.goto('/');
    
    // Check Hero text
    await expect(page.getByRole('heading', { name: 'Tingkatkan Reputasi Bisnis Anda dengan Review Berkualitas' })).toBeVisible();
    
    // Check Header and Navigation
    await expect(page.getByText('ReviewBisnisku').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Order' }).first()).toBeVisible();

    // Check that review images are present
    await expect(page.locator('img[alt="Bukti Review Google Maps 1"]')).toBeVisible();
    await expect(page.locator('img[alt="Bukti Review Google Maps 2"]')).toBeVisible();
  });

  test('Redirects to Login when accessing order page without authentication', async ({ page }) => {
    await page.goto('/order');
    
    // Check if redirected to login page by checking the URL or page heading
    await expect(page).toHaveURL(/.*\/login.*/);
    await expect(page.getByRole('heading', { name: 'Selamat Datang Kembali' })).toBeVisible();
  });

  test('Login Page renders correctly', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Selamat Datang Kembali' })).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Masuk' }).first()).toBeVisible();
  });

  test('Register Page renders correctly', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByRole('heading', { name: 'Buat Akun Baru' })).toBeVisible();
    await expect(page.locator('input[id="name"]')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Daftar Sekarang' })).toBeVisible();
  });
  
  test('Admin Page requires Authentication', async ({ page }) => {
    await page.goto('/admin');
    // Usually redirects to login or shows unauthorized message
    // Let's just check if it redirects to login or shows access denied
    if (page.url().includes('/login')) {
      await expect(page.url()).toContain('/login');
    } else {
      await expect(page.getByText(/unauthorized|login/i)).toBeVisible();
    }
  });

});
