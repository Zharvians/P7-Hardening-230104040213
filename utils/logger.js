const chalk = require('chalk');

exports.logInfo = (msg) => console.log(chalk.cyan(`[INFO] ${new Date().toISOString()} → ${msg}`));
exports.logSuccess = (msg) => console.log(chalk.green(`[OK] ${new Date().toISOString()} → ${msg}`));
exports.logError = (msg) => console.log(chalk.red(`[ERROR] ${new Date().toISOString()} → ${msg}`));
