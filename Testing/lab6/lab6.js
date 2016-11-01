let seedString = '',
  g = 160,
  len = g/8,
  sha1 = require('sha1');
  binary = require('s-binary'),
  bigInt = require("big-integer");

while(len--) {
  seedString += Math.random() < 0.5 ? '1' : '0';
}

//let seed = parseInt(seedString, 2);
let seed = seedString;
let u1 = sha1(seedString);
let u2 = sha1((parseInt(seedString, 2) + 1 % Math.pow(2, g)));

let u = parseInt(u1, 16) + parseInt(u2, 16);

//let q = u | Math.pow(2, 159);// | Math.pow(2, 160);
let q = bigInt(u).xor(Math.pow(2, 159)).xor(Math.pow(2, 160));
