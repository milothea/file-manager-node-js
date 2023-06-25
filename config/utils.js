import { OS_OPERATIONS_COMMAND, USERNAME_PREFIX } from './constants.js';

const checkIfNameCorrect = (fileName) => {
    const testRegExp = new RegExp(/[\/\\"'*;-?\[\]()~!${}<>#@&|.]/gmi);

    if (testRegExp.test(fileName)) {
        throw new Error();
    }

    return true;
}

const getCommandArgument = (source, command) => {
    return source.replace(command, '').trim();
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
        return sourceCommand.toLowerCase();
    }

    return command;
};

export {
    checkIfNameCorrect,
    getCommandArgument,
    getUsername,
    parseCommand,
}
