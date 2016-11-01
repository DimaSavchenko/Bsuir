
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var rv = require('../lab1/server.js');

//app.get('/', function(req, res){
//    res.sendFile(__dirname + '/index.html');
//});

let randomEvent = function(x) {

    let ans = [0, 0, 0];

    for(let xi of x) {
        if(xi > 0 && xi <= 0.49) {ans[0]++;}
        if(xi > 0.49 && xi <= 0.51) {ans[1]++;}
        if(xi > 0.51 && xi <= 1) {ans[2]++;}
    }
    console.log(ans);
    console.log(ans[0]/n);
    console.log(ans[1]/n);
    console.log(ans[2]/n);
    return ans;
};


//io.on('connection', function(socket){
    let n = 1000;
    let ans = randomEvent(rv.mulMethod(44555, 12345, 1, n));
    //io.emit('randomEvent', ans);
//});

//http.listen(9000, function(){
//    console.log('listening on :9000');
//});


