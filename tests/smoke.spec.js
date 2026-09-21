import { test, expect } from '../fixtures/testSetup.js'; 
import LoginPage from '../Pages/LoginPage.js';
import Homepage from '../Pages/Homepage.js';
import AddtoCart from '../Pages/AddtoCartpage.js';
import Checkout from '../Pages/Checkoutpage.js';
import LogoutPage from '../Pages/logoutpage.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

// 📁 JSON Data Imports
import loginData from '../testdata/LoginData3.json' assert { type: 'json' };
import homeData from '../testdata/Home.json' assert { type: 'json' };
import cartData from '../testdata/AddtoCart.json' assert { type: 'json' };
import checkoutData from '../testdata/Checkout.json' assert { type: 'json' };
import logoutData from '../testdata/logout.json' assert { type: 'json' };

test.describe('Smoke Testing Suite - E2E Critical Path', () => {
  test('ST01: Critical Path Verification (Login -> Cart -> Checkout -> PDF Invoice -> Logout)', async ({ page, browserName }) => {
    
    const login = new LoginPage(page);
    const home = new Homepage(page);
    const cart = new AddtoCart(page);
    const checkout = new Checkout(page);
    const logoutPage = new LogoutPage(page);

    const user = loginData.validUsers[0];

    // 1. 🔐 Step 1: Login
    await test.step('Smoke 01: User Login', async () => {
      await login.login(user.username, user.password);
      await attachStepScreenshot(page, 'Smoke - 01 Logged In');
    });

    // 2. 🏠 Step 2: Home Page Header Check
    await test.step('Smoke 02: Verify Home Page Header', async () => {
      await expect(home.headerTitle).toHaveText(homeData.expectedTitle);
      await attachStepScreenshot(page, 'Smoke - 02 Home Page Verified');
    });

    // 3. 🛒 Step 3: Add Items to Cart
    await test.step('Smoke 03: Add Products to Cart', async () => {
      for (const item of cartData.products) {
        await cart.addSingleItemToCart(item.buttonSelector);
      }
      const expectedCount = cartData.products.length.toString();
      await expect(cart.cartBadge).toHaveText(expectedCount);
      await attachStepScreenshot(page, 'Smoke - 03 Items Added & Badge Verified');
    });

    // 4. 💳 Step 4: Cart & Checkout Form (FIXED: Method updated to match Checkoutpage.js)
    await test.step('Smoke 04: Cart Redirection & Checkout Form Filling', async () => {
      await cart.clickCartIcon();
      await expect(page).toHaveURL(checkoutData.pages.cartUrl);
      
      await checkout.proceedToCheckout();
      
      // Updated split methods call
      await checkout.fillInformationOnly(
        checkoutData.formData.firstName,
        checkoutData.formData.lastName,
        checkoutData.formData.postalCode
      );
      
      await attachStepScreenshot(page, 'Smoke - 04 Checkout Form Filled');
      
      await checkout.clickContinue();
    });

    // 5. 🎉 Step 5: Finish Order & PDF Invoice
    await test.step('Smoke 05: Complete Purchase & Save PDF Invoice', async () => {
      await checkout.finishCheckout();
      await expect(checkout.completeHeader).toHaveText(checkoutData.expectedSuccessMsg);
      await attachStepScreenshot(page, 'Smoke - 05 Order Completed');

      if (browserName === 'chromium') {
        await page.pdf({
          path: checkoutData.pdfReport.path,
          format: checkoutData.pdfReport.format,
          printBackground: checkoutData.pdfReport.printBackground
        });
      }
    });

    // 6. 🚪 Step 6: Logout Verification
    await test.step('Smoke 06: Perform Logout', async () => {
      await logoutPage.logout();
      await expect(page).toHaveURL(logoutData.expectedUrl);
      await attachStepScreenshot(page, 'Smoke - 06 Logout Verified');
    });

  });
});