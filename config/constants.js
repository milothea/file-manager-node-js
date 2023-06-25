const DEFAULT_ERROR_MESSAGE = 'Operation failed.';
const OS_OPERATIONS_COMMAND = 'os';
const USERNAME_PREFIX = '--username=';
const DEFAULT_SYSTEM_MESSAGE = '\nEnter your command: ';

const COMMANDS = {
    ADD: 'add',
    CAT: 'cat',
    COMPRESS: 'compress',
    COPY: 'cp',
    CPU: 'os --cpus',
    CPU_ARCH: 'os --architecture',
    DECOMPRESS: 'decompress',
    DELETE: 'rm',
    EOL: 'os --EOL',
    EXIT: '.exit',
    HASH: 'hash',
    HOMEDIR: 'os --homedir',
    GO_TO: 'cd',
    LIST: 'ls',
    MOVE: 'mv',
    RENAME: 'rn',
    USERNAME: 'os --username',
    GO_TO_UP: 'up',
};

export {
    DEFAULT_ERROR_MESSAGE,
    DEFAULT_SYSTEM_MESSAGE,
    OS_OPERATIONS_COMMAND,
    USERNAME_PREFIX,
    COMMANDS,
};
