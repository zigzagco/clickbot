const TelegramBot = require('node-telegram-bot-api');
const puppeteer = require("puppeteer-extra");
const {executablePath} = require("puppeteer");
const bot = new TelegramBot('6080703350:AAFCOWrdz6X7MXZucdCjZ8pHvKWhosXPcw8', { polling: true });
const Excel = require('exceljs')
const fs = require("fs");
const randomUseragent = require("random-useragent");
const {GoogleSpreadsheet} = require("google-spreadsheet");
const creds = require("./proxybot-374920-634195a0e3b1.json");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin())

const paths2 = './extentions/majdfhpaihoncoakbjgbdhglocklcgno/2.6.0_0';
const paths3 = './extentions/lpejglcfpkpbjhmnnmpmmlpblkcmdgmi/1.9.3_0';
const paths4 = './extentions/bihmplhobchoageeokmgbdihknkjbknd/4.1.0_0';



const task = (msg,text,docName,startTime,endTime,callback) => {
    // asynchronous code for task
    (async ()=>{
        console.log(text)
        await fs.stat(docName, function(err, stats) {
            if (err) {
                console.log("Файл не найден");
                initsheet(docName,text)
            } else {
                console.log("Файл найден");
                //addrowsheet('exel/Sammple.xlsx',{ip:'1234567890'})
            }
        });
        await sleep(5000)

        const currentTimeStart = new Date().getHours()
        const progresmsg = await bot.sendMessage(msg.chat.id, 'Выполнено 0/'+text.key4)
        console.log(progresmsg.message_id)
        await sleep(5000)
        let stopped = false
        while (!stopped){
            const ivalue=await getivalue(docName)
            if (ivalue[0]+1 >= ivalue[1]){
                stopped=true
            }else{
                let chid=msg.chat.id
                let essage_id=progresmsg.message_id
                await bot.editMessageText('Выполнено ' + ivalue[0],{chat_id:chid,message_id:essage_id})
            }
            ////////
            try {
                let randint = await randomInteger(1, 3)
                    if (randint === 1) {
                        await startBrowserPath1(docName,text)
                    } else {
                        if (randint === 2) {
                            await startBrowserPath2(docName,text)
                        } else {
                            await startBrowserPath3(docName,text)
                        }
                    }
                        //await mainPage.setUserAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1')
                        console.log('ok ' + i)
            }catch (e){
                console.log('vpn strted')
            }
            ////////

            if(new Date().getHours()-currentTimeStart>=endTime-startTime){
                await callback(false)
                stopped=true
                return false;
            }
        }
        await callback(true)
    })()
};

const runTask = (msg,text,docName,startTime,endTime) => {
    const currentTime = new Date().getHours();
    if (currentTime >= startTime && currentTime < endTime) {
        task(msg,text,docName,startTime,endTime,(taskCompleted) => {
            if (taskCompleted) {
                console.log("Task completed. Stopping execution.");
                bot.sendMessage(msg.chat.id,'работа завершена')
                bot.sendDocument(msg.chat.id,docName)
                return;
            } else {
                console.log('repeat')
                setTimeout(function(){runTask(msg,text,docName,startTime,endTime)}, (endTime - currentTime) * 60 * 60 * 1000);
            }
        });
    } else {
        console.log("Pausing task execution until next time period.");
        setTimeout(function(){runTask(msg,text,docName,startTime,endTime)}, (startTime - currentTime + 24) % 24 * 60 * 60 * 1000);
    }
};

////////////////////////////    tg bot   /////////////////////////////

bot.onText(/\/add_task (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const str = match[1];
    let jsonString=strToJson(str,msg)
    if (jsonString!=null){
        const arrayTime = jsonString.key3.split("-");
        let docName=`exel/report_${msg.from.username}_${msg.message_id}.xlsx`
        console.log(docName)
        bot.sendMessage(chatId,'рассчетное время выполнения:'+(parseInt(jsonString.key4)*6)+' минут')
        runTask(msg,jsonString,docName,parseInt(arrayTime[0]), parseInt(arrayTime[1]));
    }else {
        console.log('incoect string')
    }
    //bot.sendMessage(chatId, `Выполнение запущено: `);
});



