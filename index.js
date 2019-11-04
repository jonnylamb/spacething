const puppeteer = require('puppeteer');

const URL = 'https://tickets.spacecenter.org/webstore/shop/ViewItems.aspx?CG=SCHGACG2017&C=SCHGAC2017';
const month = new Date().getMonth();

async function run(printErr) {
    // ouch...
    const browser = await puppeteer.launch({args: ['--no-sandbox']});

    console.log('gogogo');

    try {
        const page = await browser.newPage();

        // open page
        await page.goto(URL);
        await page.waitFor(5000);

        // click 'Select Date/Time'
        await page.click('#page > div.container.main > div:nth-child(4) > div.viewItems.ng-scope > div.module.ng-scope > div.sub-category.b-b-all.ng-scope.open > div.list-container.m-b-all > div > div:nth-child(8) > div > div.row.ng-scope > div > div.row.m-t-all > div.c.c-100-c > span > button')
        await page.waitFor(5000);

        async function isJanuary() {
            const selected = await page.evaluate(() => {
                const s = document.querySelector('#page > div:nth-child(6) > div.multi-time-selector-modal.calendar-modal.event-time.ng-scope > div.modal.info-modal.w-auto-c.ng-scope > div > div:nth-child(3) > div > div > div > div > div.calendar-header > div.row.month-name > div.c.c-40-all.month > span > select')
                return s.options[s.selectedIndex].text;
            })
            return selected === 'January';
        };

        while (!await isJanuary()) {
            // click next month
            await page.click('#page > div:nth-child(6) > div.multi-time-selector-modal.calendar-modal.event-time.ng-scope > div.modal.info-modal.w-auto-c.ng-scope > div > div:nth-child(3) > div > div > div > div > div.calendar-header > div.row.month-name > div:nth-child(4) > span')
            await page.waitFor(5000);
        }

        // find the right day
        const dayIsDisabled = await page.evaluate(() => document.querySelector('div[aria-label="1/13/2020"]').getAttribute('aria-disabled'))

        // work out
        const available = dayIsDisabled !== 'true';
        if (available) {
            console.log('booking for day (13th Jan) could be available');
        }

    } catch (error) {
        if (printErr) {
            console.error(error);
        }
    }

    browser.close();
}

async function threeTimes() {
    for (i = 0; i < 3; i++) {
        await run(i == 2);
    }
}

threeTimes()
