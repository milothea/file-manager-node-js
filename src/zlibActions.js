import { createReadStream, createWriteStream } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { finished } from 'node:stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { join, parse } from 'node:path';
import { stdout } from 'node:process';
import { createNewFile } from './filesActions.js';
import { errorHandler } from './errorHandling.js';
import { DEFAULT_SYSTEM_MESSAGE } from '../config/constants.js';

const compressFile = async (path) => {
    if (!path || path.length !== 2) return;

    const [ pathToSourceFile, dest ] = path;
    const { base: fileName } = parse(pathToSourceFile);
    const compressedFilePath = join(dest, fileName.replace(fileName, `compressed_${fileName}.gz`));

    readFile(compressedFilePath)
        .then(() => errorHandler(`. Compressed file already exists on path '${pathToSourceFile}'`))
        .catch(async () => {
            await createNewFile(compressedFilePath, false);
            const brotli = createBrotliCompress();
            const readStream = createReadStream(pathToSourceFile);
            const writeStream = createWriteStream(compressedFilePath);
            const compression = readStream.pipe(brotli).pipe(writeStream);

            compression.on('error', () => errorHandler(`'${pathToSourceFile} ${dest}'`));

            await finished(compression);
            stdout.write(`File '${pathToSourceFile}' has been compressed and stored to '${compressedFilePath}'.${DEFAULT_SYSTEM_MESSAGE}`);
        });
};

const decompressFile = async (path) => {
    if (!path || path.length !== 2) return;

    const [ pathToSourceFile, dest ] = path;
    const { base: fileName } = parse(pathToSourceFile);
    const decompressedFileName = fileName
        .replace('compressed_', '')
        .replace('.gz', '');
    const destPath = join(dest, decompressedFileName);

    await createNewFile(destPath, false)
        .then(async () => {
            const brotli = createBrotliDecompress();
            const readStream = createReadStream(pathToSourceFile);
            const writeStream = createWriteStream(destPath);
            const decompression = readStream.pipe(brotli).pipe(writeStream);

            decompression.on('error', () => errorHandler(`decompress '${pathToSourceFile}' to '${dest}'`));

            await finished(decompression);
            stdout.write(`File '${pathToSourceFile}' has been decompressed and stored to '${destPath}'.${DEFAULT_SYSTEM_MESSAGE}`);

        });
};

export {
    compressFile,
    decompressFile,
}
