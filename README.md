# Automate messages.google.com using Puppeteer

Allow sending SMS's from my computer using Android Messages

## To use

### Install the dependencies

```sh
npm i
```

### Configure paths for Google Chrome
Open `index.js` and set your specific values for path to Google Chrome and profile dir

To find these values goto `chrome://version` and look for "Executable Path" and "Profile Path" (for userDataDir)

#### MacOS example

```json
{
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    userDataDir:
      "/Users/jmcd/Library/Application Support/Google/Chrome/Profile 1",
}
```

#### Windows

```json
{
    executablePath:
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    userDataDir:
      "C:\\Users\\jmcd\\AppData\\Local\\Google\\Chrome\\User Data\\Default",
}

```
## Edit the message and the CSV containing names and numbers

Open message.js and edit your message

```js
const message = `Hi {NAME},
Thanks so much to you and all for being a part of events today.

The next event is on {DATE}

WCL
James`;
```

Add mobile numbers firstname lastname separated by commas to `people.csv` look at `people-example.csv`

You can change the headings and information and then edit the message in message.js to find and replace different variables

```csv
NUMBER,NAME,FULL_NAME,DATE
0428 964 633,Jamie,James	McDonald,12/12/12
```

## Link Google Chrome with your Android Messages App
In Google Chrome open [https://messages.google.com](https://messages.google.com), and with Messages on your Android Phone complete device pairing and choose to remember the session so the browser will auto login when you run it via puppeteer.

Make sure your phone is awake, messages is running and on Wi-Fi

## Run using npm

```
npm run start
```
