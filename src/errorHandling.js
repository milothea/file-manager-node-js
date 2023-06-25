import { stdout } from 'node:process';
import { DEFAULT_ERROR_MESSAGE, DEFAULT_SYSTEM_MESSAGE } from '../config/constants.js';

const errorHandler = () => {
    stdout.write(DEFAULT_ERROR_MESSAGE);
};

const wrongCommandHandler = (command) => {
    stdout.write(`Check if you have written correct command. Your input - '${command}'.${DEFAULT_SYSTEM_MESSAGE}`);
};

export {
    errorHandler,
    wrongCommandHandler,
}
