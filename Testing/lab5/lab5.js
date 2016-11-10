let M = 2,
    n, m,
    p,
    d = [],
    k = [],
    i = 0;

p = 3;
d = k = [11, 13, 17, 19];

// p < pr i
// d1 < d2 < d3 < d4
// d1*d2*d3*d4 <  p * d(n - m + 2) * d (n - m + 2++) * ... * d
let r = Math.round(Math.random() * 100) + Math.max.apply(null, d);

let _M = M + r * p;

k = k.map(function () {

    return _M % d[i++];
});

let part = [];// {p, di, k1}

for (let i = 0; i < d.length; i++) {

    part.push({'p': p, 'd': d[i], 'k': k[i]});
}

let input = [part[1], part[2], part[3]];

let x = [];

for (let i = 0; i < part[1].d * part[2].d; i++) {
    x.push(part[1].k + i * part[1].d);
    x.push(part[2].k + i * part[2].d);
    x.push(part[3].k + i * part[3].d);
}

x.sort((a, b) => {
    return a - b;
});

let j = 1;
let xPred;
let ans;
for (let xi of x) {
    if (xPred == xi && ++j == 3) {
        ans = xPred;
        break;
    }

    if(xPred !== xi) { j = 1;}
    xPred = xi;
}

console.log(ans % p);


