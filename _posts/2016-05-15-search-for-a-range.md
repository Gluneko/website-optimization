---
layout: post
section-type: post
title: Search for a Range
category: leetcode
tags: [ 'array' ]
---

### Search for a Range

<p>Given a sorted array of integers, find the starting and ending position of a given target value.</p>

<p>Your algorithm's runtime complexity must be in the order of <i>O</i>(log <i>n</i>).</p>

<p>If the target is not found in the array, return <code>[-1, -1]</code>.</p>

<p>
For example,<br>
Given <code>[5, 7, 7, 8, 8, 10]</code> and target value 8,<br>
return <code>[3, 4]</code>.
</p>     


题意：在一个有序整数数组中寻找给定目标值的起始和结束位置，要求算法时间复杂度为O(logn)，这是典型的二分查找法的时间复杂度，解决方法是采用两次二分查找法，第一次找到目标值范围的左边界，第二次调用找到其右边界，而后者可以通过找到目标值加一的范围的左边界减一得到，因而可以将两个过程简化到一个函数中。  
首先找到范围的左边界。根据二分查找法，初始化范围为[l=0,r=nums.size()-1],在每一次循环中计算中间元素[mid = (l+r)/2],由mid和target的关系有三种情况：  
1.如果nums[mid]< target,则范围在mid的右侧(下次循环l= mid+1);  
2.如果nums[mid]> target,则范围在mid的左侧(下次循环r= mid-1);  
3.如果nums[mid]= target,则范围起始于mid或其左侧(下次循环r= mid);  
可以将情况2和3合并为：  
2*. 如果 nums[mid] >= target, r = mid;  
注意：target不一定存在于数组中，所以还需要判断函数返回值是否合法。另外，考虑到nums=[1],target=1情况，将函数中初始r设为nums.size().

```cpp  
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int l=left(nums,target);
        if(l<0||l>=nums.size()||nums[l]!=target) return{-1,-1};
        return {l,left(nums,target+1)-1};
    }
private:
    int left(vector<int>& nums, int target)
    {
        int l=0,r=nums.size();
        while(l<r)
        {
            int mid=(l+r)/2;
            if(nums[mid]<target) l=mid+1;
            else r=mid;
        }
        return l;
    }
};
```  



