/*
 * @Author: MrAlenZhong
 * @Date: 2023-03-23 16:30:38
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2023-03-27 17:46:15
 * @Description: 
 */
const { cosmiconfig } = require('cosmiconfig');
const pc = require('picocolors');

const build = require('./build');
const save = require('./save');
const push = require('./push')
const bootstrap = {
    run: (argv, yargs) => {
        cosmiconfig("horloge").search()
        .then((result) => {
            if(!result){
                console.log(pc.bgRed(
                    pc.white(`No config file found,pleace create a config file in the root of your project`)
                ));
                return
            }
            if(!result.config[process.title]){
                console.log(pc.bgRed(
                    pc.white(`The "${process.title}" property was not found in the configuration file`)
                ));
                return 
            }
            if(argv[0] === 'build'){
                build(result.config[process.title],argv,yargs);
            }else if(argv[0] === 'save'){
                save(result.config[process.title],argv,yargs);
            }else if(argv[0] === 'push'){
                push(result.config[process.title],argv,yargs);
            }else{
                console.log(pc.bgRed(pc.white(`  💣  error: not found command ${argv[0]}`) ))
            }
        })
        .catch((error) => {
            // TODO Do something constructive.
            console.log(pc.bgRed(pc.white(`  🌡️  error: ${error}`) ))
        });

    }
};

module.exports = bootstrap;