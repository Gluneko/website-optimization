---
layout: post
section-type: post
title: Patching Array
category: leetcode
tags: [ 'greedy' ]
---


### Patching Array    
  
<p>Given a sorted positive integer array&nbsp;<em>nums</em>&nbsp;and an integer&nbsp;<em>n</em>, add/patch elements to the array such that any number in range&nbsp;<code>[1, n]</code>&nbsp;inclusive can be formed by the sum of some elements in the array. Return the minimum number of patches required.</p>
<p>Example 1:<br /><em>nums</em>&nbsp;=&nbsp;<code>[1, 3]</code>,&nbsp;<em>n</em>&nbsp;=&nbsp;<code>6</code><br />Return&nbsp;<code>1</code>.</p>
<p>Combinations of&nbsp;<em>nums</em>&nbsp;are&nbsp;<code>[1], [3], [1,3]</code>, which form possible sums of:&nbsp;<code>1, 3, 4</code>.<br />Now if we add/patch&nbsp;<code>2</code>&nbsp;to&nbsp;<em>nums</em>, the combinations are:&nbsp;<code>[1], [2], [3], [1,3], [2,3], [1,2,3]</code>.<br />Possible sums are&nbsp;<code>1, 2, 3, 4, 5, 6</code>, which now covers the range&nbsp;<code>[1, 6]</code>.<br />So we only need&nbsp;<code>1</code>&nbsp;patch.</p>
<p>Example 2:<br /><em>nums</em>&nbsp;=&nbsp;<code>[1, 5, 10]</code>,&nbsp;<em>n</em>&nbsp;=&nbsp;<code>20</code><br />Return&nbsp;<code>2</code>.<br />The two patches can be&nbsp;<code>[2, 4]</code>.</p>
<p>Example 3:<br /><em>nums</em>&nbsp;=&nbsp;<code>[1, 2, 2]</code>,&nbsp;<em>n</em>&nbsp;=&nbsp;<code>5</code><br />Return&nbsp;<code>0</code>.</p>  
  
题目大意：给我们一个有序的正数数组nums和一个正整数n，问最少需要给nums加几个数字，使其能组成[1,n]之间的所有数字，注意数组中的元素不能重复使用，否则的话只有要有1，就能组成所有的数字了。  
解题方法：定义一个变量miss，用来表示[0,n]之间最小的不能表示的值，那么初始化为1，为啥不为0呢，因为n=0没啥意义，直接返回0了。那么此时我们能表示的范围是[0, miss)，表示此时我们能表示0到miss-1的数，如果此时的num[i] <= miss，那么我们可以把我们能表示数的范围扩大到[0, miss+num[i])，如果num[i]>miss，那么此时我们需要添加一个数，为了能最大限度的增加表示数范围，我们加上miss它本身，以此类推直至遍历完整个数组，我们可以得到结果。下面我们来举个例子说明：  
给定nums = [1, 2, 4, 11, 30], n = 50，我们需要让[0, 50]之间所有的数字都能被nums中的数字之和表示出来。  
首先使用1, 2, 4可能表示出0到7之间的所有数(1,2,4都是2的幂所以易得，但是实际算法中我们还是要从第一个数开始推算)，表示范围为[0, 8)，但我们不能表示8，因为下一个数字11太大了，所以我们要在数组里加上一个8，此时能表示的范围是[0, 16)，那么我们需要插入16吗，答案是不需要，因为数组中有比16小的11（数组有1和4，可以组成5，而下一个数字11，加一起能组成16），所以有了数组中的11，我们此时能表示的范围扩大到[0, 27)，但我们没法表示27，因为30太大了，所以此时我们给数组中加入一个27，那么现在能表示的范围是[0, 54)，已经满足要求了，我们总共添加了两个数8和27，所以返回2即可。代码如下：  

```cpp
//时间复杂度O(n)，空间复杂度O(1)
class Solution {
public:
    int minPatches(vector<int>& nums, int n) {
        long miss=1,added=0,i=0;//考虑到测试样例中有miss=2147483647的情况，如用int会溢出
        while(miss<=n)
        {
            if(i<nums.size()&&nums[i]<=miss)
                miss+=nums[i++];
            else{
                miss+=miss;
                ++added;
            }
        }
        return added;
    }
};
```  

解法二与解法一大同小异，只不过增加的数目是间接求出的：  

```cpp
class Solution {
public:
    int minPatches(vector<int>& nums, int n) {
        int i=0,count=0;
        for(long miss=1;miss<=n;++count)
            miss+=(i<nums.size()&&nums[i]<=miss)?nums[i++]:miss;
        return count-i;
    }
};
``` 

参考资料：[Grandyang的博客](http://www.cnblogs.com/grandyang/p/5165821.html)