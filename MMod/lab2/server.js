
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var rv = require('../lab1/server.js');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    let p = 0.6;

    let ans = randomEvent(p, rv.mulMethod(44555, 12345, 1, 100));
    io.emit('randomEvent1', ans);
    ans = randomEvent(p, rv.mulMethod(44555, 12345, 1, 10000));
    io.emit('randomEvent2', ans);

    let p1 = 0.4, p2 = 0.5, p3 = p2;
    ans = complexEvent(p1, rv.mulMethod(44555, 12345, 1, 100), p2, rv.mulMethod(33444, 54321, 1, 100), p3);
    io.emit('randomEvent3', ans);
    ans = complexEvent(p1, rv.mulMethod(44555, 12345, 1, 10000), p2, rv.mulMethod(33444, 54321, 1, 10000), p3);
    io.emit('randomEvent4', ans);

    let pa = 0.4,
        pb = 0.5,
        pba = 0.6,
        //pab = pba*pa/pb,
        pb_a = (pb - pba*pa)/(1 - pa);

    ans = complexEvent(pa, rv.mulMethod(44555, 12345, 1, 100), pba, rv.mulMethod(33444, 54321, 1, 100), pb_a);
    io.emit('randomEvent5', ans);
    ans = complexEvent(pa, rv.mulMethod(44555, 12345, 1, 10000), pba, rv.mulMethod(33444, 54321, 1, 10000), pb_a);
    io.emit('randomEvent6', ans);

    fullEvent();
});

http.listen(9000, function(){
    console.log('listening on :9000');
});

let randomEvent = function(p, x) {
    let ans = [0,0];
    for(let x1 of x) {
        if(x1 <= p) {
            ans[0]++;
        } else {
            ans[1]++;
        }
    }

    ans[0] /= x.length;
    ans[1] /= x.length;

    return ans;
};

let complexEvent = function(p1, x1, p2, x2, p3) {
    let ans = [0,0, 0, 0];
    for(let i=0; i < x1.length; i++) {
        if(x1[i] <= p1 && x2[i] <= p2) { //AB
            ans[0]++;
        } else if (x1[i] <= p1 && x2[i] > p3) { //AB*
            ans[1]++;
        } else if (x1[i] > p1 && x2[i] <= p2) { //A*B
            ans[2]++;
        }else if (x1[i] > p1 && x2[i] > p3) { //A*B*
            ans[3]++;
        }else {
            return 0;
        }
    }

    ans[0] /= x1.length;
    ans[1] /= x1.length;
    ans[2] /= x1.length;
    ans[3] /= x1.length;

    return ans;
};

//let fullEvent = function () {
//    let p = [0, 0.1, 0.05, 0.25, 0.15, 0.2, 0.075, 0.025, 0.1, 0.05],
//        t = 0;
//        _p = p.map(function(pi) {
//            t += pi;
//            return t;
//        }),
//        sum = p.reduce((a, b) => a + b, 0),
//        ans = new Array(10).fill(0);
//
//    //console.log(_p);
//
//    let x = rv.mulMethod(44555, 12345, 1, 10);0
//
//    for(let i=0; i < x.length; i++) {
//        //console.log(x[i]);
//        for(let j=0; j < _p.length - 1; j++) {
//            //console.log(_p[j]);
//            if (x[i] > _p[j] && x[i] < _p[j+1]) {
//                ans[j]++;
//            }
//        }
//    }
//
//    console.log(ans);
//};
let fullEvent = function () {
    let p = [0, 0.15, 0.15, 0.15, 0.15, 0.18333, 0.15],
        t = 0;
        _p = p.map(function(pi) {
            t += pi;
            return t;
        }),
        sum = p.reduce((a, b) => a + b, 0),
        ans = new Array(6).fill(0);

    console.log(sum);

    let x = rv.mulMethod(44555, 12345, 1, 1000);

    for(let i=0; i < x.length; i++) {
        //console.log(x[i]);
        for(let j=0; j < _p.length - 1; j++) {
            //console.log(_p[j]);
            if (x[i] > _p[j] && x[i] < _p[j+1]) {
                ans[j]++;
            }
        }
    }

    console.log(ans);
};
//6 1 дол
//
//1000 испыт
//+100
//-100