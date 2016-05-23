---
layout: post
section-type: post
title: Climbing Stairs
category: leetcode
tags: [ 'dynamic progamming' ]
---


### Climbing Stairs      
  
<p>You are climbing a stair case. It takes&nbsp;<em>n</em>&nbsp;steps to reach to the top.</p>
<p>Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?</p>  
  
假设梯子有n层，那么如何爬到第n层呢，因为每次只能爬1或2步，那么爬到第n层的方法要么是从第n-1层一步上来的，要不就是从n-2层2步上来的，所以递推公式非常容易的就得出了：dp[n] = dp[n-1] + dp[n-2]。 这里需要用动态规划 (Dynamic Programming)，代码如下：  

```cpp
//时间复杂度O(n)，空间复杂度O(n)
class Solution {
public:
    int climbStairs(int n) {
        vector<int> dp(n+1,1);
        for(int i=2;i<=n;++i)
            dp[i]=dp[i-1]+dp[i-2];
        return dp[n];
        
    }
};
```  
