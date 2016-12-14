---
layout: post
section-type: post
title: Summary Ranges
category: leetcode
tags: [ 'array' ]
---


### Summary Ranges    
  
<p>Given a sorted integer array without duplicates, return the summary of its ranges.</p>
<p>For example, given <code>[0,1,2,4,5,7]</code>, return <code>["0-&gt;2","4-&gt;5","7"].</code></p>  
 
这道题给定我们一个有序数组，让我们总结区间，具体来说就是让我们找出连续的序列，然后首尾两个数字之间用个“->"来连接，那么我只需遍历一遍数组即可，每次检查下一个数是不是递增的，如果是，则继续往下遍历，如果不是了，我们还要判断此时是一个数还是一个序列，一个数直接存入结果，序列的话要存入首尾数字和箭头“->"。我们需要两个变量i和j，其中i是连续序列起始数字的位置，j是连续数列的长度，当j为1时，说明只有一个数字，若大于1，则是一个连续序列，代码如下：  

```cpp
//时间复杂度O(n)，空间复杂度O(1)
class Solution {
public:
    vector<string> summaryRanges(vector<int>& nums) {
        vector<string> res;
        int i=0,n=nums.size();
        while(i<n)
        {
            int j=1;
            while(i+j<n&&nums[i+j]-nums[i]==j) ++j;
            res.push_back(j==1?to_string(nums[i]):to_string(nums[i])+"->"+to_string(nums[i+j-1]));
            i+=j;
        }
        return res;
    }
};
```  

参考资料：[Grandyang的博客](http://www.cnblogs.com/grandyang/p/4603555.html)