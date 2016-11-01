var rv = require('../lab1/server.js');

let n = 10000,
    x = rv.mulMethod(23423423, 8989898, 100000, 1000000),
    j = 1,
    t = 0,
    partTime = [],
    dt = 0.01,
    tReq = 0,
    dtReq = 1, //e распредел
    rej = 0,
    input = 0,
    track1 = {
        lex : 'simple',
        track: [{
            status: 0,
            time: 0,
            startTime : 0,
            sumTime: 0
        },{
            status: 0,
            time: 0,
            startTime : 0,
            sumTime: 0
        },{
            status: 0,
            time: 0,
            startTime : 0,
            sumTime: 0
        }
        ]},
    track2 = {
        lex : 'gauss',
        track: [{
            status: 0,
            time: 0,
            startTime : 0,
            sumTime: 0
        }, {
            status: 0,
            time: 0,
            startTime : 0,
            sumTime: 0
        }, {
            status: 0,
            time: 0,
            startTime : 0,
            sumTime: 0
        }, {
            status: 0,
            time: 0,
            startTime : 0,
            sumTime: 0
        }
        ]
    },
    track3 = {
        lex : 'gauss',
        track:  [{
            status: 0,
            time: 0,
            startTime : 0,
            sumTime: 0
        }, {
            status: 0,
            time: 0,
            startTime : 0,
            sumTime: 0
        }, {
            status: 0,
            time: 0,
            startTime : 0,
            sumTime: 0
        }, {
            status: 0,
            time: 0,
            startTime : 0,
            sumTime: 0
        }]
    },
    track4 = {
        lex : 'gauss',
        track: [{
            status: 0,
            time: 0,
            startTime : 0,
            sumTime: 0
        }, {
            status: 0,
            time: 0,
            startTime : 0,
            sumTime: 0
        }, {
            status: 0,
            time: 0,
            startTime : 0,
            sumTime: 0
        }, {
            status: 0,
            time: 0,
            startTime : 0,
            sumTime: 0
        }]
    },
    track5 = {
        lex : 'simps',
        track: [{
            status: 0,
            time: 0,
            startTime : 0,
            sumTime: 0
        }, {
            status: 0,
            time: 0,
            startTime : 0,
            sumTime: 0
        }, {
            status: 0,
            time: 0,
            startTime : 0,
            sumTime: 0
        },

            {
                status: 0,
                time: 0,
                startTime : 0,
                sumTime: 0
            }, {
                status: 0,
                time: 0,
                startTime : 0,
                sumTime: 0
            }]
    },
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

let simpleDistr = function(x) {
    return 7*x + 2;
};

let gaussDistr = function (x) {
    return 5 + (12)*0.5 * (x - 1/2);
};

let simpsDistr = function (x) {
    return 3.237;
};

let incTime = function () {
    t += dt;
    tReq += dt;
    incTrack(track1);
    incTrack(track2);
    incTrack(track3);
    incTrack(track4);
    incTrack(track5);
};

let incTrack = function(track) {
    for(let i of track.track) {
        if(i.status == 1){
            i.time -= dt;
            if(i.time <= 0) {i.status = 2;}
        };
    }
};

let fullStore = function (n) {
    return (n.n == n.m.length) ? true : false;
};

let emptyStore = function (n) {
    return (n.m.length == 0) ? true : false;
};

let emptyTrack = function (track) {
    for (let i = 0; i < track.track.length; i++) {
        if (track.track[i].status == 0)   return i;
    }
    return -1;
};

let checkTrack = function (nF, track, nL) {
    let i = emptyTrack(track);
    if (i !== -1 && !emptyStore(nF)) {
        track.track[i].status = 1; // 1 track is full
        switch (track.lex) {
            case 'simple':
                track.track[i].time = simpleDistr( x[j]); // lex
                break;
            case 'gauss':
                track.track[i].time = gaussDistr(x[j]); // lex
                break;
            case 'simps':
                track.track[i].time = simpsDistr(x[j]); // lex
                break;
        }
        j++;
        track.track[i].startTime = nF.m.shift();
        track.track[i].sumTime += track.track[i].time;
    }
    // 0 - empty
    // 1 - stack full
    // 2 - time ended
    for(let i of track.track) {
        if (i.status == 2 && !fullStore(nL)) {
            nL.m.push(i.startTime);
            i.status = 0;
            i.time = 0;
            if(!nL.n) {
                //console.log(nL.n);
                let startTima = nL.m.pop();
                nL.m.push(t - startTima);
                partTime.push(t);
            }
        }
    }
};

while (rej + output.m.length < n) {
    if (tReq >= dtReq && !fullStore(n1) && input + rej < n) {
        n1.m.push(t);                //not full
        tReq = 0;
        input++;
    } else if(fullStore(n1) && tReq >= dtReq) {
        tReq = 0;
        rej++;
    }

    checkTrack(n1, track1, n2);
    checkTrack(n2, track2, n3);
    checkTrack(n3, track3, n4);
    checkTrack(n4, track4, n5);
    checkTrack(n5, track5, output);

    incTime();
}
//console.log(rej);
//console.log(output.m.length);
//console.log(j);
//console.log(partTime);

for(let i=0; i < partTime.length - 1; i++) {
    partTime[i] = partTime[i+1] - partTime[i];
}
partTime.pop();

let add = function(a, b) {
    return a+b;
};

//intensity
//MO
let MO = partTime.reduce(add, 0) / partTime.length;
console.log(MO, 'MO');
//D
//let part = partTime;
//part = part.map((x) => {   return x*x});
//console.log((part.reduce(add, 0) / part.length) - MO^2, 'D');
//M
MO = output.m.reduce(add, 0) / output.m.length;
console.log(MO, 'MO');
//D
//part = output.m;
//part = part.map((x) => {   return x*x});
//console.log((part.reduce(add, 0) / part.length) - MO^2, 'D');
console.log(rej / n * 100, 'rej/n');

console.log('___');
console.log(track1.track[0].sumTime);
console.log(track1.track[1].sumTime);
console.log(track1.track[2].sumTime);
//console.log(track1.track[3].sumTime);
//console.log(track1.track[4].sumTime);
console.log('___');
console.log(track2.track[0].sumTime);
console.log(track2.track[1].sumTime);
console.log(track2.track[2].sumTime);
console.log(track2.track[3].sumTime);
console.log('___');
console.log(track3.track[0].sumTime);
console.log(track3.track[1].sumTime);
console.log(track3.track[2].sumTime);
console.log(track3.track[3].sumTime);
console.log('___');
console.log(track4.track[0].sumTime);
console.log(track4.track[1].sumTime);
console.log(track4.track[2].sumTime);
console.log(track4.track[3].sumTime);
console.log('___');
console.log(track5.track[0].sumTime);
console.log(track5.track[1].sumTime);
console.log(track5.track[2].sumTime);
//console.log(track5.track[3].sumTime);
//console.log(track5.track[4].sumTime);
