import { stdout } from 'node:process';

const handleUnimplementedCommands = (command) => {
    stdout.write(`Unfortunately, I have not implemented the command '${command}'.`);
};

const quitProcess = (username) => {
    stdout.write(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
};

export {
    handleUnimplementedCommands,
    quitProcess,
}
