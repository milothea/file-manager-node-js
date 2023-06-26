import * as fs from 'node:fs';
import { readdir } from 'node:fs/promises';
import { stdout } from 'node:process';
import { errorHandler } from './errorHandling.js';
import { DEFAULT_SYSTEM_MESSAGE, END_LINE } from '../config/constants.js';

const parseFilesData = (files) =>  files.map((file) => ({
    name: file.name,
    Type: file.isFile() ? 'file' : 'directory',
}));

const printCurDirFiles = async () => {
    const curDir = process.cwd();
    const files = await readdir(curDir, { withFileTypes: true });

    stdout.write(`There are files which current directory '${curDir}' contains:${END_LINE}`);
    console.table(parseFilesData(files));
    stdout.write(DEFAULT_SYSTEM_MESSAGE);
};

const changeDirectory = async (path) => {
    let dirExisted = true;

    await readdir(path).catch(() => dirExisted = false);

    console.log(dirExisted);

    if (dirExisted) {
        process.chdir(path);
    } else {
        errorHandler(path);
    }
};

export {
    changeDirectory,
    printCurDirFiles,
}
