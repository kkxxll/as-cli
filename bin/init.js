const prepare = require("../libs/prepare");
const program = require("commander");
const packageConfig = require("../package");
const fs = require('fs')
const fse = require('fs-extra')
const { log, npm, Package } = require("../utils");
const { DEPENDENCIES_PATH } = require("../libs/const");
const chalk = require("chalk"); // 色彩

const allStores = {
  config: null,
};

async function init() {
  try {
    await prepare(allStores);
    registerCommand();
  } catch (e) {
    console.error(chalk.red(e.message));
  }
}

function registerCommand() {
  program.version(packageConfig.version).usage("<command> [options]");

  program
    .command("learn")
    .description("访问git链接")
    .action(() => {
      log.success("asfor脚手架", "欢迎你");
      log.success("作者介绍", "xxx");
    });

  program
    .command("init [type]")
    .description("项目初始化")
    .action(async (type) => {
      try {
        const initPackage = new Package({
          ...allStores.config,
          packageDir: DEPENDENCIES_PATH,
          packageName: "npminstall",
          packageVersion: "^4.0.0",
        });
        await initPackage.install();
      } catch (e) {
        log.error(e.message);
      }
    });

  program
    .command('clean')
    .description('清空缓存文件')
    .option('-a, --all', '清空全部')
    .option('-d, --dep', '清空依赖文件')
    .action((options) => {
      log.notice('开始清空缓存文件');
      if (options.all) {
        cleanAll(allStores.config);
      } else if (options.dep) {
        const depPath = path.resolve(allStores.config.cliHome, DEPENDENCIES_PATH);
        if (fs.existsSync(depPath)) {
          fse.emptyDirSync(depPath);
          log.success('清空依赖文件成功', depPath);
        } else {
          log.success('文件夹不存在', depPath);
        }
      } else {
        cleanAll(allStores.config);
      }
    });

  program.option("--debug", "打开调试模式");

  program.parse(process.argv);

  if (args._.length < 1) {
    program.outputHelp();
    console.log();
  }
}

function cleanAll(config) {
  if (fs.existsSync(config.cliHome)) {
    fse.emptyDirSync(config.cliHome);
    log.success('清空全部缓存文件成功', config.cliHome);
  } else {
    log.success('文件夹不存在', config.cliHome);
  }
}

module.exports = init;
