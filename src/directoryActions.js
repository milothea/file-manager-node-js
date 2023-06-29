import { readdir } from 'node:fs/promises';
import { chdir, cwd, stdout } from 'node:process';
import { parse } from 'node:path';
import { errorHandler } from './errorHandling.js';
import { DEFAULT_SYSTEM_MESSAGE, END_LINE } from '../config/constants.js';

const parseFilesData = (files) => {
    const mappedFiles = [...files].map((file) => ({
        name: file.name,
        Type: file.isFile() ? 'file' : 'directory',
    }));

    return mappedFiles.sort((a) => a.Type === 'file' ? 1 : -1);
};

const getNewDirectoryPath = (path) => {
    return path.split('/')
        .filter((_, i, arr) => i !== arr.length)
        .join('/');
};

const changeWorkingDir = (path) => {
    readdir(path)
        .then(() => {
            chdir(path);
            stdout.write(`Working directory has been changed to '${path}'. ${DEFAULT_SYSTEM_MESSAGE}`);
        })
        .catch(() => errorHandler(`'${path}'`));
}

const printCurDirFiles = async () => {
    const curDir = cwd();

    readdir(curDir, { withFileTypes: true })
        .then((files) => {
            stdout.write(`There are files which current directory '${curDir}' contains:${END_LINE}`);
            console.table(parseFilesData(files));
            stdout.write(DEFAULT_SYSTEM_MESSAGE);
        })
        .catch(() => errorHandler());
};

const setParentDirAsWorking = () => {
    const path = getNewDirectoryPath(parse(cwd()).dir);

    chdir(path);
    stdout.write(`Working directory has been changed to '${path}'. ${DEFAULT_SYSTEM_MESSAGE}`);
};

export {
    changeWorkingDir,
    printCurDirFiles,
    setParentDirAsWorking,
}
