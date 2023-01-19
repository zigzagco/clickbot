const puppeteer = require('puppeteer-extra')
const { GoogleSpreadsheet } = require('google-spreadsheet');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const creds = require('./proxybot-374920-634195a0e3b1.json');
const fetch = require("node-fetch");
const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const { executablePath } = require('puppeteer');
puppeteer.use(StealthPlugin())
const paths = '/Users/gleb/WebstormProjects/clickbot/extentions/eppiocemhmnlbhjplcgkofciiegomcon/2.5.10_0';
const paths2 = '/Users/gleb/WebstormProjects/clickbot/extentions/majdfhpaihoncoakbjgbdhglocklcgno/2.6.0_0';
        try {
            (async () => {
                for (let i=0;i<5;i++){
                    //await startBrowser()
                    console.log('ok '+i)
                }
            })();
        }catch (e){
            console.log('vpn strted')
        }
        //const page = await browser.newPage()
        //await page.goto('https://spys.me/socks.txt', { waitUntil: 'networkidle2' });

        //https://raw.githubusercontent.com/mertguvencli/http-proxy-list/main/proxy-list/data.json
        //const str = 'http://' + pathstr[i].ip + ':' + pathstr[i].port
        //console.log(str)
        /* try {
             //await useProxy(page, str);
             //await page.goto('https://api.ipify.org/')
             //await page.goto('chrome-extension://');
             //await page.screenshot({path: 'msedge-extension.png'});
             await page.goto('chrome-extension://eppiocemhmnlbhjplcgkofciiegomcon/popup/index.html#/main');
             await clickSelector(page,'body > div > div > div.simple_layout__body > div > div > div.controls > button.button_pink.agreement_agree')
             await page.waitForTimeout(3000)
             await clickSelector(page,'body > div > div > div.main_layout__body > div.timer-box > div > div')
             await page.waitForTimeout(300000000)
             console.log('ok')
             await page.close()
         }catch (e){
             console.log('error')
             await page.close()
         }*/

/*async function clearInput(page,selector) {
    await page.waitForSelector(selector);
    let input = await page.$(selector);
    await input.click({clickCount: 3});
    await input.press('Backspace');
}
async function clickInput(page,selector,text) {
    await page.waitForSelector(selector);
    await page.type(selector,text);
}*/
async function startBrowser(){
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: executablePath(),
        args: [
            '--no-sandbox',
            `--load-extension=${paths2}`
        ]
    })
    const [mainPage] = await browser.pages();
    try {
        //await page.goto('https://api.ipify.org/')
        //await page.screenshot({path: 'msedge-extension.png'});
        //await page.goto('chrome-extension://eppiocemhmnlbhjplcgkofciiegomcon/popup/index.html#/main');
        await mainPage.waitForTimeout(5000)
        await mainPage.goto('chrome-extension://majdfhpaihoncoakbjgbdhglocklcgno/html/foreground.html',);
        await mainPage.reload()
        await clickSelector(mainPage,'#screen-tooltips-template > div.navigation > div > div:nth-child(3) > div > div > button')
        await clickSelector(mainPage,'#screen-tooltips-template > div.navigation > div > div:nth-child(3) > div > div > button')
        await mainPage.waitForTimeout(3000)
        await clickSelector(mainPage,'#content > div.current-region > div > div.current-region-upper-block')
        switch ('ru'){
            case 'fr':{
                await clickSelector(mainPage,'#region-list > div:nth-child(2) > div.radio.off')
                break;
            }
            case 'ne':{
                break;
            }
            case 'ru':{
                await clickSelector(mainPage,'#region-list > div:nth-child(4) > div.radio.off')
                break;
            }
            case 'si':{
                await clickSelector(mainPage,'#region-list > div:nth-child(5)')
                await clickSelector(mainPage,'#region-list > div:nth-child(5) > div.rah-static.rah-static--height-specific > div > div:nth-child(1) > div.radio.off')
                break;
            }
            case 'uk':{
                await clickSelector(mainPage,'#region-list > div:nth-child(6) > div.radio.off')
                break;
            }
            case 'us':{
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
        await setData(ipchek)
        await mainPage.close()
        await browser.close()
    }catch (e){
        console.log(e)
        await mainPage.close()
        await browser.close()
    }
}
async function clickSelector(page,selector) {
    await page.waitForSelector(selector)
    await page.click(selector)
}
async function setData(ip) {
    const doc = new GoogleSpreadsheet('1dz-VES3gSjfpEgOAnfnIya_JJEvu1ehoscr0nMEnL4Y');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({ Ip: ip, Time: get_time(),Date:get_day() });

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