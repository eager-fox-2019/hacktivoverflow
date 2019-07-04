const puppeteer = require('puppeteer')

const getFromGoogle = async function (judulPertanyaan) {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();
    await page.goto('https://google.com');
    await page.type('input.gLFyf.gsfi', judulPertanyaan + ' site:stackoverflow.com');
    page.keyboard.press('Enter');
    await page.waitForSelector('div#resultStats');
    const links = await page.$$('div.r');
    await links[0].click()
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    let link = await page.url()
    let judul = await page.title()
    browser.close()
    console.log({ link, judul })
    return { link, judul }
  } catch (err) {
    console.error(err);
    browser.close()
    return false
  }
}

module.exports = getFromGoogle

