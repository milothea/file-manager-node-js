const greetUser = () => {
    const { argv } = process;
    const usernamePrefix = '--username=';
    let username;

    for (let i = 0; i < process.argv.length; i++) {
        if (argv[i].includes(usernamePrefix)) {
            username = argv[i].replace(usernamePrefix, '');

            break;
        }
    }

    console.log(`Welcome to the File Manager, ${username || 'Noname'}!`);
};

greetUser();