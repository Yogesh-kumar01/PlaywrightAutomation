import { test } from '../fixtures/testSetup.js'; 
import { attachStepScreenshot } from '../utilities/screenshot.js';

class Homepage {
  constructor(page) {
    this.page = page;
    this.headerTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
  }

  async getTitleText() {
    return await test.step('Get Homepage Title Text', async () => {
      const text = await this.headerTitle.textContent();
      await attachStepScreenshot(this.page, 'After Homepage Title Fetched');
      return text;
    });
  }
}

export default Homepage;