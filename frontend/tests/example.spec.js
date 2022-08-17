// @ts-check

import { test, expect } from '@playwright/test';

const user = {
  login: 'user',
  password: 'password',
};
const path = 'http://localhost:3000/';

test.beforeEach(async ({ page }) => {
  await page.goto(path);
  await page.waitForTimeout(300);

  await page.locator('text=Hexlet Chat').click();
});

test.describe('registration', () => {
  test('handle new user creation', async ({ page }) => {
    await page.click('text=Регистрация');
    await page.waitForURL(`**/signup`);
    await page.locator('text=Имя пользователя').type(user.login);
    await page.locator('text=/^Пароль$/').type(user.password);
    await page.locator('text=Подтвердите пароль').type(user.password);
    await page.locator('button[type="submit"]').click();
    await page.waitForURL('**/');
  });

  test('handle validation', async ({ page }) => {
    await page.click('text=Регистрация');
    await page.waitForURL(`**/signup`);

    await page.locator('text=Имя пользователя').type('u');
    await page.locator('text=/^Пароль$/').type('pass');
    await page.locator('text=Подтвердите пароль').type('passw');
    await page.locator('button[type="submit"]').click();
    expect(await page.$('text=От 3 до 20 символов')).not.toBeNull();
    expect(await page.$('text=Не менее 6 символов')).not.toBeNull();
    expect(await page.$('text=Пароли должны совпадать')).not.toBeNull();
  });
});

test.describe('auth', () => {
  test('login page on enter as guest', async ({ page }) => {
    expect(await page.$('text=Ваш ник')).not.toBeNull();
    expect(await page.$('text=/^Пароль$/')).not.toBeNull();
  });

  test('successful login', async ({ page }) => {
    await page.locator('text=Ваш ник').type('admin');
    await page.locator('text=/^Пароль$/').type('admin');
    await page.locator('button[type="submit"]').click();

    expect(
      await page.$('text=Неверные имя пользователя или пароль')
    ).toBeNull();
  });

  test('handle login error', async ({ page }) => {
    await page.locator('text=Ваш ник').type('guest');
    await page.locator('text=/^Пароль$/').type('pass');
    await page.locator('button[type="submit"]').click();

    expect(
      await page.$('text=Неверные имя пользователя или пароль')
    ).not.toBeNull();
  });
});

test.describe('chat', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('text=Ваш ник').type('admin');
    await page.locator('text=/^Пароль$/').type('admin');
    await page.locator('button[type="submit"]').click();
    await page.locator('[aria-label="Новое сообщение"]');
  });

  test('messaging', async ({ page }) => {
    await page.locator('[aria-label="Новое сообщение"]').type('hello');
    await page.keyboard.press('Enter');
    expect(await page.$('text=hello')).not.toBeNull();
  });

  test('profanity filter', async ({ page }) => {
    const profanityText = 'you have nice boobs';
    await page.locator('[aria-label="Новое сообщение"]').type(profanityText);
    await page.keyboard.press('Enter');
    expect(
      await page.locator(`text=${profanityText}`, { timeout: 0 })
    ).not.toBe();
    expect(
      await page.locator('text="you have nice *****"', { timeout: 30000 })
    ).not.toBeNull();
  });

  test('different channels', async ({ page }) => {
    await page
      .locator('[aria-label="Новое сообщение"]')
      .type('message for general');
    await page.keyboard.press('Enter');
    expect(await page.$('text=message for general')).not.toBeNull();
    await page.locator('text=random').click();
    expect(await page.$("text='message for general'")).toBeNull();
    await page
      .locator('[aria-label="Новое сообщение"]')
      .type('message for random');
    await page.keyboard.press('Enter');
    expect(await page.$('text=message for random')).not.toBeNull();
  });

  test('adding channel', async ({ page }) => {
    await page.locator('text=+').click();
    await page.locator('text=Имя канала').type('test channel');
    await page.keyboard.press('Enter');

    expect(await page.locator('text=Канал создан')).toBeVisible();
    expect(await page.$('text=# test channel')).not.toBeNull();
  });

  test('rename channel', async ({ page }) => {
    await page.locator('text="Управление каналом"').click();
    await page.locator('text=Переименовать').click();
    const input = await page.locator('text=Имя канала');
    await input.fill('');
    await input.type('new test channel');
    await page.keyboard.press('Enter');

    await expect(await page.locator('text=Канал переименован')).toBeVisible();
    expect(await page.locator('text="# new test channel"')).not.toBeNull();
    // await expect(await page.$('text="# new test channel"')).not.toBeNull();
  });

  test('remove channel', async ({ page }) => {
    await page.locator('text=Управление каналом').click();
    await page.locator('text=Удалить').click();

    await page.locator('button.btn-danger').click();

    await expect(await page.locator('text=Канал удалён')).toBeVisible();
    await expect(await page.$('text=# new test channel')).toBeNull();
  });
});
