const puppeteer = require('puppeteer-extra')
const { GoogleSpreadsheet } = require('google-spreadsheet');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const creds = require('./proxybot-374920-634195a0e3b1.json');
const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const { executablePath } = require('puppeteer');
puppeteer.use(StealthPlugin())
const paths = './extentions/eppiocemhmnlbhjplcgkofciiegomcon/2.5.10_0';
const paths2 = './extentions/majdfhpaihoncoakbjgbdhglocklcgno/2.6.0_0';
const paths3 = './extentions/lpejglcfpkpbjhmnnmpmmlpblkcmdgmi/1.9.3_0';
        try {
            (async () => {
                for (let i=0;i<10;i++){
                    await startBrowserPath2()
                    console.log('ok '+i)
                }
            })();
        }catch (e){
            console.log('vpn strted')
        }

async function startBrowserPath1(){
    const browser = await puppeteer.launch({
        headless:false,
        executablePath: executablePath(),
        args: [
            '--no-sandbox',
            `--load-extension=${paths2}`
        ]
    })
    const [mainPage] = await browser.pages();
    try {
        console.log('script started')
        await mainPage.waitForTimeout(5000)
        await mainPage.goto('chrome-extension://majdfhpaihoncoakbjgbdhglocklcgno/html/foreground.html',);
        await mainPage.waitForTimeout(5000)
        await mainPage.reload()
        await clickSelector(mainPage,'#screen-tooltips-template > div.navigation > div > div:nth-child(3) > div > div > button')
        await clickSelector(mainPage,'#screen-tooltips-template > div.navigation > div > div:nth-child(3) > div > div > button')
        await mainPage.waitForTimeout(3000)
        await mainPage.reload()
        await clickSelector(mainPage,'#content > div.current-region > div > div.current-region-upper-block')
        const randomint=await randomInteger(0,5)
        switch (randomint){
            case 0:{
                await clickSelector(mainPage,'#region-list > div:nth-child(2) > div.radio.off')
                break;
            }
            case 1:{
                break;
            }
            case 2:{
                await clickSelector(mainPage,'#region-list > div:nth-child(4) > div.radio.off')
                break;
            }
            case 3:{
                await clickSelector(mainPage,'#region-list > div:nth-child(5)')
                await clickSelector(mainPage,'#region-list > div:nth-child(5) > div.rah-static.rah-static--height-specific > div > div:nth-child(1) > div.radio.off')
                break;
            }
            case 4:{
                await clickSelector(mainPage,'#region-list > div:nth-child(6) > div.radio.off')
                break;
            }
            case 5:{
                await clickSelector(mainPage,'#region-list > div:nth-child(7)')
                await clickSelector(mainPage,'#region-list > div:nth-child(7) > div.rah-static.rah-static--height-specific > div > div:nth-child(1)')
                break;
            }
        }
        await mainPage.waitForTimeout(5000)
        await clickSelector(mainPage,'#mainBtn > button')
        await mainPage.waitForTimeout(10000)
        await mainPage.goto('https://api.ipify.org')
        const ipchek=await mainPage.evaluate(() => {
            return document.querySelector('body > pre').innerText
        }).catch(e => console.dir(e));
        console.log(ipchek)
        await setData(ipchek,randomint)
        await mainPage.close()
        await browser.close()
    }catch (e){
        console.log(e)
        await mainPage.close()
        await browser.close()
    }
}
async function startBrowserPath2(){
    const browser = await puppeteer.launch({
        headless:false,
        executablePath: executablePath(),
        args: [
            '--no-sandbox',
            `--load-extension=${paths3}`
        ]
    })
    const [mainPage] = await browser.pages();
    try {
        console.log('script started')
        await mainPage.waitForTimeout(5000)
        await mainPage.goto('chrome-extension://lpejglcfpkpbjhmnnmpmmlpblkcmdgmi/html/popup.html',);
        await mainPage.waitForTimeout(5000)
        await mainPage.reload()
        await clickSelector(mainPage,'body > div.current-location-wrapper.w-100.d-flex.justify-content-center > div')
        const randomint=await randomInteger(0,20)
        await clickSelector(mainPage,'body > div.location-list-wrapper.w-100.position-absolute.flex-column.align-items-center.d-flex > div.location-list.w-100 > div:nth-child('+randomint+')')
        await mainPage.waitForTimeout(10000)
        const status=await mainPage.evaluate(() => {
            return document.querySelector('#status').innerText
        }).catch(e => console.dir(e));
        if (status==='Not connected'){
            await mainPage.close()
            await browser.close()
        }else {
            await mainPage.goto('https://api.ipify.org')
            const ipchek=await mainPage.evaluate(() => {
                return document.querySelector('body > pre').innerText
            }).catch(e => console.dir(e));
            console.log(ipchek)
            await setData(ipchek,'Undefined')
        }
        await mainPage.close()
        await browser.close()
    }catch (e){
        console.log(e)
        await browser.close()
    }
}
async function clickSelector(page,selector) {
    await page.waitForSelector(selector)
    await page.click(selector)
}
async function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
async function setData(ip,countryCodeInt) {
    const doc = new GoogleSpreadsheet('1dz-VES3gSjfpEgOAnfnIya_JJEvu1ehoscr0nMEnL4Y');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({ Ip: ip, Time: get_time(),Date:get_day(),Country: switchCountrycode(countryCodeInt)});

}
function switchCountrycode(countryCode){
    switch (countryCode){
        case 0:return 'FR'
        case 1:return 'NE'
        case 2:return 'RU'
        case 3:return 'SI'
        case 4:return 'UK'
        case 5:return 'US'
        case 'Undefined':return 'Undefined'
    }
}
function get_time(){
    return (new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds())
}
function get_day(){
    let Data = new Date();
    let Year = Data.getFullYear();
    let Month = Data.getMonth();
    let Day = Data.getDate();
    let fMonth;
// Преобразуем месяца
    switch (Month)
    {
        case 0: fMonth="января"; break;
        case 1: fMonth="февраля"; break;
        case 2: fMonth="марта"; break;
        case 3: fMonth="апреля"; break;
        case 4: fMonth="мае"; break;
        case 5: fMonth="июня"; break;
        case 6: fMonth="июля"; break;
        case 7: fMonth="августа"; break;
        case 8: fMonth="сентября"; break;
        case 9: fMonth="октября"; break;
        case 10: fMonth="ноября"; break;
        case 11: fMonth="декабря"; break;
    }
    return (Day + " " + fMonth + " " + Year)
}
function txtDownloader(link) {
    try {
        const file = fs.createWriteStream("proxy.txt");
        const request = https.get(link, function(response) {
            response.pipe(file);
            file.on("finish", () => {
                file.close();
                console.log("Download Completed");
            });
        });
    }catch (e){
        console.log('error download proxies')
    }
}