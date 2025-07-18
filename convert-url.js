const puppeteer = require('puppeteer');

(async () => {
  const url = process.argv[2];
  const output = process.argv[3] || 'output.pdf';

  if (!url) {
    console.error('❌ Please input a URL to convert.');
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  // const cookieString = 'test_group=1; _ALGOLIA=a'
  // const cookies = cookieString.split(';').map(cookie => {
  //   const [name, ...rest] = cookie.trim().split('=');
  //   return {
  //     name,
  //     value: rest.join('='),
  //     domain: 'www.cake.me',
  //   };
  // });
  //
  // await page.setCookie(...cookies);

  await page.goto(url, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: output,
    format: 'A4',
    printBackground: true,
  });

  await browser.close();
})();
