const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout, null);

rl.setPrompt('>');
rl.prompt();

rl.on('line', function(line) {
    rl.setPrompt('>');
    rl.prompt();
    // console.log(line);
});