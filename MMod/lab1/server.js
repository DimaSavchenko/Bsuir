//const readline = require('readline');
//
//const rl = readline.createInterface(process.stdin, process.stdout, null);
//
//rl.question('', (n) => {
//
//    rl.write(n);
//    rl.close();
//});
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

    let z = halfSquare(4421);
    z = z.map((zi) => {return zi/9999});

    io.emit('data', testUniform(z, 10));
});

http.listen(3000, function(){
    console.log('listening on :3000');
});

let a = [], k = 7, m = 13, a0 = 1;

function halfSquare (n){

    let z = [];

    for(let i = 0; i < 100; i++) {

        n *= n;
        n = '' + n;

        while(n.length != 8) {
            n = '0' + n;
        }
        n = parseInt(n.slice(2,6));

        z[i] = n;
    }

    return z;
}

function testUniform(z, k) {
    let n = Array.from({ length: k }, () => 0);

    z = z.sort((a, b) => {
            if(a > b) return 1;
            if(a < b) return -1;
        });

    let i = 1, h =[];

    for(let zi of z){
        if(zi > i*(1/k)) {
            i++;
        }

        n[i-1]++;
    }
    return n;
}

a[0] = a0;
ai = a0;
for(let i = 1; i < 100; i++) {

    a[i] = k*ai % m;
    ai = a[i];
}