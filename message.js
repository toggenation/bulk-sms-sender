inputFilePath = "csv/invite-test.csv";

const { load } = require('csv-load-sync');

const messages = load(inputFilePath);

// put the CSV headings in here that you want to find and replace
const replaceTokens = [
    "FirstName",
    "LastName",
    "Date"
];

// this is your SMS message with the replace tokens wrapped in {}
const message = `Hi {FirstName} {LastName},

I wish to invite you to an event on {Date}. Please respond if you would like to come.

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