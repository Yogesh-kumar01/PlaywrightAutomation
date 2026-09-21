import { test, expect } from '../fixtures/testSetup.js'; 
import LoginPage from '../Pages/LoginPage.js';
import AddtoCart from '../Pages/AddtoCartpage.js';
import Checkout from '../Pages/Checkoutpage.js';
import LogoutPage from '../Pages/logoutpage.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

// 📁 JSON Data Imports
import loginData from '../testdata/LoginData3.json' assert { type: 'json' };
import cartData from '../testdata/AddtoCart.json' assert { type: 'json' };
import checkoutData from '../testdata/Checkout.json' assert { type: 'json' };
import logoutData from '../testdata/logout.json' assert { type: 'json' };

test.describe('Checkout Workflow Tests', () => {
  test('TC03: Checkout, Finish and Save Invoice as PDF', async ({ page }) => {
    const login = new LoginPage(page);
    const cart = new AddtoCart(page);
    const checkout = new Checkout(page);
    const logoutPage = new LogoutPage(page);

    const user = loginData.validUsers[0];

    // 1. 🔐 Login
    await test.step('Login to application', async () => {
      await login.login(user.username, user.password);
      await attachStepScreenshot(page, '01 - User Logged In');
    });

    // 2. 🛒 Add Products
    await test.step('Add products to cart', async () => {
      for (const item of cartData.products) {
        await cart.addSingleItemToCart(item.buttonSelector);
      }
      await attachStepScreenshot(page, '02 - Products Added');
    });

    // 3. 📄 Cart Page Verification & Screenshot (Fixed: Cart Items Wait Added)
    await test.step('Navigate to Cart', async () => {
      await cart.clickCartIcon();
      await expect(page).toHaveURL(checkoutData.pages.cartUrl);
      
      // 🎯 Cart items list render hone ka wait
      await expect(page.locator('.cart_item').first()).toBeVisible();
      
      // 📸 Cart Page Items View Screenshot
      await attachStepScreenshot(page, '03 - Cart Page Items View');
    });

    // 4. 💳 Checkout Form Filling & Screenshot
    await test.step('Fill Checkout Information', async () => {
      await checkout.proceedToCheckout();
      
      // Form fields fill
      await checkout.fillInformationOnly(
        checkoutData.formData.firstName,
        checkoutData.formData.lastName,
        checkoutData.formData.postalCode
      );

      // 📸 Filled Checkout Form Screenshot
      await attachStepScreenshot(page, '04 - Checkout Form Filled With Data');

      // Continue Button Click
      await checkout.clickContinue();
    });

    // 5. 🎉 Finish Order & Save PDF Invoice
    await test.step('Finish Order and Save PDF Invoice', async () => {
      await checkout.finishCheckout();
      await expect(checkout.completeHeader).toHaveText(checkoutData.expectedSuccessMsg);

      // PDF Save
      await page.pdf({
        path: checkoutData.pdfReport.path,
        format: checkoutData.pdfReport.format,
        printBackground: checkoutData.pdfReport.printBackground
      });

      // 📸 Order Completed Screen Screenshot
      await attachStepScreenshot(page, '05 - Order Completed Screen');
    });

    // 6. 🚪 Logout
    await test.step('Perform Logout', async () => {
      await logoutPage.logout();
      await expect(page).toHaveURL(logoutData.expectedUrl);
      await attachStepScreenshot(page, '06 - Logout Complete');
    });
  });
});