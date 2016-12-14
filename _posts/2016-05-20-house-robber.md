---
layout: post
section-type: post
title: House Robber
category: leetcode
tags: [ 'dynamic progamming' ]
---


### House Robber        
  
<p>You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and&nbsp;it will automatically contact the police if two adjacent houses were broken into on the same night.</p>
<p>Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight&nbsp;without alerting the police.</p>    
  
这道题的本质相当于在一列数组中取出一个或多个不相邻数，使其和最大。那么我们对于这类求极值的问题首先考虑动态规划Dynamic Programming来解，我们维护一个一位数组dp，其中dp[i]表示到i位置时不相邻数能形成的最大和，那么递推公式怎么写呢，我们先拿一个简单的例子来分析一下，比如说nums为{3, 2, 1, 5}，那么我们来看我们的dp数组应该是什么样的，首先dp[0]=3没啥疑问，再看dp[1]是多少呢，由于3比2大，所以我们抢第一个房子的3，当前房子的2不抢，所以dp[1]=3，那么再来看dp[2]，由于不能抢相邻的，所以我们可以用再前面的一个的dp值加上当前的房间值，和当前房间的前面一个dp值比较，取较大值当做当前dp值，所以我们可以得到递推公式dp[i] = max(num[i] + dp[i - 2], dp[i - 1]), 由此看出我们需要初始化dp[0]和dp[1]，其中dp[0]即为num[0]，dp[1]此时应该为max(num[0], num[1])，代码如下：  

```cpp
//时间复杂度O(n)，空间复杂度O(n)
class Solution {
public:
    int rob(vector<int>& nums) {
        int n=nums.size();
        if(n<=1) return n==0?0:nums[0];
        vector<int> dp{nums[0],max(nums[0],nums[1])};
        for(int i=2;i<n;++i)
            dp.push_back(max(dp[i-2]+nums[i],dp[i-1]));
        return dp.back();
    }
};
```  

### House Robber II  

<p>After robbing those houses on that street, the thief has found himself a new place for his thievery so that he will not get too much attention. This time, all houses at this place are <strong>arranged in a circle.</strong> That means the first house is the neighbor of the last one. Meanwhile, the security system for these houses remain the same as for those in the previous street.</p>
<p>Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight <strong>without alerting the police</strong>.</p>  

现在房子排成了一个圆圈，则如果抢了第一家，就不能抢最后一家，因为首尾相连了，所以第一家和最后一家只能抢其中的一家，或者都不抢，那我们这里变通一下，如果我们把第一家和最后一家分别去掉，各算一遍能抢的最大值，然后比较两个值取其中较大的一个即为所求。那我们只需参考之前的House Robber打家劫舍中的解题方法，然后调用两边取较大值，代码如下：  

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        int n=nums.size();
        if(n<=1) return n==0?0:nums[0];
        vector<int> vec1=nums,vec2=nums;
        vec1.erase(vec1.begin()),vec2.pop_back();
        return max(rob_house(vec1),rob_house(vec2));
    }
    int rob_house(vector<int>& nums) {
        int n=nums.size();
        if(n<=1) return nums[0];
        vector<int> dp{nums[0],max(nums[0],nums[1])};
        for(int i=2;i<n;++i)
            dp.push_back(max(dp[i-2]+nums[i],dp[i-1]));
        return dp.back();
    }
};
```


参考资料：[Grandyang的博客](http://www.cnblogs.com/grandyang/p/4383632.html)
