import { createReadStream, createWriteStream, rm } from 'node:fs';
import { rename, writeFile } from 'node:fs/promises';
import { finished } from 'node:stream/promises';
import { stdout } from 'node:process';
import { join, parse } from 'node:path';
import { errorHandler, incorrectNameHandler } from './errorHandling.js';
import { checkIfNameCorrect } from '../config/utils.js';
import { DEFAULT_SYSTEM_MESSAGE } from '../config/constants.js';

const createNewFile = async (fileName, showMessage = true) => {
    if (checkIfNameCorrect(parse(fileName).base)) {
        await writeFile(fileName, '', { wx: true })
            .then(() => {
                if (showMessage)
                    stdout.write(`The file '${fileName}' has been created at current working directory.${DEFAULT_SYSTEM_MESSAGE}`)
            })
            .catch(() => errorHandler(`. Maybe '${filename}' already exists`));

    } else {
        incorrectNameHandler(fileName);
    }
};
const copyFileToDest = async ([ pathToFile, dest ], showMessage = true) => {
    try {
        const { base: fileName } = parse(pathToFile);
        const newDest = dest.includes(fileName) ? dest : join(dest, fileName);

        await createNewFile(newDest, false)
            .then(async () => {
                const readStream = createReadStream(pathToFile);
                const writeStream = createWriteStream(newDest);

                readStream.pipe(writeStream);
                await finished(readStream);
                if (showMessage) stdout.write(`File '${pathToFile}' has been copied to '${dest}'.${DEFAULT_SYSTEM_MESSAGE}`)

            })
            .catch(() => errorHandler(`. Maybe '${fileName}' already exists at '${dest}'`));
    } catch {
        errorHandler(`. You have tried to copy '${pathToFile}' to '${dest}'`);
    }
} ;

const removeFile = async (path, showMessage = true) => {
    await rm(path, (err) => {
        if (err) errorHandler(`'${path}'`);

        if (showMessage) stdout.write(`File '${path}' has been removed.${DEFAULT_SYSTEM_MESSAGE}`);
    });
};

const moveFile = async ([ pathToFile, dest ]) => {
    try {
        await copyFileToDest([ pathToFile, dest ], false);
        await removeFile(pathToFile, false);
        stdout.write(`File ${pathToFile} has been moved to ${dest}.${DEFAULT_SYSTEM_MESSAGE}`);
    } catch {
        errorHandler(`. You have tried to move '${pathToFile}' to '${dest}'`);
    }
};

const readFile = async (path) => {
    try {
        const stream = createReadStream(path);
        stream.on('data', (chunk) =>
            stdout.write(chunk.toString())
        );
        await finished(stream);
        stdout.write(`File has been read.${DEFAULT_SYSTEM_MESSAGE}`);
    } catch {
        errorHandler(`'${path}'`);
    }
};

const renameFile =  async ([ curFile, newFileName ]) => {
    const path = parse(curFile).dir;

    if (checkIfNameCorrect(newFileName)) {
        await rename(curFile, join(path, newFileName))
            .then(() => stdout.write(`The file has been renamed.${DEFAULT_SYSTEM_MESSAGE}`))
            .catch(() => errorHandler());
    } else {
        incorrectNameHandler(newFileName);
    }
};

export {
    copyFileToDest,
    createNewFile,
    moveFile,
    readFile,
    removeFile,
    renameFile,
}
