let obj = { foo: { bar: { name: 'biz' } } }
console.log(get(obj, 'foo.bar.name')) // 输出 biz
obj = {}
console.log(get(obj, 'foo.bar.name')) // 输出 undefiend
console.log(get(obj, 'foo.bar.name', 'biz')) // 输出 biz

function get(obj, keyPath = '', defaultValue) {
    const segement = keyPath.split('.')
    for (let i = 0; i < segement.length; i++) {
        if (!obj) return defaultValue
        obj = obj[segement[i]]
    }
    return obj
}