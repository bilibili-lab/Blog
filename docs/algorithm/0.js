var longestCommonSubsequence = function (text1, text2) {
    const m = text1.length;
    const n = text2.length;
    // 初始化二维数组
    const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
    // console.log(dp)
    // [ [ 0, 0, 0, 0 ],
    //   [ 0, 0, 0, 0 ],
    //   [ 0, 0, 0, 0 ],
    //   [ 0, 0, 0, 0 ],
    //   [ 0, 0, 0, 0 ],
    //   [ 0, 0, 0, 0 ] 
    // ]
    for (let i = 1; i <= m; i++) {
        const c1 = text1[i - 1];
        for (let j = 1; j <= n; j++) {
            const c2 = text2[j - 1];
            if (c1 === c2) {
                // 如果相等，在 dp[i - 1][j - 1] + 1
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                // 如果不相等，Math.max(dp[i - 1][j], dp[i][j - 1]);
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    console.log(dp)
    // [ [ 0, 0, 0, 0 ],
    //   [ 0, 1, 1, 1 ],
    //   [ 0, 1, 1, 1 ],
    //   [ 0, 1, 2, 2 ],
    //   [ 0, 1, 2, 2 ],
    //   [ 0, 1, 2, 3 ] 
    // ]
    return dp[m][n];
};

console.log(longestCommonSubsequence("abcde", "ace"))