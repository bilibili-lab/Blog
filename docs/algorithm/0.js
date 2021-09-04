triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]

// const minimumTotal = (triangle) => {
//     const getminimunTotal = (t, i, j) => {
//         // 如果 i 等于了 数组的长度，递归就终止了。
//         if (i === t.length) {
//             return 0
//         }
//         return Math.min(getminimunTotal(t, i + 1, j), getminimunTotal(t, i + 1, j + 1)) + triangle[i][j];
//     }
//     return getminimunTotal(triangle, 0, 0)
// };

// const minimumTotal = (triangle) => {
//     // 记忆化的数组, 初始化一个二维数组
//     const memo = new Array(triangle.length)
//     for (let i = 0; i < memo.length; i++) {
//         let innerMemo = new Array(memo.length)
//         for (let j = 0; j < memo.length; j++) {
//             innerMemo[j] = undefined
//         }
//         memo[i] = innerMemo
//     }
//     console.log('memo', memo)
//     const getminimunTotal = (t, i, j) => {
//         // 如果 i 等于了 数组的长度，递归就终止了。
//         if (i === t.length) {
//             return 0
//         }
//         if (memo[i] && memo[i][j] !== undefined) {
//             return memo[i][j]
//         }
//         return memo[i][j] = Math.min(getminimunTotal(t, i + 1, j), getminimunTotal(t, i + 1, j + 1)) + triangle[i][j];
//     }
//     return getminimunTotal(triangle, 0, 0)
// };




// const minimumTotal = (triangle) => {
//     // 初始化二维数组
//     const dp = new Array(triangle.length + 1)
//     for (let i = 0; i < dp.length; i++) {
//         let arr = new Array(dp.length + 1).fill(0)
//         dp[i] = arr
//     }

//     for (let i = triangle.length - 1; i >= 0; i--) {
//         for (let j = 0; j <= i; j++) {
//             dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j];
//         }
//     }
//     return dp[0][0];
// };




const minimumTotal = (triangle) => {
    // 初始化二维数组
    const dp = new Array(triangle.length + 1).fill(0)

    for (let i = triangle.length - 1; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            dp[j] = Math.min(dp[j], dp[j + 1]) + triangle[i][j];
        }
    }
    console.log(dp)
    return dp[0];
};

minimumTotal(triangle)



