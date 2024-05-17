import { test, expect } from '@playwright/test';
import { MOCKED_ACCOUNT_LOOK_UP_RESPONSE, MOCKED_LOGIN_RESPONSE } from './mocks.js';

test('auth flow for login', async ({ page }) => {
  // Mock the api call - Login
  await page.route('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=*', async route => {
    await route.fulfill({ json: MOCKED_LOGIN_RESPONSE });
  });

  // Mock the api call - Account Look Up
  await page.route('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=*', async route => {
    await route.fulfill({ json: MOCKED_ACCOUNT_LOOK_UP_RESPONSE });
  });

  await page.goto('http://localhost:5173/');
  await expect(page).toHaveTitle('JudgeMe');
  await expect(page).toHaveURL('http://localhost:5173/login?redirect=/');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('tester@samsoniyanda.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('document007');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('somerandomtext');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Shops' }).click();
  await expect(page).toHaveURL('http://localhost:5173/shops');
  await page.getByRole('button', { name: 'log out' }).click();
  await expect(page).toHaveURL('http://localhost:5173/login?redirect=/shops');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('tester@samsoniyanda.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('document007');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('somerandomtext');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:5173/shops');
  await page.getByRole('link', { name: 'Products' }).click();
  await expect(page).toHaveURL('http://localhost:5173');
  await page.getByRole('button', { name: 'log out' }).click();
  await expect(page).toHaveURL('http://localhost:5173/login?redirect=/');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('tester@samsoniyanda.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('document007');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('somerandomtext');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:5173');
});