import * as fs from 'node:fs';
import * as crypto from 'node:crypto';
import { stdout } from 'node:process';
import { errorHandler } from './errorHandling.js';
import { DEFAULT_SYSTEM_MESSAGE } from '../config/constants.js';

const printHashForFile = async (path) => {
    let fileExists;

    await fs.exists(path, (result) => fileExists = result);

    if (fileExists) {
        const file = await fs.readFile(path);
        const hash = crypto.createHash('sha256');
        const result = hash.update(file).digest('hex');

        stdout.write(`Hash for file '${path}' is '${result}'.${DEFAULT_SYSTEM_MESSAGE}`);
    } else {
        errorHandler(path);
    }
};

export {
    printHashForFile,
}
