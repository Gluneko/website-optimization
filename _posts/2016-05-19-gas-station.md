---
layout: post
section-type: post
title: Gas Station
category: leetcode
tags: [ 'greedy' ]
---


### Gas Station  
  
<p>There are&nbsp;<em>N</em>&nbsp;gas stations along a circular route, where the amount of gas at station&nbsp;<em>i</em>&nbsp;is&nbsp;<code>gas[i]</code>.</p>
<p>You have a car with an unlimited gas tank and it costs&nbsp;<code>cost[i]</code>&nbsp;of gas to travel from station&nbsp;<em>i</em>&nbsp;to its next station (<em>i</em>+1). You begin the journey with an empty tank at one of the gas stations.</p>
<p>Return the starting gas station's index if you can travel around the circuit once, otherwise return -1.</p>
<p>Note:<br />The solution is guaranteed to be unique.</p>  
 

解题思路：我们首先要知道能走完整个环的前提是gas的总量要大于cost的总量，这样才会有起点的存在。假设开始设置起点start = 0, 并从这里出发，如果当前的gas值大于cost值，就可以继续前进，此时到下一个站点，剩余的gas加上当前的gas再减去cost，看是否大于0，若大于0，则继续前进。当到达某一站点时，若这个值小于0了，则说明**从起点到这个点中间的任何一个点都不能作为起点**，则把起点设为下一个点，继续遍历。当遍历完整个环时，当前保存的起点即为所求。代码如下：  

```cpp
//时间复杂度O(n)，空间复杂度O(1)
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int total=0,sum=0,start=0;
        for(int i=0;i<gas.size();++i)
        {
            total+=gas[i]-cost[i];
            sum+=gas[i]-cost[i];
            if(sum<0)
            {
                start=i+1;
                sum=0;
            }
        }
        return total>=0?start:-1;
    }
};
```  

参考资料：[Grandyang的博客](http://www.cnblogs.com/grandyang/p/4266812.html)