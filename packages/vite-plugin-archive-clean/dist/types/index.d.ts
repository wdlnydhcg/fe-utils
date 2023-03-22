import { PluginOption } from "vite";
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
export default function archive(options?: Options): PluginOption;
