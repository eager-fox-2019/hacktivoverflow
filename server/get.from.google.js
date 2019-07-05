const puppeteer = require('puppeteer')

const getFromGoogle = async function (judulPertanyaan) {
  let browser 
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://google.com');
    await page.type('input.gLFyf.gsfi', judulPertanyaan + ' site:stackoverflow.com');
    page.keyboard.press('Enter');
    await page.waitForSelector('div#resultStats', {
      timeout: 4000
    });
    const links = await page.$$('div.r', {
      timeout: 4000
    });
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
    return { link: '#', judul: 'Maaf bot tidak ketemu jawabannya di google'}
  }
}

module.exports = getFromGoogle

