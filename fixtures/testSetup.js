import { test as base } from '@playwright/test'; 
import BasePage from '../Pages/Basepage.js'; 

const APP_URL = 'https://www.saucedemo.com/'; 

export const test = base.extend({ 
  pageSetup: [ 
    async ({ page }, use, testInfo) => { 
      // 1. Setup Phase
      const basePage = new BasePage(page); 
      await basePage.navigate(APP_URL); 
      
      // 2. Execute Test
      await use(); 

      // 3. Teardown Phase (Test khatam hone par automatic Final Screenshot capture hoga)
      await test.step('afterEach hook', async () => {
        try {
          const screenshot = await page.screenshot({ fullPage: true });
          await testInfo.attach('Final Screenshot', {
            body: screenshot,
            contentType: 'image/png',
          });
        } catch (e) {
          // Context failure safe handle
        }
      });
    }, 
    { auto: true }, 
  ], 
}); 

export { expect } from '@playwright/test';