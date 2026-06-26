import { expect, Page } from '@playwright/test';
import { clickFirstVisible, fillFirstVisible } from '../utils/locator-utils';

type Credentials = {
  username: string;
  password: string;
};

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/');
    await expect(
      this.page.getByRole('heading', { name: /project board login/i }),
      'Expected Project Board Login page to be displayed.'
    ).toBeVisible();
  }

  async login({ username, password }: Credentials): Promise<void> {
    await this.open();

    await fillFirstVisible([
      this.page.getByLabel(/^username$/i),
      this.page.getByPlaceholder(/^username$/i),
      this.page.locator('input[name="username"]'),
      this.page.locator('input[id*="username" i]'),
      this.page.locator('input[autocomplete="username"]'),
      this.page.locator('input[type="text"]'),
      this.page.locator('input').nth(0)
    ], username);

    await fillFirstVisible([
      this.page.getByLabel(/^password$/i),
      this.page.getByPlaceholder(/^password$/i),
      this.page.locator('input[name="password"]'),
      this.page.locator('input[id*="password" i]'),
      this.page.locator('input[type="password"]'),
      this.page.locator('input').nth(1)
    ], password);

    // The demo app button text is "Sign in", not "Submit".
    await clickFirstVisible([
      this.page.getByRole('button', { name: /^sign in$/i }),
      this.page.locator('button').filter({ hasText: /^sign in$/i }),
      this.page.locator('button[type="submit"]')
    ]);

    await expect(
      this.page.getByText(/Web Application|Mobile Application/i).first(),
      'Expected project navigation to be visible after successful sign in.'
    ).toBeVisible();
  }
}
