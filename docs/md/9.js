


Promise.reject('1').finally(() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('2')
        }, 2000)
    })
}).then(data => {
    console.log('data', data);
}, (err) => {
    console.log('err', err);  // 这里会输出 err 1
})


Promise.resolve('1').finally(() => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            reject('2')
        }, 2000)
    })
}).then(data => {
    console.log('data', data); 
}, (err) => {
    console.log('err', err);  // err 2
})

Promise.prototype.finally = (callback) => {
    // 执行完成后，返回一个promise，then函数返回一个 promise
    return this.then(data => {
        // callback 的返回值可能还是一个 promise， 需要等 promise 执行完成
        // 如果 callback 返回一个成功状态的的promise，则不会传递成功状态的promise的值，还是继续上一次promise继续向下传递。 
        Promise.resolve(callback()).then(() => data)
    }, err => {
        // callback 的返回值可能还是一个 promise， 需要等 promise 执行完成
        // 如果 callback 返回一个失败状态的的 promise，则传败该失败状态的promise的值。
        Promise.resolve(callback()).then(() => { throw err })
    })
}