<!--
 * @Author: MrAlenZhong
 * @Date: 2023-03-21 19:38:46
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2023-03-27 17:35:45
 * @Description: @horloge/vite-plugin-archive-clean
-->
# @horloge/vite-plugin-archive-clean
[![npm](https://img.shields.io/npm/v/vite-plugin-archive-clean)](https://www.npmjs.com/package/vite-plugin-archive-clean)

Vite plugin for packing distribution/build folder into a zip file.

## Install

```bash
npm i -D @horloge/docker-image
```

## Usage

## create config file on project root  eg: horloge.config.js

```js
    module.exports = {
    "docker-image":{
        "dockerfileDir" : "./Dockerfile",           //dockerfile path
        "imagesName" : ({time,arg,version}) => {    //docker image name
            return `registry.docker.com/fe/helloworld-${arg}-${version}`        
        },
        "save": {                    //save config      
            "imagesName" : ({time,arg,version}) => {            //save docker image name
                const { year, month, date } = time;
                return `registry.docker.com/fe/helloworld-${year}${month}${date}-${arg}-${version}`
            },
            "dockerDir" : "~",          //save dockerfile path
        },

        "env": (arg) => {               //docker build env
            const arc = arg === 'test' ? "amd64" : "arm64";
            return [
                `--platform=linux/${arc}`,
                `--build-arg ARC_TYPE=${arc}`,
            ]
        }
    }
}
```

## create script in package.json
``` json
...
"scripts": {
    "docker:build-test": "docker-image --arg=test",
    "docker:build-prod": "docker-image --arg=prod"
},
...

```
## License

MIT, see [the license file](./LICENSE)