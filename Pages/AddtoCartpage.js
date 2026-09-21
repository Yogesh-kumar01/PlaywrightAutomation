import { test } from '../fixtures/testSetup.js'; 
import { attachStepScreenshot } from '../utilities/screenshot.js';

class AddtoCart {
  constructor(page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async addSingleItemToCart(buttonSelector) {
    await test.step(`Add product to cart (${buttonSelector})`, async () => {
      await this.page.locator(buttonSelector).click();
      await attachStepScreenshot(this.page, `Product Added - ${buttonSelector}`);
    });
  }

  async addMultipleItemsToCart(productsArray) {
    await test.step('Add multiple items to cart', async () => {
      for (const item of productsArray) {
        await this.addSingleItemToCart(item.buttonSelector);
      }
      await attachStepScreenshot(this.page, 'All Products Added to Cart');
    });
  }

  async clickCartIcon() {
    await test.step('Click on Cart icon', async () => {
      await this.cartIcon.click();
      await attachStepScreenshot(this.page, 'Cart Icon Clicked');
    });
  }
}

export default AddtoCart;