import { test, expect } from '../fixtures/testSetup.js'; 
import LoginPage from '../Pages/LoginPage.js';
import LogoutPage from '../Pages/logoutpage.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

// 📁 JSON Data Imports
import logoutData from '../testdata/logout.json' assert { type: 'json' };
import loginData from '../testdata/LoginData3.json' assert { type: 'json' };

test.describe('Logout Verification Tests', () => {
  test('TC05: Successful Logout', async ({ page }) => {
    const login = new LoginPage(page);
    const logoutPage = new LogoutPage(page);

    // 1. 🔐 Login Step
    await test.step('Login to application', async () => {
      await login.login(loginData.validUsers[0].username, loginData.validUsers[0].password);
      await attachStepScreenshot(page, '01 - User Logged In');
    });

    // 2. 🚪 Logout Step
    await test.step('Perform Logout', async () => {
      await logoutPage.logout();
      await attachStepScreenshot(page, '02 - Logout Button Clicked');
    });

    // 3. 🎯 Assertion Step
    await test.step('Verify Redirection to Login Page', async () => {
      await expect(page).toHaveURL(logoutData.expectedUrl);
      await attachStepScreenshot(page, '03 - Back on Login Page Verified');
    });
  });
});