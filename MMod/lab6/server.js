var rv = require('../lab1/server.js');

let x = rv.mulMethod(23423423, 8989898, 100000, 10000),
    i = 0,
    t = 0,
    dt = 0.01,
    tReq = 0,
    dtReq = 1, //e распредел
    rej = 0,
    track1 = [ 0, 0, 0],
    track2 = [ 0, 0, 0, 0],
    track3 = [ 0, 0, 0, 0],
    track4 = [ 0, 0, 0, 0],
    track5 = [ 0, 0, 0, 0, 0],
    n1 = {
        n: 3,
        m: []
    },
    n2 = {
        n: 5,
        m: []
    },
    n3 = {
        n: 3,
        m: []
    },
    n4 = {
        n: 3,
        m: []
    },
    n5 = {
        n: 3,
        m: []
    };

    output = {
        m: []
    };

let incTime = function () {
    t += dt;
    tReq += dt;
};

let fullStore = function (n) {
    return (n.n == n.m.length) ? true : false;
};

let emptyTrack = function(track) {
    for(let i = 0; i < track.length; i++) {
        if(track[i] == 0)   return i;
    }

    return -1;
};


let checkTrack = function(n1, track, n2) {
    let i = emptyTrack(track);
    if(i !== -1 && !fullStore(n1)) {
        track[i] = 1;
        n1.m.shift();
    }

    // штука, которая смотрит на пути и если там время прошло и есть место в накопителе n2, то перемещаем заявку в n2
};

while (t < 3) {
    if (tReq >= dtReq && !fullStore(n1)) {
        n1.m.push(1);                //not full
        tReq = 0;
    } else {
        rej++;
    }

    checkTrack(n1, track1, n2);
    checkTrack(n2, track2, n3);
    checkTrack(n3, track3, n4);
    checkTrack(n4, track4, n5);
    checkTrack(n5, track5, output);

    incTime();
}
