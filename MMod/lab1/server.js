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

    io.emit('data', [1,2,3,4,5]);
});

http.listen(3000, function(){
    console.log('listening on :3000');
});

let n = 4421, z = [], a = [], k = 7, m = 13, a0 = 1;

for(let i = 0; i < 100; i++) {

    n *= n;
    n = '' + n;

    while(n.length != 8) {
        n = '0' + n;
    }
    n = parseInt(n.slice(2,6));

    z[i] = n;
}

a[0] = a0;
ai = a0;
for(let i = 1; i < 100; i++) {

    a[i] = k*ai % m;
    ai = a[i];
}