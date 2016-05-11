---
layout: post
section-type: post
title: Contains Duplicate & Contains Duplicate II & Contains Duplicate III
category: leetcode
tags: [ 'array' ]
---

### Contains Duplicate

Given an array of integers, find if the array contains any duplicates. Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct. 

找出数组中是否有重复值。使用一个哈希表遍历数组，如果哈希表里存在，返回true,不存在则将当前值放入哈希表中，代码如下：

```cpp
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_map<int,int> m;
        for(size_t i=0;i<nums.size();i++)
        {
            if(m.find(nums[i])!=m.end()) return true;
            ++m[nums[i]];
        }
        return false;
    }
};
```

### Contains Duplicate II

Given an array of integers and an integer k, find out whether there are two distinct indices i and j in the array such that nums[i] = nums[j] and the difference between i and j is at most k.

这题与上题的不同之处是重复值的坐标差不能超过k，也是找出一对即可。

```cpp
class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
        unordered_map<int, int> m;
        for (int i = 0; i < nums.size(); ++i) {
            if (m.find(nums[i]) != m.end() && i - m[nums[i]] <= k) return true;
            else m[nums[i]] = i;
        }
        return false;
    }
};
```

### Contains Duplicate III
