import { OS_OPERATIONS_COMMAND, USERNAME_PREFIX } from './constants.js';
import { wrongCommandHandler } from '../src/errorHandling.js';

const checkIfNameCorrect = (fileName) => {
    const testRegExp = new RegExp(/[\/\\"'*;-?\[\]()~!${}<>#@&|]/gmi);

    return !(testRegExp.test(fileName));
}

const getCommandArgument = (source, command) => {
    return source.replace(command, '').trim();
};

const getUsername = (env, args) => {
    let username;

    for (let i = 0; i < args.length; i++) {
        if (args[i].includes(USERNAME_PREFIX)) {
            username = args[i].replace(USERNAME_PREFIX, '');

            break;
        }
    }
    if (!username) username = env.npm_config_username || 'Noname';

    return username;
};

const parseArguments = (command, args) => {
    const argsArr = args.split(' ');

    if (!args || argsArr.length !== 2) {
        wrongCommandHandler(`${command} ${args}`);

        return;
    }

    return argsArr.map((arg) => arg.trim());
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
    parseArguments,
    parseCommand,
}
