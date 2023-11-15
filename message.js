inputFilePath = "ringwood.csv";

const { load } = require('csv-load-sync');

const messages = load(inputFilePath);

// put the CSV headings in here that you want to find and replace
const replaceTokens = [
    "FirstName"
];



// this is your SMS message with the replace tokens wrapped in {}
const message = `Hi {FirstName},
The last SMS was part of a bulk send and I know you already know who I am... So if you can help with attendance in the Auditorium or another area please let me know.

WCL
James
`;

const replaceStrings = (tokenToReplace, replaceWith, str) => {
    return str.replace('{' + tokenToReplace + '}', replaceWith)
}

// console.log(replaceTokens)
const msgs = messages.map((data) => {
    let msg = message;

    replaceTokens.forEach(token => {
        msg = replaceStrings(token, data[token], msg);
    })


    return { ...data, message: msg }
});
// .filter((data) => {
//     return data.PERSON == "James McDonald"
// });

// console.log(msgs)

module.exports = { messages: msgs }