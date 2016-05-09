---
layout: post
section-type: post
title: Majority Element & Majority Element II
category: leetcode
tags: [ 'array' ]
---

### Majority Element

Given an array of size n, find the majority element. The majority element is the element that appears more than &nbsp;<code>&lfloor; n/2 &rfloor;</code>&nbsp; times.

You may assume that the array is non-empty and the majority element always exist in the array.

这道题让我们求出现次数大于n/2的众数，使用摩尔投票法 Moore Voting,时间复杂度O(n),空间复杂度O(1).首先将第一个数字设为众数，计数器置为1，比较下一个数和此数是否相等，若相等计数器加一，不相等则成对删除，计数器减一。然后看计数器的值，若为0，则将当前值设为候选众数。以此类推直到遍历完整个数组，当前候选众数即为该数组的众数。代码如下：

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int m=0,cm=0;
        for(auto &a:nums)
        {
            if(a==m) ++cm;
            else if(cm==0) m=a,cm=1;
            else --cm;
        }
        return m;
    }
};
```

### Majority Element II

Given an integer array of size n, find all elements that appear more than &nbsp;<code>&lfloor; n/3 &rfloor;</code>&nbsp; times. The algorithm should run in linear time and in O(1) space.

Hint:

    How many majority elements could it possibly have?
    Do you have a better hint? Suggest it!
	
这道题让我们求出现次数大于n/3的众数，并且题目中提示让我们考虑可能有多少个众数，易证任意一个数组出现次数大于n/3的众数最多有两个，并且前一题中限定了一定会有众数存在而这题却没有，所以额外需要一轮投票验证候选众数。第一轮遍历找出两个候选众数（与上题一样），第二轮遍历重新投票验证这两个候选众数是否为众数。代码如下：

<pre><code data-trim class="c">
{% raw %}
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
         vector<int> res;
        int m=0,n=0,cm=0,cn=0;
        for(auto &a:nums)
        {
            if(a==m) ++cm;
            else if(a==n) ++cn;
            else if(cm==0) m=a,cm=1;
            else if(cn==0) n=a,cn=1;
            else --cm,--cn;
        }
        cm=cn=0;
        for(auto &a:nums)
        {
            if(a==m) ++cm;
            else if(a==n) ++cn;
        }
        if(cm>nums.size()/3) res.push_back(m);
        if(cn>nums.size()/3) res.push_back(n);
        return res;
    }
};
{% endraw %}
</code></pre>

<small>参考资料：<a href="http://www.cnblogs.com/grandyang/p/4233501.html" target="\_blank">Grandyang的博客</a></small>
