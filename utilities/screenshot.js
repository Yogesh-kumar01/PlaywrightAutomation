import { test } from '@playwright/test'; 

/** 
 * During-test attachment (Allure / HTML report). Only call inside a running test. 
 */ 
export async function attachStepScreenshot(page, name) { 
  await test.info().attach(name, { 
    body: await page.screenshot(), 
    contentType: 'image/png', 
  }); 
} 

/** 
 * Post-test screenshots for reports; use only from test.afterEach. 
 */ 
export async function attachScreenshotAfterEach(page, testInfo) { 
  await testInfo.attach('Final Screenshot', { 
    body: await page.screenshot(), 
    contentType: 'image/png', 
  }); 
  
  if (testInfo.status !== testInfo.expectedStatus) { 
    await testInfo.attach('Failure Screenshot', { 
      body: await page.screenshot(), 
      contentType: 'image/png', 
    }); 
  } 
}