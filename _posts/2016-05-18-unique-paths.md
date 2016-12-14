---
layout: post
section-type: post
title: Unique Paths I & II
category: leetcode
tags: [ 'dynamic programming','array' ]
---


### Unique Paths  
  
<p>A robot is located at the top-left corner of a&nbsp;<em>m</em>&nbsp;x&nbsp;<em>n</em>&nbsp;grid (marked 'Start' in the diagram below).</p>
<p>The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).</p>
<p>How many possible unique paths are there?</p>
<p><img src="http://leetcode.com/wp-content/uploads/2014/12/robot_maze.png" alt="" /></p>
<p>Above is a 3 x 7 grid. How many possible unique paths are there?</p>
<p>Note:&nbsp;<em>m</em>&nbsp;and&nbsp;<em>n</em>&nbsp;will be at most 100.</p>  

题意：就是m*n的格子里从左上角走到右下角有多少种走法，只能向右或向下走。  
解题思路：这道题是比较典型的动态规划的题目（用递归法会超时）。到达某一格的路径数量等于它的上面和左边的路径数之和，递推式就是dp[i][j]=dp[i-1][j]+dp[i][j-1]，这样我们就可以用一个数组来保存历史信息，也就是在i行j列的路径数，用动态规划我们只需要对所有格子进行扫描一次，到了最后一个得到的结果就是总的路径数，所以时间复杂度是O(m*n)。而对于空间可以看出我们每次只需要用到上一行当前列，以及前一列当前行的信息，我们只需要用一个一维数组存上一行的信息即可，然后扫过来依次更替掉上一行对应列的信息即可（因为所需要用到的信息都还没被更替掉），所以空间复杂度是O(n)（其实如果要更加严谨，我们可以去行和列中小的那个，然后把小的放在内层循环，这样空间复杂度就是O(min(m,n))。实现代码如下：  

```cpp
// DP
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> dp(n, 1);
        for (int i = 1; i < m; ++i) {
            for (int j = 1; j < n; ++j) {
			//左边的dp[j]，表示更新后的dp[j]，与公式中的dp[i][j]对应
			//右边的dp[j]，表示更新前的dp[j]，与公式中的dp[i-1][j]对应
                dp[j] += dp[j - 1]; 
            }
        }
        return dp[n - 1];
    }
};
```

上面的方法用动态规划来求解，如果我们仔细的看这个问题背后的数学模型，其实就是机器人总共走m+n-2步，其中m-1步往下走，n-1步往右走，本质上就是一个组合问题，也就是从m+n-2个不同元素中每次取出m-1个元素的组合数。根据组合的计算公式，我们可以写代码来求解即可。代码如下：  

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        double num = 1, denom = 1;
        int small = m > n ? n : m;
        for (int i = 1; i <= small - 1; ++i) {
            num *= m + n - 1 - i;
            denom *= i;
        }
        return (int)(num / denom);
    }
};
```

上面的代码求解了组合的结果，只需要做一次行或者列的扫描，所以时间复杂度是O(min(m,n))，而空间复杂度是O(1)。比起上面的两种解法更优。不过这里有个弊端，就是如果代码中的dom和dedom如果不是double，而是用int，那么会很容易越界，因为这是一个阶乘，可以使用long long int类型。  

### Unique Paths II  

<p>Follow up for "Unique Paths":</p>
<p>Now consider if some obstacles are added to the grids. How many unique paths would there be?</p>
<p>An obstacle and empty space is marked as&nbsp;<code>1</code>&nbsp;and&nbsp;<code>0</code>&nbsp;respectively in the grid.</p>
<p>For example,</p>
<p>There is one obstacle in the middle of a 3x3 grid as illustrated below.</p>
<pre>[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
</pre>
<p>The total number of unique paths is&nbsp;<code>2</code>.</p>
<p>Note:&nbsp;<em>m</em>&nbsp;and&nbsp;<em>n</em>&nbsp;will be at most 100.</p>  

这道题在路径中加了一些障碍物，还是用动态规划来解，不同的是当遇到为1的点，将该位置的dp数组中的值清零，其余和之前那道题并没有什么区别，空间复杂度也是O(n)（如同前面中分析的，如果要更加严谨，我们可以取行和列中小的那个，然后把小的放在内层循环，空间复杂度就是O(min(m,n))，时间复杂度还是O(m*n)。代码如下：  

```cpp
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m=obstacleGrid.size(),n=obstacleGrid[0].size();
        if(!m||!n||obstacleGrid[0][0]==1||obstacleGrid[m-1][n-1]==1) 
        return 0;
        vector<int> dp(n,0);
        dp[0]=1;
        for(int i=0;i<m;++i){
            for(int j=0;j<n;++j)
            {
                if(obstacleGrid[i][j]==1) dp[j]=0;
                else dp[j]+=dp[j-1];
            }
        }
        return dp[n-1];     
        
    }
};
```

参考资料：[Code Ganker的博客](http://blog.csdn.net/linhuanmars/article/details/22126357)