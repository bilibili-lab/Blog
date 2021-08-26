
// openssl genrsa -out rsa_private.key 1024
// openssl rsa -in rsa_private.key -pubout -out rsa_public.key


const crypto = require("crypto");
const fs = require("fs");

const pub_key = fs.readFileSync("./rsa_public.key");
const priv_key = fs.readFileSync("./rsa_private.key");

const text = "Front End";

const secret = crypto.publicEncrypt(pub_key, Buffer.from(text));
const result = crypto.privateDecrypt(priv_key, secret);

console.log(secret); // buffer格式
console.log(result.toString()); // Front End

