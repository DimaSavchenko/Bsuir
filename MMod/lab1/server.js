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

    let m = 12345,
        c = 7777, //c*A mod m
        n = 9421,
        k1 = 100,
        k2 = 10000;


    let z = halfSquareMethod(n, k1);
    z = z.map((zi) => {return zi/9999});
    io.emit('halfSquareMethod', testUniform(z, 10));

    z = halfSquareMethod(n, k2);
    z = z.map((zi) => {return zi/9999});
    io.emit('halfSquareMethod10k', testUniform(z, 10));

    z = mulMethod(c, m, 1, k1);
    z = z.map((zi) => {return zi/m});
    io.emit('mulMethod', testUniform(z, 10));

    z = mulMethod(c, m, 1, k2);
    z = z.map((zi) => {return zi/m});
    io.emit('mulMethod10k', testUniform(z, 10));
});

http.listen(3000, function(){
    console.log('listening on :3000');
});

function halfSquareMethod(n, k){

    let z = [];

    for(let i = 0; i < k; i++) {

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

function mulMethod(c, m, a0, k) {

    let a = [];

    a[0] = a0;
    ai = a0;
    for(let i = 1; i < k; i++) {

        a[i] = c*ai % m;
        ai = a[i];
    }

    return a;
}

function testUniform(z, k) {
    let n = Array.from({ length: k }, () => 0);

    z = z.sort(function(a, b) {
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

    n = n.map((ni) => {
        return ni/ z.length;
    });

    console.log(n);
    return n;
}
