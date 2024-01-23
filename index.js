const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://leetcode.com/accounts/login/');
  await page.type('#id_login', 'squat_er');
  await page.type('#id_password', '007IQOP@ishan');
  await page.waitForSelector('#signin_btn', { visible: true, timeout: 5000 });
  await page.mouse.move(10,20)
  await page.click('#signin_btn');

//   await page.waitForNavigation();
//   await page.goto('https://leetcode.com/problems/daily-challenge/');
//   await page.click('.btn.btn-success');
//   await page.waitForSelector('.ant-modal-content');
//   await page.click('.ant-modal-footer .btn-success');
//   await browser.close();
})();
