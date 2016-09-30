var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let mulMethod = function(c, m, a0, k) {
    let a = [];

    a[0] = a0;
    ai = a0;
    for(let i = 1; i < k; i++) {

        a[i] = c*ai % m;
        ai = a[i];
    }

    a = a.map((ai) => {return ai/m});

    return a;
};

let gaus = function () {
    let x = [],
        m = 2,
        n = 6,
        o = 5;

    xMul = mulMethod(44555, 12345, 1, 100);
    let r = 
    x.push(m + o*Math.sqrt(12/n)());
};

if(module.parent) {
    exports.mulMethod = mulMethod;
} else {
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
        io.emit('halfSquareMethod', testUniform(z, 10));

        z = halfSquareMethod(n, k2);
        io.emit('halfSquareMethod10k', testUniform(z, 10));

        z = mulMethod(c, m, 1, k1);
        io.emit('mulMethod', testUniform(z, 10));

        z = mulMethod(c, m, 1, k2);
        io.emit('mulMethod10k', testUniform(z, 10));
    });

    http.listen(3000, function(){
        console.log('listening on : 3000');
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

        z = z.map((zi) => {return zi/9999});

        return z;
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

        return n;
    };
}
