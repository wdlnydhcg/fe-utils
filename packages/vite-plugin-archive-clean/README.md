<!--
 * @Author: MrAlenZhong
 * @Date: 2023-03-21 19:38:46
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2023-03-21 20:18:08
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
import zipPack from "@horloge/vite-plugin-archive-clean";

export default defineConfig({
  plugins: [zipPack()],
});
```

## Options

```ts
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
}
```
## License

MIT, see [the license file](./LICENSE)