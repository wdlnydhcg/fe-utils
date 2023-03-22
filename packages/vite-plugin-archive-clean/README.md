<!--
 * @Author: MrAlenZhong
 * @Date: 2023-03-21 19:38:46
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2023-03-22 16:38:58
 * @Description: @horloge/vite-plugin-archive-clean
-->
# @horloge/vite-plugin-archive-clean
[![npm](https://img.shields.io/npm/v/vite-plugin-archive-clean)](https://www.npmjs.com/package/vite-plugin-archive-clean)

Vite plugin for packing distribution/build folder into a zip file.

## Install

```bash
npm i -D @horloge/vite-plugin-archive-clean
```

## Usage

```ts
// vite.config.js

import { defineConfig } from "vite";
import archive from "@horloge/vite-plugin-archive-clean";

export default defineConfig({
  plugins: [archive({
    filesDir: './dist',   //
    archiveName: 'dist',  // dist.tar
    archiveType: 'tar',   // tar
    archiveAfterClean: true // archive after clean input directory
  })],
});
```

## Options

```ts
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
```
## License

MIT, see [the license file](./LICENSE)