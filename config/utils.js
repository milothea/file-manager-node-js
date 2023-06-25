import { OS_OPERATIONS_COMMAND, USERNAME_PREFIX } from './constants.js';

const getPath = (source, command) => {
    const regExp = new RegExp(/^[^\s]$/gmi);
    const path = source.replace(command, '');

    if (regExp.test(path)) {
        return path;
    }

    return 'ERROR';
};

const getUsername = (args = []) => {
    let username;

    for (let i = 0; i < args.length; i++) {
        if (args[i].includes(USERNAME_PREFIX)) {
            username = args[i].replace(USERNAME_PREFIX, '');

            break;
        }
    }

    return username || 'Noname';
};
const parseCommand = (sourceCommand) => {
    const command = sourceCommand.split(' ')[0];

    if (command === OS_OPERATIONS_COMMAND) {
        return sourceCommand;
    }

    return command;
};

export {
    getPath,
    getUsername,
    parseCommand,
}
