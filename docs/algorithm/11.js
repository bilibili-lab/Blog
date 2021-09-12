
const demoRrr = [1, 2, 3, 4, 5, 6, 7]
// function shuffle(arr) {
//     return arr.sort((a, b) => Math.random() - .5)
// }

// console.log(shuffle(demoRrr))



// function shuffle1(arr) {
//     let result = []
//     while (arr.length) {
//         const random = Math.floor(Math.random() * arr.length)
//         result.push(arr[random])
//         arr.splice(random, 1)
//     }
//     return result
// }

function shuffle2(arr) {
    let length = arr.length;
    while (length) {
        const random = Math.floor(Math.random() * length)
        length--
        // 交换两个元素
        let temp = arr[length]
        arr[length] = arr[random]
        arr[random] = temp

    }
    return arr
}

function shuffle3(arr) {
    let length = arr.length;
    while (length) {
        const random = Math.floor(Math.random() * length)
        length--
        [arr[random], arr[length]] = [arr[length], arr[random]];

    }
    return arr
}


console.log(shuffle3(demoRrr))