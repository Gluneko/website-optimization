---
layout: post
section-type: post
title: Container With Most Water
category: leetcode
tags: [ 'array' ]
---

### Container With Most Water

Given n non-negative integers *a<sub>1</sub>*, *a<sub>2</sub>*, ..., *a<sub>n</sub>*, where each represents a point at coordinate (*i*, *a<sub>i</sub>*). *n* vertical lines are drawn such that the two endpoints of line *i* is at (*i*, *a<sub>i</sub>*) and (*i*, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

Note: You may not slant the container. 

题意：有个高度数组，就相当于隔板的高度，求数组中任意两隔板间盛水的最大量。隔板间的距离与较低隔板的高度乘积即为盛水的容量。

答案是用两个指针从两端开始向中间靠拢，如果左端线段短于右端，那么左端右移，反之右端左移，直到左右两端移到中间重合，比较这个过程中每一次组成木桶的容积，返回其中最大的。时间复杂度O(n),空间复杂度O(1).解释：当左端线段left小于右端线段right时，我们把left右移，这时舍弃的是left与右端其他线段（right-1, right-2, ...）组成的木桶，这些木桶是没必要判断的，因为这些木桶的容积肯定都没有left和right组成的木桶容积大,反之同理。代码如下：

```cpp
class Solution {
public:
    int maxArea(vector<int>& height) {
        int res=INT_MIN,left=0,right=height.size()-1;
        while(left<right)
        {
            res=max(res,min(height[right],height[left])*(right-left));
            if(height[left]<height[right]) ++left;
            else --right;
        }
        return res;
    }
};
```


