import { test, expect } from '../fixtures/testSetup.js'; 
import LoginPage from '../Pages/LoginPage.js';
import Homepage from '../Pages/Homepage.js';
import LogoutPage from '../Pages/logoutpage.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

// 📁 JSON Data Imports
import loginData from '../testdata/LoginData3.json' assert { type: 'json' };
import homeData from '../testdata/Home.json' assert { type: 'json' };
import logoutData from '../testdata/logout.json' assert { type: 'json' };

test.describe('Home Page Verification Flow', () => {
  test('TC04: Home Page Verification Flow', async ({ page }) => {
    const login = new LoginPage(page);
    const home = new Homepage(page);
    const logoutPage = new LogoutPage(page);
    const user = loginData.validUsers[0];

    // 1. 🔐 Login Step
    await test.step('Login to application', async () => {
      await login.login(user.username, user.password);
      await attachStepScreenshot(page, '01 - User Logged In');
    });

    // 2. 🏠 Home Page Verification Step
    await test.step('Verify Home Page Header Title', async () => {
      await expect(home.headerTitle).toHaveText(homeData.expectedTitle);
      await attachStepScreenshot(page, '02 - Header Title Verified');
    });

    // 3. 🚪 Logout Step
    await test.step('Perform Logout and Redirection Check', async () => {
      await logoutPage.logout();
      await expect(page).toHaveURL(logoutData.expectedUrl);
      await attachStepScreenshot(page, '03 - Logout Completed');
    });
  });
});