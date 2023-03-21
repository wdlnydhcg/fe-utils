/*
 * @Author: MrAlenZhong
 * @Date: 2023-03-21 20:19:40
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2023-03-21 20:35:02
 * @Description: 
 */
import path from 'path'
import zipPack from "@horloge/vite-plugin-archive-clean";
export default () => {
    return {
        build: {
            outDir: './dist',
        },
        plugins: [
            zipPack({
                inDir: "./dist",
                outDir: "./dist",
                outFileName: "example.zip",
                cleanDir: "./dist",
            })
        ]
    }
}