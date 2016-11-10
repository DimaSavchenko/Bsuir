let seedString = '',
  g = 160,
  len = g/8,
  sha1 = require('sha1');
  crypto = require('crypto');
  Buffer = require('buffer').Buffer;
  bigInt = require('big-integer');

while(len--) {
  seedString += Math.random() < 0.5 ? '1' : '0';
}

console.log(generateNum());

function generateNum() {
  let q = generateQ();
  let p = generateP(q);
  return p;
}

function generateQ() {
  let seed = bigInt(crypto.randomBytes(g/8).toString('hex'), 16);
  let u = getHash(seed).xor(getHash(seed.next().mod(bigInt(2).pow(g))));11
  let q = u.or(bigInt(2).pow(159)).or(bigInt.one);

  return q;
}

function generateP(q) {
  let counter = 0;
  let offset = 2;
  while (counter < 4096) {
    let W = bigInt.zero;
    for (let i = 0; i < n; ++i) {
      const vk = getHash(seed.add(offset + i).mod(pow2_g));
      W = W.add(vk.multiply(bigInt(2).pow(i*160)));
    }
    const lastVk = getHash(seed.add(offset + n).mod(pow2_g)).mod(bigInt(2).pow(b));
    W = W.add(lastVk.multiply(bigInt(2).pow(n*160)));
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
