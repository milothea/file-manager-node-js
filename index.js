import { stdin, stdout } from 'node:process';
import * as utils from './config/utils.js';
import { COMMANDS, DEFAULT_SYSTEM_MESSAGE } from './config/constants.js';
import * as defaultActions from './src/defaultActions.js';
import * as dirActions from './src/directoryActions.js';
import * as filesActions from './src/filesActions.js';
import * as hashActions from './src/hashActions.js';
import * as systemActions from './src/systemDataActions.js';
import * as zlibActions from './src/zlibActions.js';
import { wrongCommandHandler } from './src/errorHandling.js';
import { parseArguments } from './config/utils.js';

const runFileManager = () => {
    const username = utils.getUsername(process.env, process.argv);

    stdout.write(`Welcome to the File Manager, ${username}!${DEFAULT_SYSTEM_MESSAGE}`);

    stdin.on('data', (userInput) => {
        const input = userInput.toString().trim();
        const parsedCommand = utils.parseCommand(input);
        const inputArgs = utils.getCommandArgument(input, parsedCommand);

        switch(parsedCommand) {
            case COMMANDS.ADD:
                filesActions.createNewFile(inputArgs);
                break;
            case COMMANDS.COPY:
                filesActions.copyFileToDest(parseArguments(parsedCommand, inputArgs));
                break;
            case COMMANDS.CAT:
                filesActions.readFile(inputArgs);
                break;
            case COMMANDS.CHANGE_DIR:
                dirActions.changeWorkingDir(inputArgs);
                break;
            case COMMANDS.COMPRESS:
                zlibActions.compressFile(parseArguments(parsedCommand, inputArgs));
                break;
            case COMMANDS.DECOMPRESS:
                zlibActions.decompressFile(parseArguments(parsedCommand, inputArgs));
                break;
            case COMMANDS.DELETE:
                filesActions.removeFile(inputArgs);
                break;
            case COMMANDS.MOVE:
                filesActions.moveFile(parseArguments(parsedCommand, inputArgs));
                break;
            case COMMANDS.GO_TO_UP:
                dirActions.setParentDirAsWorking(inputArgs);
                break;
            case COMMANDS.CPU:
                systemActions.printCPUsData();
                break;
            case COMMANDS.CPU_ARCH:
                systemActions.printCPUArchitecture();
                break;
            case COMMANDS.EOL:
                systemActions.printSystemEOL();
                break;
            case COMMANDS.EXIT:
                defaultActions.quitProcess(username);
                break;
            case COMMANDS.HASH:
                hashActions.hashFile(inputArgs);
                break;
            case COMMANDS.HOMEDIR:
                systemActions.printHomeDirectory();
                break;
            case COMMANDS.LIST:
                dirActions.printCurDirFiles();
                break;
            case COMMANDS.RENAME:
                filesActions.renameFile(parseArguments(parsedCommand, inputArgs));
                break;
            case COMMANDS.USERNAME:
                systemActions.printSystemUsername();
                break;
            default:
                wrongCommandHandler(input);
        }
    });

    process.on('SIGINT', () => {
        defaultActions.quitProcess(username);
    });
}

runFileManager();