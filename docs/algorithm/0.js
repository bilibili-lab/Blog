var uniquePathsWithObstacles = function (obstacleGrid) {
    if (obstacleGrid.length === 0) return 0;
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;
    // 初始化一个二维数组。
    let dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
    // 第一列设置为设置是否有障碍物
    for (let i = 0; i < m && obstacleGrid[i][0] == 0; i++) {
        dp[i][0] = 1;
    }
    // 第一行设置为设置是否有障碍物
    for (let j = 0; j < n && obstacleGrid[0][j] == 0; j++) {
        dp[0][j] = 1;
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j] == 0) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
    }
    return dp[m - 1][n - 1];
};
console.log(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]]))