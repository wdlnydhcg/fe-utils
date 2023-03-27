/*
 * @Author: MrAlenZhong
 * @Date: 2023-03-24 10:59:59
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2023-03-27 17:48:41
 * @Description: 
 */

const execa = require('execa');
const dayjs = require('dayjs');
const pc = require('picocolors');
const pkgUp = require('pkg-up');
const path = require('path');
let childProcess = require("child_process");

const save = async (config,argv,yargs) => {
    const propData = yargs.wrap(Math.min(150, yargs.terminalWidth()))
        .epilogue(`For more information, see our docs at https://github.com/wdlnydhcg/fe-utils/tree/main/packages/${process.title}`)
        .group('help', 'Global Options:')
        .option('a', {
            alias: 'arg',
            describe: 'The environment to run the command in',
            type: 'string',
        })
        .parse(argv);

        const imagesName = typeof config.imagesName === 'string' ? 
            config.imagesName : 
            config.imagesName({
                time : {
                    year: dayjs().format('YYYY'),
                    month: dayjs().format('MM'),
                    date: dayjs().format('DD'),
                    hour: dayjs().format('HH'),
                    minute: dayjs().minute('mm'),
                    second: dayjs().second('ss'),
                    weekDay: dayjs().day()
                },
                argv : propData.arg,
                version : require(pkgUp.sync()).version
            })
    try {
        const pkgPath = await pkgUp()
        const version = require(pkgPath).version;
        const dockerDir = config['save'].dockerDir;
        childProcess.spawn('docker', [
                "push",
                `${imagesName}:${version}`,
            ], {
            stdio: "inherit",
            shell: true,
        });
    } catch (error) {
        console.log(pc.bgRed(error));
        
    }

}
module.exports = save;