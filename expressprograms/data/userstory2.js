// const chalk = require("chalk");
// const figlet = require("figlet");

// const message = figlet.textSync("Welcome to Node.js");
// console.log(chalk.green(message));

const name = process.argv[2];

const date = new Date();

console.log(`Hello, ${name}! Today is ${date}`);
