import { stdout } from 'node:process';

const quitProcess = (username) => {
    stdout.write(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
};

export {
    quitProcess,
}
