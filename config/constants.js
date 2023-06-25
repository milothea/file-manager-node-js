const END_LINE = '\n';
const DEFAULT_SYSTEM_MESSAGE = `${END_LINE}Enter your command: `;
const OPERATIONS_ERROR_MESSAGE = 'Operation failed.';
const OS_OPERATIONS_COMMAND = 'os';
const USERNAME_PREFIX = '--username=';

const COMMANDS = {
    ADD: 'add',
    CAT: 'cat',
    CHANGE_DIR: 'cd',
    COMPRESS: 'compress',
    COPY: 'cp',
    CPU: 'os --cpus',
    CPU_ARCH: 'os --architecture',
    DECOMPRESS: 'decompress',
    DELETE: 'rm',
    EOL: 'os --eol',
    EXIT: '.exit',
    HASH: 'hash',
    HOMEDIR: 'os --homedir',
    LIST: 'ls',
    MOVE: 'mv',
    RENAME: 'rn',
    USERNAME: 'os --username',
    GO_TO_UP: 'up',
};

export {
    DEFAULT_SYSTEM_MESSAGE,
    END_LINE,
    OPERATIONS_ERROR_MESSAGE,
    OS_OPERATIONS_COMMAND,
    USERNAME_PREFIX,
    COMMANDS,
};
