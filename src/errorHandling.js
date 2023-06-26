import { stdout } from 'node:process';
import { DEFAULT_SYSTEM_MESSAGE, END_LINE, OPERATIONS_ERROR_MESSAGE } from '../config/constants.js';

const errorHandler = (path = null) => {
    let errorMessage = `${OPERATIONS_ERROR_MESSAGE}${DEFAULT_SYSTEM_MESSAGE}`;

    if (path || path === '') {
        errorMessage = `${OPERATIONS_ERROR_MESSAGE} Please, check if entered path is correct - '${path}'. ${DEFAULT_SYSTEM_MESSAGE}`;
    }

    stdout.write(errorMessage);
};

const incorrectNameHandler = (name) => {
    stdout.write(`${OPERATIONS_ERROR_MESSAGE}${END_LINE}`);
    stdout.write(`Please, check correctness of entered name - '${name}'.${END_LINE}`);
    stdout.write('FYI - name must not contain special symbols, etc. You can google name requirements.');
    stdout.write(DEFAULT_SYSTEM_MESSAGE);
};

const wrongCommandHandler = (command) => {
    stdout.write(`${OPERATIONS_ERROR_MESSAGE}${END_LINE}`);
    stdout.write(`Check if entered command is correct. Your input - '${command}'.${DEFAULT_SYSTEM_MESSAGE}`);
};

export {
    errorHandler,
    incorrectNameHandler,
    wrongCommandHandler,
}
