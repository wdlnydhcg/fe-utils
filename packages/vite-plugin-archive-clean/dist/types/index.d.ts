import { PluginOption } from "vite";
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
export default function zipPack(options?: Options): PluginOption;
