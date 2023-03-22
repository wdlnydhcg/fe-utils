"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const compressing = __importStar(require("compressing"));
const picocolors_1 = __importDefault(require("picocolors"));
const { existsSync, readdirSync, statSync, unlinkSync, rmdirSync } = fs_1.default;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function archive(options) {
    const filesDir = (0, path_1.resolve)(process.cwd(), (options === null || options === void 0 ? void 0 : options.filesDir) || "dist");
    const outDir = (0, path_1.resolve)(process.cwd(), filesDir, "../");
    const archiveName = (options === null || options === void 0 ? void 0 : options.archiveName) || filesDir.split(path_1.sep)[filesDir.split(path_1.sep).length - 1];
    const archiveType = (options === null || options === void 0 ? void 0 : options.archiveType) || "tar";
    const isClean = (options === null || options === void 0 ? void 0 : options.archiveAfterClean) || true;
    function cleanFiles(dirPath) {
        var files = [];
        if (existsSync(dirPath)) {
            files = readdirSync(dirPath);
            files.forEach(file => {
                let path = (0, path_1.join)(dirPath, file);
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
        console.log(picocolors_1.default.blue(`🗽 archive folder ${filesDir} `));
        if (fs_1.default.existsSync(filesDir)) {
            if (!fs_1.default.existsSync(outDir)) {
                fs_1.default.mkdirSync(outDir);
            }
            compressing.tar.compressDir(filesDir, (0, path_1.join)(outDir, `${archiveName}.${archiveType}`))
                .then(() => {
                console.log(picocolors_1.default.green(`🎉 archive done~!  `) + "" + picocolors_1.default.green(`${(0, path_1.join)(outDir, `${archiveName}.${archiveType}`)}`));
                if (isClean) {
                    cleanFiles(filesDir);
                }
            })
                .catch((err) => {
                console.log(picocolors_1.default.red(`🌞 ${err} `));
            });
        }
        else {
            console.log(picocolors_1.default.red(` "${filesDir}" folder directory not found! `));
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
exports.default = archive;
