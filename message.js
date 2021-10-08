inputFilePath = "people.csv";

const { load } = require('csv-load-sync');

const messages = load(inputFilePath);

// put the CSV headings in here that you want to find and replace
const replaceTokens = [
    "NAME",
    'DATE'
];



// this is your SMS message with the replace tokens wrapped in {}
const message = `Dear {NAME},
Your message here with {DATE} or other tokens
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


    return {...data, message: msg }
});
// .filter((data) => {
//     return data.PERSON == "James McDonald"
// });

// console.log(msgs)

module.exports = { messages: msgs }