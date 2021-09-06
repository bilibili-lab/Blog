function sep(n) {
    let [i, c] = n.toString().split(/(\.\d+)/)
    // 采用map,每个三位添加 ,
    // 最后将 ,开头的替换掉。
    return i.split('').reverse().map((c, idx) => (idx + 1) % 3 === 0 ? ',' + c : c).reverse().join('').replace(/^,/, '') + c
}

console.log(sep(12313.12))