
const strQuery = "a=1&b=2&c=3"
// function parse(str = '') {
//     let result = {}
//     str.split('&').reduce((o, k) => {
//         const [key, value] = k.split('=')
//         o[key] = value
//         return o
//     }, result)
//     return result
// }

// console.log(parse(strQuery))


function parse(str = '') {
    let result = {}
    str.split('&').reduce((o, k) => {
        const [key, value] = k.split('=')
        if (!value) return
        // "a[name]"
        // ['a', 'name', '']
        // 过滤掉空的
        deep_set(o, key.split(/[\[\]]/g).filter(x => x), value)
        return o
    }, result)
    return result
}

function deep_set(o, path, value) {
    let i = 0
    for (; i < path.length - 1; i++) {
        if (o[path[i]] === undefined) {
            console.log('path[i]', path[i]);
            if (/^\d+$/.test(path[i])) {
                o[path[i]] = []
            } else {
                o[path[i]] = {}
            }
        }
        o = o[path[i]]
    }
    o[path[i]] = decodeURIComponent(value)
}

console.log(parse('a=1&b=2&c=3'))
console.log(parse('a&b&c'))
console.log(parse('a[name]=fox&a[company]=tecent&b=why'))
console.log(parse('color=Deep%20Blue'))
console.log(parse('a[0]=1&a[1]=2'))

