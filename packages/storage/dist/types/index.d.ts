export interface StorageDataShape {
    value: unknown;
    time: number;
    expire: number;
}
export default class ILLAStorage {
    prefix: string;
    defaultExpire: number;
    constructor(prefix?: string, defaultExpire?: number);
    private autoAddPrefix;
    private setStorage;
    private getStorage;
    private clearStorage;
    private removeStorage;
    setLocalStorage: (key: string, value: unknown, expire?: number) => void;
    getLocalStorage: (key: string) => unknown;
    clearLocalStorage: () => void;
    removeLocalStorage: (key: string) => void;
    setSessionStorage: (key: string, value: unknown, expire?: number) => void;
    getSessionStorage: (key: string) => unknown;
    clearSessionStorage: () => void;
    removeSessionStorage: (key: string) => void;
}
