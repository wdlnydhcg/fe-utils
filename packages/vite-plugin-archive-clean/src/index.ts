/*
 * @Author: MrAlenZhong
 * @Date: 2023-03-21 19:38:45
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2023-03-22 21:03:59
 * @Description: 
 */
import { PluginOption } from "vite";
import fs from "fs";
import { resolve, join, sep } from "path";
import * as compressing from "compressing";
import pc from "picocolors";
const { existsSync, readdirSync, statSync, unlinkSync, rmdirSync } = fs;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export interface Options {
  /**
   * Input Directory
   * @default `dist`
   */
  filesDir?: string;
  /**
   * Archive Name
   * @default `dist.tar`
   */
  archiveName?: string;
  /**
   * ArchiveType
   * @default `tar`
   */
  archiveType?: "tar" | "zip" | "tgz";
  /**
   * archive after clean Input Directory
   * @default true
   */
  archiveAfterClean?: boolean;
}

export default function archive(options?: Options): PluginOption {
  
  const filesDir = resolve(process.cwd(), options?.filesDir || "dist") ;
  const outDir = resolve(process.cwd(), filesDir, "../");
  const archiveName = options?.archiveName || filesDir.split(sep)[filesDir.split(sep).length -1];
  const archiveType = options?.archiveType || "tar";
  const isClean = options?.archiveAfterClean || true;

  function cleanFiles(dirPath:string) {
    var files = [];
    if(existsSync(dirPath)) {
      files = readdirSync(dirPath)
      files.forEach(file => {
        let path = join(dirPath, file)        
        if(statSync(path).isDirectory()) {
          cleanFiles(path)
        }else {
          if(file === archiveName) return
          unlinkSync(path)
        }
      })
      rmdirSync(dirPath)
    }
  }  

  function handleTar(){
    console.log(pc.blue(`🗽 archive folder ${filesDir} `));

    if (fs.existsSync(filesDir)) {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }
      compressing.tar.compressDir(filesDir, join(outDir, `${archiveName}.${archiveType}`))
      .then(()=>{
        console.log(pc.green(`🎉 archive done~!  `) + ""+pc.green(`${join(outDir, `${archiveName}.${archiveType}`)}`))
        if(isClean){
          cleanFiles(filesDir);
        }
      })
      .catch((err)=>{
        console.log(pc.red(`🌞 ${err} `));
      })      
    } else {
      console.log(pc.red(` "${filesDir}" folder directory not found! `));
    }
  }
  return {
    name: "vite-plugin-archive-clean",
    enforce: "post",
    apply: 'build',
    writeBundle() {
      console.log("archiveType  1",archiveType);
        try {
          console.log("archiveType 2 ",archiveType);
          if(archiveType === 'zip'){
            // handleZip();
          }else if(archiveType === 'tar'){
            handleTar();
          }
        } catch (error) {
          console.log(`🐻‍❄️ ${error}`)
        }

    },
  };
}
