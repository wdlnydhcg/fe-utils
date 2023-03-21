/*
 * @Author: MrAlenZhong
 * @Date: 2023-03-21 19:38:45
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2023-03-21 21:07:24
 * @Description: 
 */
import { PluginOption } from "vite";
import fs from "fs";
import path from "path";
import JSZip from "jszip";
const { existsSync, readdirSync, statSync, unlinkSync, rmdirSync } = fs;
const { resolve, join } = path
export interface Options {
  /**
   * Input Directory
   * @default `dist`
   */
  inDir?: string;
  /**
   * Output Directory
   * @default `dist-zip`
   */
  outDir?: string;
  /**
   * Zip Archive Name
   * @default `dist.zip`
   */
  outFileName?: string;
  /**
   * clean Directory
   * @default `""`
   */
  cleanDir?: string | string[];
}

export default function zipPack(options?: Options): PluginOption {
  const inDir = options?.inDir || "dist";
  const outDir = options?.outDir || "dist-zip";
  const outFileName = options?.outFileName || "dist.zip";
  const cleanDir = options?.cleanDir || "";

  function addFilesToZipArchive(zip: JSZip | null, inDir: string) {
    const listOfFiles = fs.readdirSync(inDir);

    listOfFiles.forEach((fileName) => {
      const filePath = path.join(inDir, fileName);
      const file = fs.statSync(filePath);

      if (file?.isDirectory()) {
        const dir = zip!.folder(fileName);
        addFilesToZipArchive(dir, filePath);
      } else {
        zip!.file(fileName, fs.readFileSync(filePath));
      }
    });
  }

  function createZipArchive(zip: JSZip) {
    zip
      .generateAsync({
        type: "nodebuffer",
        compression: "DEFLATE",
        compressionOptions: {
          level: 9,
        },
      })
      .then((file) => {
        const fileName = path.join(outDir, outFileName);
        if (fs.existsSync(fileName)) {
          fs.unlinkSync(fileName);
        }

        fs.writeFileSync(fileName, file);
      });
  }

  function cleanFiles(dirPath:string) {
    if(existsSync(dirPath)) {
      let files = readdirSync(dirPath)
      files.forEach(file => {
        let path = join(dirPath, file)        
        if(statSync(path).isDirectory()) {
          cleanFiles(path)
          rmdirSync(path)
        }else {
          if(file === outFileName) return
          unlinkSync(path)
        }
      })
    }
    
  }

  return {
    name: "vite-plugin-archive-clean",
    apply: "build",
    closeBundle() {
      try {
        console.log("\x1b[36m%s\x1b[0m", `Zip packing - "${inDir}" folder :`);
        if (fs.existsSync(inDir)) {
          if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir);
          }
          const zip = new JSZip();

          console.log("\x1b[32m%s\x1b[0m", "  - Preparing files.");
          addFilesToZipArchive(zip, inDir);

          console.log("\x1b[32m%s\x1b[0m", "  - Creating zip archive.");
          createZipArchive(zip);
          if(typeof cleanDir === "string" ? !!cleanDir : !!cleanDir.length){
            console.log("\x1b[32m%s\x1b[0m", "  - Clean Dir.")
            if(Array.isArray(cleanDir)) {
              for(let i = 0 , len = cleanDir.length; i < len; i++) {
                cleanFiles(resolve(process.cwd(), cleanDir[i]))
              }
            }else {
              cleanFiles(resolve(process.cwd(), cleanDir))
            }
          }
          console.log("\x1b[32m%s\x1b[0m", "  - Done.");
        } else {
          console.log(
            "\x1b[31m%s\x1b[0m",
            `  - "${inDir}" folder does not exist!`
          );
        }
      } catch (error) {
        console.log(
          "\x1b[31m%s\x1b[0m",
          "  - Something went wrong while building zip file!"
        );
      }
    },
  };
}
