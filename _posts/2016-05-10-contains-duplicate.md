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

Given an array of integers, find out whether there are two distinct indices <i>i</i> and <i>j</i> in the array such that the difference between <b>nums[i]</b> and <b>nums[j]</b> is at most <i>t</i> and the difference between <i>i</i> and <i>j</i> is at most <i>k</i>.  

这道题跟前两道的关联并不是很大，这道题的焦点不是在重复值上面，反而是关注与不同的值之间的关系，这里有两个限制条件，两个数字的坐标差不能大于k，值差不能大于t。这里我们使用map数据结构来解,用来记录数字和其下标之间的映射。 这里需要两个指针i和j，刚开始i和j都指向0，然后i开始向右走遍历数组，如果i和j之差大于k，且m中有nums[j]和j的映射，则删除并j加一。这样保证了m中所有的数的下标之差都不大于k，然后我们用map数据结构的lower_bound()函数来找一个特定范围，就是大于或等于nums[i] - t的地方，所有小于这个阈值的数和nums[i]的差的绝对值会大于t (可自行带数检验)。然后检测后面的所有的数字，如果数的差的绝对值小于等于t，则返回true。最后遍历完整个数组返回false。代码如下：

```cpp
class Solution {
public:
    bool containsNearbyAlmostDuplicate(vector<int>& nums, int k, int t) {
        map<int, int> m;
        int j = 0;
        for (int i = 0; i < nums.size(); ++i) {
            if (i - j > k && m[nums[j]] == j) m.erase(nums[j++]);
            auto a = m.lower_bound(nums[i] - t);
            if (a != m.end() && abs(a->first - nums[i]) <= t) return true;
            m[nums[i]] = i;
        }
        return false;
    }
};
```
