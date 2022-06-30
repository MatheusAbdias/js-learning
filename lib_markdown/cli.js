const chalk = require('chalk');
const readFile = require('./index')
const validateUrls = require('./http-validators')

const path = process.argv;

async function processText(path) {
    const results = await readFile(path[2])

    if (path.indexOf("validate") > -1) {
        console.log(chalk.yellow("Links Validados"), await validateUrls(results))
    }
    else {
        console.log(chalk.yellow("lista de links"), results);
    }
}

processText(path);
