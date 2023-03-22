import fs from "fs";
import { resolve, join, sep } from "path";
import * as compressing from "compressing";
import pc from "picocolors";
const { existsSync, readdirSync, statSync, unlinkSync, rmdirSync } = fs;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default function archive(options) {
    const filesDir = resolve(process.cwd(), (options === null || options === void 0 ? void 0 : options.filesDir) || "dist");
    const outDir = resolve(process.cwd(), filesDir, "../");
    const archiveName = (options === null || options === void 0 ? void 0 : options.archiveName) || filesDir.split(sep)[filesDir.split(sep).length - 1];
    const archiveType = (options === null || options === void 0 ? void 0 : options.archiveType) || "tar";
    const isClean = (options === null || options === void 0 ? void 0 : options.archiveAfterClean) || true;
    function cleanFiles(dirPath) {
        var files = [];
        if (existsSync(dirPath)) {
            files = readdirSync(dirPath);
            files.forEach(file => {
                let path = join(dirPath, file);
                if (statSync(path).isDirectory()) {
                    cleanFiles(path);
                }
                else {
                    if (file === archiveName)
                        return;
                    unlinkSync(path);
                }
            });
            rmdirSync(dirPath);
        }
    }
    function handleTar() {
        console.log(pc.blue(`🗽 archive folder ${filesDir} `));
        if (fs.existsSync(filesDir)) {
            if (!fs.existsSync(outDir)) {
                fs.mkdirSync(outDir);
            }
            compressing.tar.compressDir(filesDir, join(outDir, `${archiveName}.${archiveType}`))
                .then(() => {
                console.log(pc.green(`🎉 archive done~!  `) + "" + pc.green(`${join(outDir, `${archiveName}.${archiveType}`)}`));
                if (isClean) {
                    cleanFiles(filesDir);
                }
            })
                .catch((err) => {
                console.log(pc.red(`🌞 ${err} `));
            });
        }
        else {
            console.log(pc.red(` "${filesDir}" folder directory not found! `));
        }
    }
    return {
        name: "vite-plugin-archive-clean",
        enforce: "post",
        apply: 'build',
        writeBundle() {
            console.log("archiveType  1", archiveType);
            try {
                console.log("archiveType 2 ", archiveType);
                if (archiveType === 'zip') {
                    // handleZip();
                }
                else if (archiveType === 'tar') {
                    handleTar();
                }
            }
            catch (error) {
                console.log(`🐻‍❄️ ${error}`);
            }
        },
    };
}
