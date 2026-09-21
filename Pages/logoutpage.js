import BasePage from './Basepage.js';
import { test } from '../fixtures/testSetup.js'; 
import { attachStepScreenshot } from '../utilities/screenshot.js';

class LogoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async logout() {
    await test.step('Open Burger Menu', async () => {
      await this.menuButton.click();
      await attachStepScreenshot(this.page, '01 - Burger Menu Opened');
    });

    await test.step('Wait for Logout Link and Click', async () => {
      await this.logoutLink.waitFor({ state: 'visible' });
      await attachStepScreenshot(this.page, '02 - Logout Link Visible');
      await this.logoutLink.click();
      await attachStepScreenshot(this.page, '03 - Logout Clicked');
    });
  }
}

export default LogoutPage;