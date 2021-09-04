function maxSubArray(nums) {
    const dp = [...nums]
    for (let i = 1; i < nums.length; i++) {
        // 要么自成一段，要么和前面子数组合并
        dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
    }

    console.log(dp) // [ -2, 1, -2, 4, 3, 5, 6, 1, 5 ]
    return Math.max(...dp);
};

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))