const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout, null);

rl.question('', (n) => {

    rl.write(n);
    rl.close();
});
