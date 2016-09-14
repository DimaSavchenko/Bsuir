//const readline = require('readline');
//
//const rl = readline.createInterface(process.stdin, process.stdout, null);
//
//rl.question('', (n) => {
//
//    rl.write(n);
//    rl.close();
//});

let n = 4444;

n *= n;

n = '' + n;

console.log(n);

if(n.length == 7) {
    n = '0' + n;
}

let ans = n.slice(2,6);
console.log(ans);

let k = 13, m = 64, a0 = 2;

let a1 = k*a0 % m;

console.log(a1);