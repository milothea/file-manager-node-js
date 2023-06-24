import { stdin, stdout } from 'node:process';
import { COMMANDS, USERNAME_PREFIX } from './config/constants.js';

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

const runFileManager = () => {
    const { argv } = process;
    const username = getUsername(argv);

    stdout.write(`Welcome to the File Manager, ${username}!`);

    stdin.pipe((request) => {
        console.log(request)
        if (request === COMMANDS.EXIT) {
            stdout.write(`Thank you for using File Manager, ${username}, goodbye!`);
            process.exit();
        }
    })
}

runFileManager();