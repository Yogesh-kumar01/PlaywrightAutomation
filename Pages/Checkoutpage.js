import BasePage from './Basepage.js';
import { test } from '../fixtures/testSetup.js'; 
import { attachStepScreenshot } from '../utilities/screenshot.js';

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');
  }

  async proceedToCheckout() {
    await test.step('Proceed to Checkout', async () => {
      await this.checkoutButton.click();
      await attachStepScreenshot(this.page, 'After Checkout Button Click');
    });
  }

  // Sirf inputs fill karega taake screenshot lia ja sake
  async fillInformationOnly(firstName, lastName, postalCode) {
    await test.step('Fill Checkout Information', async () => {
      await test.step('Enter First Name', async () => {
        await this.firstNameInput.fill(firstName);
      });
      await test.step('Enter Last Name', async () => {
        await this.lastNameInput.fill(lastName);
      });
      await test.step('Enter Postal Code', async () => {
        await this.postalCodeInput.fill(postalCode);
      });
      await attachStepScreenshot(this.page, 'After Checkout Form Filled');
    });
  }

  // Screenshot lene ke baad Continue click karne ke liye
  async clickContinue() {
    await test.step('Click Continue Button', async () => {
      await this.continueButton.click();
      await attachStepScreenshot(this.page, 'After Continue Click');
    });
  }

  async finishCheckout() {
    await test.step('Finish Checkout Order', async () => {
      await this.finishButton.click();
      await attachStepScreenshot(this.page, 'After Finish Click');
    });
  }
}

export default CheckoutPage;