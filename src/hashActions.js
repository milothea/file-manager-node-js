import { readFile } from 'node:fs/promises';
import * as crypto from 'node:crypto';
import { stdout } from 'node:process';
import { errorHandler } from './errorHandling.js';
import { DEFAULT_SYSTEM_MESSAGE } from '../config/constants.js';

const hashFile = async (path) => {
    readFile(path)
        .then(async (file) => {
            const hash = crypto.createHash('sha256');
            const result = hash.update(file).digest('hex');

            stdout.write(`Hash for file '${path}' is '${result}'.${DEFAULT_SYSTEM_MESSAGE}`);
        })
        .catch(() => errorHandler(path));
};

export {
    hashFile,
}
