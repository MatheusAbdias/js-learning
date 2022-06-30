const chalk = require('chalk');
const fs = require('fs');

function errors(err) {
  throw new Error(chalk.red(err.code));
}

function extractlinks(text) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const linksList = [];
  let temp;
  while ((temp = regex.exec(text)) != null) {
    linksList.push({ [temp[1]]: temp[2] })
  }

  return !linksList.length ? 'No have links in file' : linksList;
}

async function readFile(filepath) {
  const enconding = 'utf-8';
  try {
    const text = await fs.promises.readFile(filepath, enconding);
    return extractlinks(text);
  }
  catch (err) {
    errors(err);
  }
}

module.exports = readFile;
