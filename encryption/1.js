const crypto = require('crypto');

// 要加密的字符串
const str = "Front End";
// 密码
const key = 'FnJL7EDzjqWjcaY9'
// 指定加密时所用的向量， 可以理解为加盐
const iv = "FnJL7EDzjqWjcaY9";

/**
 * 常用的对称加密算法
 * 
 * aes-128-gcm
 * aes-192-ccm
* aes-192-gcm
 *aes-256-ccm
* aes-256-gcm
 * aes-128-ccm

 */


// 加密过程 
const cipher = crypto.createCipheriv("aes-128-cbc",key, iv)
cipher.update(str,'utf8', 'hex')
let data = cipher.final('hex'); // 'hex' 16进制
console.log(data); // b91a3ad3b2b86a5ad359bd6b07a15fee


// 解密
const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
decipher.update(data, 'hex', 'utf8')
let data1 = decipher.final().toString();
console.log(data1); // Front End

