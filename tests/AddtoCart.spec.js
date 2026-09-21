import { test, expect } from '../fixtures/testSetup.js'; 
import LoginPage from '../Pages/LoginPage.js';
import AddtoCart from '../Pages/AddtoCartpage.js';
import LogoutPage from '../Pages/logoutpage.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

import loginData from '../testdata/LoginData3.json' assert { type: 'json' };
import cartData from '../testdata/AddtoCart.json' assert { type: 'json' };
import logoutData from '../testdata/logout.json' assert { type: 'json' };

test.describe('Add Multiple Products Workflow', () => {
  test('TC 02: Add Multiple Products with Detailed JSON Objects using Loop', async ({ page }) => {
    const login = new LoginPage(page);
    const cart = new AddtoCart(page);
    const logoutPage = new LogoutPage(page);
    const user = loginData.validUsers[0];

    // 1. Login User
    await test.step('Login to application', async () => {
      await login.login(user.username, user.password);
      await attachStepScreenshot(page, '01 - Logged In Successfully');
    });

    // 2. Add Multiple Items to Cart
    await test.step('Add products to cart using loop', async () => {
      await cart.addMultipleItemsToCart(cartData.products);
      await attachStepScreenshot(page, '02 - Products Added to Cart');
    });

    // 3. Verify Cart Badge Count
    await test.step('Verify Cart Badge count matches expected count', async () => {
      const expectedCount = cartData.products.length.toString();
      await expect(cart.cartBadge).toHaveText(expectedCount);
      await attachStepScreenshot(page, '03 - Cart Badge Count Verified');
    });

    // 4. Logout User
    await test.step('Perform logout and verify redirection', async () => {
      await logoutPage.logout();
      await expect(page).toHaveURL(logoutData.expectedUrl);
      await attachStepScreenshot(page, '04 - Logout Completed');
    });
  });
});