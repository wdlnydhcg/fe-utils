/*
 * @Author: MrAlenZhong
 * @Date: 2023-03-21 20:19:40
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2023-03-22 19:37:09
 * @Description: 
 */
import path from 'path'
import archive from "@horloge/vite-plugin-archive-clean";
import { defineConfig } from "vite"
export default defineConfig({
    build: {
        outDir: './dist',
    },
    plugins: [
        archive({
            filesDir: "./dist",
            // archiveName: "example",
            // archiveType: "tar"
        })
    ]
})