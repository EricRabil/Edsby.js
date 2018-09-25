import fs from "fs-extra";
import path from "path";

export const NODE_LOCALSTORAGE_PATH = path.resolve(__dirname, "storage");

/**
 * Node.JS version of LocalStorage
 */
export const polyfilledLocalStorage: Storage = {
    length: -1,
    clear() {
        fs.rmdirSync(NODE_LOCALSTORAGE_PATH);
    },
    getItem(key) {
        fs.ensureDirSync(NODE_LOCALSTORAGE_PATH);
        return fs.readFileSync(path.resolve(NODE_LOCALSTORAGE_PATH, key)).toString();
    },
    key(index: number) {
        return null;
    },
    removeItem(key: string) {
        fs.ensureDirSync(NODE_LOCALSTORAGE_PATH);
        fs.unlinkSync(path.resolve(NODE_LOCALSTORAGE_PATH, key));
    },
    setItem(key: string, value: string) {
        fs.ensureDirSync(NODE_LOCALSTORAGE_PATH);
        fs.writeFileSync(path.resolve(NODE_LOCALSTORAGE_PATH, key), value);
    }
};