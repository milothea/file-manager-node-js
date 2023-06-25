import { stdin, stdout } from 'node:process';
// import { changeDirectory } from './src/directoryActions.js';
import * as utils from './config/utils.js';
import { COMMANDS, DEFAULT_SYSTEM_MESSAGE } from './config/constants.js';
import * as defaultActions from './src/defaultAction.js';
import * as systemActions from './src/systemDataActions.js';
import { wrongCommandHandler } from './src/errorHandling.js';

const runFileManager = () => {
    const { argv } = process;
    const username = utils.getUsername(argv);

    stdout.write(`Welcome to the File Manager, ${username}!${DEFAULT_SYSTEM_MESSAGE}`);

    stdin.on('data', (userInput, key) => {
        const input = userInput.toString().trim();
        const parsedCommand = utils.parseCommand(input);
        // const path = utils.getPath(input, parsedCommand);

        switch(parsedCommand) {
            // case COMMANDS.ADD:
            //     break;
            // case COMMANDS.CAT:
            //     break;
            // case COMMANDS.COMPRESS:
            //     break;
            // case COMMANDS.COPY:
            //     break;
            case COMMANDS.CPU:
                systemActions.printCPUsData();
                break;
            case COMMANDS.CPU_ARCH:
                systemActions.printCPUArchitecture();
                break;
            // case COMMANDS.DECOMPRESS:
            //     break;
            // case COMMANDS.DELETE:
            //     break;
            case COMMANDS.EOL:
                systemActions.printSystemEOL();
                break;
            case COMMANDS.EXIT:
                defaultActions.quitProcess(username);
                break;
            // case COMMANDS.HASH:
            //     break;
            case COMMANDS.HOMEDIR:
                systemActions.printHomeDirectory();
                break;
            // case COMMANDS.GO_TO:
            //     break;
            // case COMMANDS.LIST:
            //     break;
            // case COMMANDS.MOVE:
            //     break;
            // case COMMANDS.RENAME:
            //     break;
            case COMMANDS.USERNAME:
                systemActions.printSystemUsername();
                break;
            // case COMMANDS.GO_TO_UP:
            //     break;
            default:
                wrongCommandHandler(input);
        }
    });

    process.on('SIGINT', () => {
        defaultActions.quitProcess(username);
    });
}

runFileManager();