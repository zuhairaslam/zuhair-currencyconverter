#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
console.log(chalk.bold.rgb(255, 255, 102)(`\n   <<<====================================>>>`));
console.log(chalk.bold.rgb(255, 255, 102)(`<<<=======>>>  ${chalk.redBright.bold('CURRENCY CONVERTER')}  <<<=======>>>`));
console.log(chalk.bold.rgb(255, 255, 102)(`   <<<====================================>>>\n`));
const data = require('./data.json');
let selected;
let sleep = () => new Promise((r) => setTimeout(r, 2000));
async function currencyInput(c, data) {
    const input = await inquirer.prompt([{
            name: chalk.rgb(249, 140, 255)(`${c} Currency`),
            type: 'list',
            choices: Object.keys(data).filter((val) => val !== selected)
        }]);
    let value = await input[`\x1B[38;2;249;140;255m${c} Currency\x1B[39m`];
    selected = value;
    return value;
}
async function AmountInput() {
    let value;
    while (true) {
        const input = await inquirer.prompt([{
                name: chalk.rgb(249, 140, 255)("Enter Amount"),
                type: 'number',
            }]);
        value = await input['\x1B[38;2;249;140;255mEnter Amount\x1B[39m'];
        if (value) {
            break;
        }
    }
    return value;
}
function convertCurrency(from, to, amount, data) {
    selected = undefined;
    return ((data[to] / data[from]) * amount).toFixed(3);
}
// Program Entry Point
while (true) {
    let amount = await AmountInput();
    let from_currency = await currencyInput('From', data);
    let to_currency = await currencyInput('TO', data);
    let converted_amount = convertCurrency(from_currency, to_currency, amount, data);
    //Spinner
    const spinner = createSpinner('Converting').start();
    await sleep();
    spinner.success({ text: "Converted successfully" });
    console.log(chalk.bgBlackBright.whiteBright.bold(`${amount} ${from_currency} = ${converted_amount} ${to_currency}`));
    const input = await inquirer.prompt([
        {
            name: chalk.rgb(255, 255, 160)(`Do You Want To Exit?`),
            type: "confirm",
        }
    ]);
    let value = await input['\x1B[38;2;255;255;160mDo You Want To Exit?\x1B[39m'];
    if (value) {
        break;
    }
    console.log(chalk.whiteBright('\n================================================================\n'));
}
