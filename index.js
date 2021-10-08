const puppeteer = require("puppeteer-core");

const { messages } = require("./message");

const addNumbers = async(page, number) => {
    await page.waitForSelector("input.input", { visible: true });
    await page.type("input.input", number + String.fromCharCode(13));
};

const loopItems = async(page, message) => {

    console.log(`Sending message to ${message.PERSON} on ${message.NUMBER}`)
    await addNumbers(page, message.NUMBER);

    await page.waitForSelector("textarea.input", { visible: true });

    // if you press enter in the message input field
    // it submits the message
    // so use Shift + Enter to enter linebreak the text entry
    sp = message.message.split("\n");

    for (let i = 0; i < sp.length; i++) {
        await page.type("textarea.input", sp[i]);
        if (i !== sp.length - 1) {
            await page.keyboard.down("Shift");
            await page.keyboard.type(String.fromCharCode(13));
            await page.keyboard.up("Shift");
        }
    }
    // submit
    await page.type("textarea.input", String.fromCharCode(13));
    await page.waitFor(2000);
    // body > mw - app > mw - bootstrap > div > main > mw - main - container > div > mw - main - nav > div > mw - fab - link > a
    await page.waitForSelector('div > mw-fab-link > a')
        // body > mw-app > mw-bootstrap > div > main > mw-main-container > div > mw-main-nav > div > mw-fab-link > a;
    const [button] = await page.$x("//a[@href='/web/conversations/new']");
    button.click();

    await page.waitFor(3000);

};
(async() => {
    const browser = await puppeteer.launch({
        executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        headless: false,
        userDataDir: "C:\\Users\\jalexander\\AppData\\Local\\Google\\Chrome\\User Data\\Default"
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1024,
        height: 768,
    });

    await page.goto("https://messages.google.com/web/conversations/new");

    for (let i = 0; i < messages.length; i++) {
        await loopItems(page, messages[i]);
    }

    //await page.screenshot({ path: "example.png" });

    await browser.close();
})();