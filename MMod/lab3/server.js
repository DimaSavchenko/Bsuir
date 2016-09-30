
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var rv = require('../lab1/server.js');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    let n = 100000;
    let ans = randomEvent(rv.mulMethod(44555, 12345, 1, n));
    io.emit('randomEvent', ans);
});

http.listen(9000, function(){
    console.log('listening on :9000');
});

let randomEvent = function(x) {

    let y = x.map((xi) => {
            return Math.log(xi);
        }),
        ans = new Array(12).fill(0);

    //console.log(y);

    for(let yi of y) {
        ans[Math.abs(Math.floor(yi) + 1)]++
    }

    ans = ans.map( (ansi) => {
        return ansi/x.length;
    });
    console.log(ans);
    return ans;
};