async function initsheet(docName,text){
    let workbook = new Excel.Workbook()
    let worksheet = workbook.addWorksheet('Debtors')
    worksheet.columns = [
        {header: 'Ip', key: 'ip',width:20},
        {header: 'Time', key: 'time'},
        {header: 'Date', key: 'date'},
        {header: 'Country', key: 'country'},
        {header: 'Chat id', key: 'chatid'},
        {header: 'количесво посещений', key: 'countnow',width:20},
        {header: 'количесво посещений требуется', key: 'countrequaried',width:30},
    ]
    worksheet.addRow({ip: ' ', time: ' ', date: ' ',countnow:0,countrequaried:parseInt(text.key4)});
    await workbook.xlsx.writeFile(docName).then(r => {
        console.log('sheet inited')
    })
    return [worksheet,workbook,docName]
}
async function getivalue(docName){
    let workbook = new Excel.Workbook()
    return await workbook.xlsx.readFile(docName).then(function () {
        let worksheet = workbook.getWorksheet('Debtors');
        let row = worksheet.getRow(2)
        let rowValueI = row.getCell(6).value
        let rowValueINeded = row.getCell(7).value
        console.log(rowValueI+'    '+rowValueINeded)
        return [rowValueI,rowValueINeded];
    })
}
async function rewriteValue(docName){
    let workbook = new Excel.Workbook()
    return await workbook.xlsx.readFile(docName).then(function () {
        let worksheet = workbook.getWorksheet('Debtors');
        let row = worksheet.getRow(2)
        let rowvalue=row.getCell(6).value
        row.getCell(6).value=rowvalue+1
        row.commit()
        return workbook.xlsx.writeFile(docName);
    })
}
async function addrowsheet(docName,ip,time,date,country){
    let workbook = new Excel.Workbook()
    await workbook.xlsx.readFile(docName).then(function () {
        let worksheet=workbook.getWorksheet('Debtors');

        //Get Lastrow
        let row = worksheet.addRow([ip,time,date,country])
        console.log('row adeed')
        row.commit()
        return workbook.xlsx.writeFile(docName);

    });
}

