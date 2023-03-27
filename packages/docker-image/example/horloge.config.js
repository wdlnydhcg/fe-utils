/*
 * @Author: MrAlenZhong
 * @Date: 2023-03-23 17:06:08
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2023-03-27 17:39:13
 * @Description: 
 */
module.exports = {
    "docker-image":{
        "dockerfileDir" : "./Dockerfile",           //dockerfile path
        "imagesName" : ({time,argv,version}) => {       //docker image name
            return `registry.docker.com/fe/helloworld-${argv}-${version}`
        },
        "save": {               //save config
            "archiveName" : ({time,argv,version}) => {      //save docker image name
                const { year, month, date } = time;
                return `helloworld-${year}${month}${date}-${argv}-${version}.tar`
            },
            "dockerDir" : "~",      //save dockerfile path
        },
        "env": (argv) => {          //docker build env
            const arc = argv === 'test' ? "amd64" : "arm64";
            return [
                `--platform=linux/${arc}`,
                `--build-arg ARC_TYPE=${arc}`,
            ]
        }
    }
}