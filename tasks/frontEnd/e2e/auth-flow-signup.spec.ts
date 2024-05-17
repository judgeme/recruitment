import { test, expect } from '@playwright/test';
import { MOCKED_ACCOUNT_LOOK_UP_RESPONSE, MOCKED_SIGNUP_RESPONSE } from './mocks.js';

test('auth flow sign up', async ({ page }) => {
  // Mock the api call - Signup
  await page.route('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=*', async route => {
    await route.fulfill({ json: MOCKED_SIGNUP_RESPONSE });
  });

  // Mock the api call - Account Look Up
  await page.route('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=*', async route => {
    await route.fulfill({ json: MOCKED_ACCOUNT_LOOK_UP_RESPONSE });
  });

  await page.goto('http://localhost:5173/register');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('tester@samsoniyanda.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('somerandomtext');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page).toHaveURL('http://localhost:5173');
  await expect(page.getByRole('button', {
    name: 'username'
  })).toHaveText(MOCKED_ACCOUNT_LOOK_UP_RESPONSE.users[0].displayName);
});