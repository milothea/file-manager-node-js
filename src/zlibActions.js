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
    const { base: fileName } = parse(path);
    const compressedFilePath = path.replace(fileName, `compressed_${fileName}.gz`);

    readFile(compressedFilePath)
        .then(() => errorHandler(`. Compressed file already exists on path '${path}'`))
        .catch(async (err) => {
            if (!err) {
                await createNewFile(compressedFilePath, false);

                const brotli = createBrotliCompress();
                const readStream = createReadStream(path);
                const writeStream = createWriteStream(compressedFilePath);
                const compression = readStream.pipe(brotli).pipe(writeStream);

                compression.on('error', () => errorHandler());

                await finished(compression);
                stdout.write(`File '${path}' has been compressed and stored to '${compressedFilePath}'.${DEFAULT_SYSTEM_MESSAGE}`);
            } else {
                errorHandler(`'${path}'`);
            }
        });
};

const decompressFile = async ([ compressedFilePath, dest ]) => {
    try {
        const { base: fileName } = parse(compressedFilePath);
        const decompressedFileName = fileName
            .replace('compressed_', '')
            .replace('.gz', '');
        const destPath = join(dest, decompressedFileName);

        await createNewFile(destPath);

        const brotli = createBrotliDecompress();
        const readStream = createReadStream(compressedFilePath);
        const writeStream = createWriteStream(destPath);
        const decompression = readStream.pipe(brotli).pipe(writeStream);

        decompression.on('error', () => errorHandler());

        await finished();
        stdout.write(`File '${compressedFilePath}' has been decompressed and stored to '${destPath}'.${DEFAULT_SYSTEM_MESSAGE}`);
    } catch {
        errorHandler(`decompress '${compressedFilePath}' to '${dest}'`);
    }
};

export {
    compressFile,
    decompressFile,
}
