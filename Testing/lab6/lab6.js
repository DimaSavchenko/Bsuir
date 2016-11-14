let seedString = '',
    g = 160,
    len = g / 8,
    sha1 = require('sha1'),
    crypto = require('crypto'),
    Buffer = require('buffer').Buffer,
    bigInt = require('big-integer'),
    seed,
    j = 3,
    L = 512 + 64 * j,
    n = bigInt(4),
    b = bigInt(64),
    pow2_g = bigInt(2).pow(g),
    pow2_Lprev = bigInt(2).pow(L - 1);

console.log(generateNum());

function generateNum() {

    let q = generateQ();
    let p = generateP(q);

    return p;
}

function generateQ() {

    let q;

    do {
        seed = bigInt(crypto.randomBytes(g / 8).toString('hex'), 16);
        let u = getHash(seed).xor(getHash(seed.next().mod(bigInt(2).pow(g))));
        q = u.or(bigInt(2).pow(159)).or(bigInt.one);

    } while (!isProbablyPrime(q));

    return q;
}

function generateP(q) {
    let counter = 0;
    let offset = 2;
    while (counter < 4096) {
        let W = bigInt.zero;
        for (let i = 0; i < n; ++i) {
            const vk = getHash(seed.add(offset + i).mod(pow2_g));
            W = W.add(vk.multiply(bigInt(2).pow(i * 160)));
        }
        const lastVk = getHash(seed.add(offset + n).mod(pow2_g)).mod(bigInt(2).pow(b));
        W = W.add(lastVk.multiply(bigInt(2).pow(n * 160)));
        const X = W.add(pow2_Lprev);
        const c = X.mod(q.multiply(2));
        const p = X.minus(c.prev());
        if (p.lt(pow2_Lprev) || !isProbablyPrime(p)) {
            counter++;
            offset += n + 1;
            continue;
        }
        return p;
    }
    return null;
}

function isProbablyPrime(number) {
    let j = 0;
    let a = 0;
    let m = bigInt(number).prev();
    while (m.isEven()) {
        m = m.divide(2);
        a++;
    }

    forCycle:
        for (let i = 0; i < 70; ++i) {
            const b = bigInt.randBetween(bigInt.one, number);
            let z = b.modPow(m, number);
            do {
                if ((j === 0 && z.eq(1)) || z.eq(number.prev())) {
                    continue forCycle;
                } else if (j > 0 && z.eq(1)) {
                    return false;
                }
                j++;
                if (j < a) {
                    z = z.square().mod(number);
                }
            } while (j < a);
            return false;
        }
    return true;
}

function getHash(bigNumber) {
    const sha1 = crypto.createHash('sha1');
    let hexNumberString = bigNumber.toString(16);
    if (hexNumberString.length % 2 === 1) {
        hexNumberString = '0' + hexNumberString;
    }
    const buffer = Buffer.from(hexNumberString, 'hex');
    sha1.update(buffer);
    return bigInt(sha1.digest('hex'), 16);
}
//let seed = seedString;
//let u1 = sha1(seedString);
//let u2 = sha1((parseInt(seedString, 2) + 1 % Math.pow(2, g)).toString());
//
//let u = parseInt(u1, 16) ^ parseInt(u2, 16);
//let q = u | Math.pow(2, 159) | Math.pow(2, 160);
//let q = bigInt(u).xor(Math.pow(2, 159)).xor(Math.pow(2, 160));
