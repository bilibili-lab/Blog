
const crypto = require('crypto');

console.log(crypto.getHashes())


/**
 * 
 * @param {string} text 输入的文本
 * @param {string} hashtype 加密的算法
 */
function createHash(text, hashtype) {
    const hash = crypto.createHash(hashtype).update(text).digest("hex");
    console.log(hashtype, hash, hash.length);
}

createHash("front end", 'md5');
createHash("front end", 'sha1');
createHash("front end", 'sha256');
createHash("front end", 'sha512');

// md5 a8feb51949b79ed25e2c9f6835f54977 32
// sha1 b2d368bfa97722c3ee6bf670e1bdc4b80614a8d0 40
// sha256 eeb1622b08f79e8a35579826704c933c7ef0844ec01e7b807135290af6113fa3 64
// sha512 cb987c0320f8d329c1e4fe5c79e1fd6949eef0d25b526dedc3029dc07ea6d0a85f6981757970e28c51e5497456a7befe261bca828f1d7cc042c875fe2f6d0f18 128


const result = crypto.createHmac("sha1", "123456").update("front end").digest("hex");

console.log(result); // 0bdd6c1192e321e34887d965c1140be4361ada65