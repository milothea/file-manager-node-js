import * as os from 'node:os';
import { stdout } from 'node:process';
import { DEFAULT_SYSTEM_MESSAGE } from '../config/constants.js';

const printCPUArchitecture = () => {
    stdout.write(`The system CPU's architecture for which the Node.js binary has been compiled is '${os.arch()}'.${DEFAULT_SYSTEM_MESSAGE}`);
};

const printCPUsData = () => {
    const cpus = os.cpus();
    const cpusNumber = cpus.length;

    stdout.write(`The system has ${cpusNumber} CPU${cpusNumber === 1 ? '' : 's'}.\n`);

    cpus.forEach((cpu, i) => {
        stdout.write(`${i + 1}. ${cpu.model}.${i === (cpusNumber - 1) ? DEFAULT_SYSTEM_MESSAGE : '\n'}`);
    });
};

const printHomeDirectory = () => {
    const homedir = os.homedir();

    stdout.write(`The system home directory is '${homedir}'.${DEFAULT_SYSTEM_MESSAGE}`);
};

const printSystemEOL = () => {
    const eol = JSON.stringify(os.EOL);

    stdout.write(`The default system End-of-Line marker is ${eol}${DEFAULT_SYSTEM_MESSAGE}`);
};

const printSystemUsername = () => {
    stdout.write(`The system username is '${os.userInfo().username}'.${DEFAULT_SYSTEM_MESSAGE}`);
};

export {
    printCPUArchitecture,
    printCPUsData,
    printHomeDirectory,
    printSystemEOL,
    printSystemUsername,
}
