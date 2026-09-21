import { test, expect } from '../fixtures/testSetup.js'; 
import loginData from '../testdata/LoginData.json' assert { type: 'json' }; 
import LoginPage from '../Pages/LoginPage.js'; 
import { attachStepScreenshot } from '../utilities/screenshot.js'; 

test.describe('Login checing process', () => { 
  test('Login Test Case with valid user', async ({ page }) => { 
    const loginPage = new LoginPage(page); 
    const data = loginData.validUsers[0]; 

   
    // 2. Enter credentials & Login
    await test.step('Enter credential and login', async () => { 
      await loginPage.login(data.username, data.password); 
    }); 

    // 3. Verify Landing Page Message
    await test.step('Verify Welcome Message on Landing page', async () => { 
      // 🎯 FIXED: expectedText uses "Products" from JSON
      await expect(loginPage.message.first()).toHaveText(data.expectedText); 
      await attachStepScreenshot(page, '05 - After welcome message verification'); 
    }); 
  }); 
});