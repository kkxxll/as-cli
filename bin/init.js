const prepare = require("../libs/prepare");
const chalk = require("chalk"); // 色彩
async function init() {
  try {
    await prepare();
    // registerCommand();
  } catch (e) {
    console.error(chalk.red(e.message));
  }
}

module.exports = init;