function strToJson(textString,task){
    const array = textString.split(",");
    const expectedKeys = ["key1", "key2", "key3", "key4"];
    const timeIntervalRegex = /^\d{1,2}-\d{1,2}$/;
    const numberRegex = /^\d+$/;

    let jsonObject = {};
    let count = 0;
    for (const element of array) {
        let [key, value] = element.split(":");
        jsonObject[key] = value;
        count++;
    }

    //console.log(jsonObject);

    if (count === 4) {
        let keysAreCorrect = true;
        for (const key in jsonObject) {
            if (!expectedKeys.includes(key)) {
                keysAreCorrect = false;
                break;
            }
        }

        if (keysAreCorrect) {
            if (!timeIntervalRegex.test(jsonObject.key3)) {
                console.error('Error: key3 does not contain a valid time interval in xx-xx format');
                bot.sendMessage(task.chat.id, 'key3 не содержит временного интервала в hh-hh формате');
                return null;
            } else if (!numberRegex.test(jsonObject.key4)) {
                console.error('Error: key4 does not contain only numbers');
                bot.sendMessage(task.chat.id, 'key4 должен содержать только числа');
                return null;
            } else {
                console.log('JSON object is valid');
                bot.sendMessage(task.chat.id, 'все ок, задача добавлена');
                return jsonObject;
            }
        } else {
            console.error('Error: The keys in the string are incorrect.');
            bot.sendMessage(task.chat.id, 'некоректное выражение');
            return null;
        }
    } else {
        console.error('Error: The number of keys is not 4.');
        bot.sendMessage(task.chat.id, 'пораметров должно быть 4');
        return null;
    }
}
async function start_browser(){
        const browser = await puppeteer.launch({
            headless:false,
            executablePath: executablePath(),
            ignoreHTTPSErrors: true,
            args: [
                '--no-sandbox',
            ]
        })
        const [mainPage] = await browser.pages();
        await mainPage.waitForTimeout(5000)
        await mainPage.close()
        await browser.close()
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function startBrowserPath1(docName,text){
    const browser = await puppeteer.launch({
        headless:false,
        executablePath: executablePath(),
        ignoreHTTPSErrors: true,
        args: [
            '--no-sandbox',
            `--load-extension=${paths2}`
        ]
    })
    const [mainPage] = await browser.pages();
    //await mainPage.setUserAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1')
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
        await mainPage.waitForTimeout(10000)
        const ipchek=await mainPage.evaluate(() => {
            return document.querySelector('body > pre').innerText
        }).catch(e => console.dir(e));
        console.log(ipchek)
        await gotoLademiLink(mainPage,ipchek,randomint,docName,text)
        await mainPage.close()
        await browser.close()

    }catch (e){
        console.log(e)
        await mainPage.close()
        await browser.close()
    }
}
async function startBrowserPath2(docName,text){
    const browser = await puppeteer.launch({
        headless:false,
        executablePath: executablePath(),
        ignoreHTTPSErrors: true,
        args: [
            '--no-sandbox',
            `--load-extension=${paths3}`
        ]
    })
    const [mainPage] = await browser.pages();
    //await mainPage.setUserAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1')
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
            await mainPage.waitForTimeout(5000)
            const ipchek=await mainPage.evaluate(() => {
                return document.querySelector('body > pre').innerText
            }).catch(e => console.dir(e));
            console.log(ipchek)
            await gotoLademiLink(mainPage,ipchek,'Undefined',docName,text)
            await mainPage.close()
            await browser.close()
        }
    }catch (e){
        console.log(e)
        await browser.close()
    }
}
async function startBrowserPath3(docName,text){
    const browser = await puppeteer.launch({
        headless:false,
        executablePath: executablePath(),
        ignoreHTTPSErrors: true,
        args: [
            '--no-sandbox',
            `--load-extension=${paths4}`
        ]
    })
    const [mainPage] = await browser.pages();
    // await mainPage.setUserAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1')
    try {
        console.log('script started')
        await mainPage.waitForTimeout(5000)
        await mainPage.goto('chrome-extension://bihmplhobchoageeokmgbdihknkjbknd/panel/index.html',);
        await mainPage.waitForTimeout(10000)
        await mainPage.reload()
        await clickSelector(mainPage,'#Main > div.disconnectedDescription > div > span')
        const randomint=await randomInteger(0,5)
        switch (randomint){
            case 0:{
                await anotherclickSelector(mainPage,'#Locations > div.list > div:nth-child(8)')
                break;
            }
            case 1:{
                await anotherclickSelector(mainPage,'#Locations > div.list > div:nth-child(7)')
                break;
            }
            case 2:{
                await anotherclickSelector(mainPage,'#Locations > div.list > div:nth-child(5)')
                break;
            }
            case 3:{
                await anotherclickSelector(mainPage,'#Locations > div.list > div:nth-child(6)')
                break;
            }
            case 4:{
                await anotherclickSelector(mainPage,'#Locations > div.list > div:nth-child(4)')
                break;
            }
            case 5:{
                await anotherclickSelector(mainPage,'#Locations > div.list > div:nth-child(3)')
                break;
            }
        }
        await mainPage.waitForTimeout(5000)
        await clickSelector(mainPage,'#ConnectionButton')
        await mainPage.waitForTimeout(10000)
        await mainPage.goto('https://api.ipify.org')
        await mainPage.waitForTimeout(5000)
        const ipchek=await mainPage.evaluate(() => {
            return document.querySelector('body > pre').innerText
        }).catch(e => console.dir(e));
        console.log(ipchek)
        await gotoLademiLink(mainPage,ipchek,'Undefined',docName,text)
        await mainPage.close()
        await browser.close()
        //await setData(ipchek,'Undefined',docName)
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
async function anotherclickSelector(page,selector) {
    const handle = await page.waitForSelector(selector)
    handle.evaluate((h)=>{h.click()})
}

async function gotoLademiLink(page,ipchek,randomint,docName,text) {
    try {
        let useragent= randomUseragent.getRandom();
        /*await page.goto('https://www.lademi.by/')
        await page.waitForTimeout(60000*2)
        await page.goto('https://www.lademi.ru/')
        await page.waitForTimeout(60000*2)*/
        await page.goto('https://www.google.com/',{waitUntil:'domcontentloaded'})
        //#L2AGLb
        const myLocalValue = text.key1;
        const domen = text.key2
        try {
            await page.waitForSelector('#L2AGLb')
            await page.click('#L2AGLb')
            await page.waitForTimeout(5000)
            await page.click('input[type="text"]')
            await page.keyboard.type(myLocalValue);
            //await page.$eval('input[type="text"]', (el, value) => el.value = value, myLocalValue);
            await page.keyboard.press('Enter');
            await page.waitForTimeout(10000)

            const linkHandlers = await page.$x(`//cite[contains(text(), 'https://${domen}')]`);
            if (linkHandlers.length > 0) {
                await page.setUserAgent(useragent)
                await linkHandlers[0].click();
                console.log('click')
                await page.waitForTimeout(60000)
                await setData(ipchek,randomint,docName)
            } else {
                throw new Error("Link not found");
            }
        }catch (e) {
            await page.$eval('input[type="text"]', (el, value) => el.value = value, myLocalValue);
            await page.keyboard.press('Enter');
            await page.waitForTimeout(10000)
            const linkHandlers = await page.$x(`//cite[contains(text(), 'https://${domen}')]`);
            if (linkHandlers.length > 0) {
                await page.setUserAgent(useragent)
                await linkHandlers[0].click();
                console.log('click')
                await page.waitForTimeout(240000)
                await setData(ipchek,randomint,docName)
            } else {
                throw new Error("Link not found");
            }
        }

        //await page.waitForSelector(".LC20lb", {visible: true});
        //document.querySelectorAll('cite')
        /*const searchResults = await page.$$eval("cite", els =>
            els.map(e => e.innerText)
        );*/
        /*for (let i=0;i<10;i++){
            if (searchResults[i]==='https://www.lademi.by') {
                console.log('good')
            }
            }else {
                console.log('bad')
            }
        }*/
        //console.log();
    }catch (e){
        console.log(e)
        //page.screenshot('error')
    }

}
async function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
async function setData(ip,countryCodeInt,docName) {
    await addrowsheet(docName,ip,get_time(),get_day(),switchCountrycode(countryCodeInt))
    await rewriteValue(docName)
    //await sheet.addRow({ Ip: ip, Time: get_time(),Date:get_day(),Country: switchCountrycode(countryCodeInt)});

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
