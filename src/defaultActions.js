import { stdout } from 'node:process';
import { DEFAULT_SYSTEM_MESSAGE } from '../config/constants.js';

const handleUnimplementedCommands = (command) => {
    stdout.write(`Unfortunately, I have not implemented the command '${command}'.${DEFAULT_SYSTEM_MESSAGE}`);
};

const quitProcess = (username) => {
    stdout.write(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
};

export {
    handleUnimplementedCommands,
    quitProcess,
}
