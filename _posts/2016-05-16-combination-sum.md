---
layout: post
section-type: post
title: Combination Sum I & II & III
category: leetcode
tags: [ 'array','Backtracking' ]
---

### Combination Sum 

<p>Given a set of candidate numbers (<b><i>C</i></b>) and a target number (<b><i>T</i></b>), find all unique combinations in <b><i>C</i></b> where the candidate numbers sums to <b><i>T</i></b>. 
</p>

<p>The <b>same</b> repeated number may be chosen from <b><i>C</i></b> unlimited number of times.
</p>

<p><b>Note:</b><br>
</p><ul>
<li>All numbers (including target) will be positive integers.</li>
<li>Elements in a combination (<i>a</i><sub>1</sub>, <i>a</i><sub>2</sub>, … , <i>a</i><sub>k</sub>) must be in non-descending order. (ie, <i>a</i><sub>1</sub> ≤ <i>a</i><sub>2</sub> ≤ … ≤ <i>a</i><sub>k</sub>).</li>
<li>The solution set must not contain duplicate combinations.</li>
</ul>
<p></p>

<p>
For example, given candidate set <code>2,3,6,7</code> and target <code>7</code>, <br>
A solution set is: <br>
<code>[7]</code> <br>
<code>[2, 2, 3]</code></p>  


题目大意：有一个正整数集合C和一个目标数T（T也为正整数）。现从C中选出一些数，使其累加和恰好等于T（C中的每个数都可以取若干次），求所有不同的取数方案。本题中我们需要用到回溯法。在图的遍历中接触过深度优先搜索方法（DFS）,  回溯法和DFS大致等同，可以用一个等式表示它们的关系：回溯法=DFS+剪枝。所以回溯法是DFS的延伸，其目的在于通过剪枝使得在深度优先搜索过程中如果满足了回溯条件不必找到叶子节点，就截断这一条路径，从而加速DFS。实际上，即使没有剪枝，DFS在从下层回退到上层的时候也是一个回溯的过程，通常这个时候某些变量的状态。DFS通常用递归的形式实现比较直观，也可以用非递归，但通常需要借组辅助的数据结构（比如栈）来存储搜索路径。

```cpp  
//时间复杂度O(n!),空间复杂度O(n)
class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        sort(candidates.begin(),candidates.end());//对C中候选数升序排序，为后面的剪枝做准备
        vector<vector<int>> result;// 最终结果
        vector<int> path;//中间结果
        dfs(candidates,path,result,target,0);
        return result;
    }
    void dfs(vector<int>& nums, vector<int>& path, vector<vector<int>>& result, int gap, int start)
    {
        if(!gap) //找到一个合法解
        {
            result.push_back(path);
            return;
        }
        for(size_t i=start;i<nums.size();++i)//扩展状态
        {
            if(nums[i]>gap) return;//剪枝
            path.push_back(nums[i]);//执行扩展动作
            dfs(nums,path,result,gap-nums[i],i);
            path.pop_back();//撤销动作
        }
    }
};
```  

### Combination Sum II

<p>Given a collection of candidate numbers (<b><i>C</i></b>) and a target number (<b><i>T</i></b>), find all unique combinations in <b><i>C</i></b> where the candidate numbers sums to <b><i>T</i></b>.
</p>

<p>Each number in <b><i>C</i></b> may only be used <b>once</b> in the combination.
</p>
<p><b>Note:</b><br>
</p><ul>
<li>All numbers (including target) will be positive integers.</li>
<li>Elements in a combination (<i>a</i><sub>1</sub>, <i>a</i><sub>2</sub>, … , <i>a</i><sub>k</sub>) must be in non-descending order. (ie, <i>a</i><sub>1</sub> ≤ <i>a</i><sub>2</sub> ≤ … ≤ <i>a</i><sub>k</sub>).</li>
<li>The solution set must not contain duplicate combinations.</li>
</ul>
<p></p>

<p>
For example, given candidate set <code>10,1,2,7,6,1,5</code> and target <code>8</code>, <br>
A solution set is: <br>
<code>[1, 7]</code> <br>
<code>[1, 2, 5]</code> <br>
<code>[2, 6]</code> <br>
<code>[1, 1, 6]</code></p>  

题二与题一的区别是集合C中的每个数最多只能取一次，不过C中可以有重复的数。可以采用与题一类似的方法，但是由于题二中的每个数只能取一次，所以dfs函数中的参数i应该换成i+1，表示取下一个数。但这样带来的问题是，结果中会出现重复的取数方案，拿题中的例子来分析：C中有两个1可以选，那第一个1和7是一种可选方案（1+7=8），第二个1和7也是一种可选方案，按照上述算法，[1,7]会在结果中出现两次。当然可以对最后结果去重（如果用C++的话，sort->unique->erase可以实现）。不幸的是，这种解法会超时。解决超时的方案是不要将重复的方案加入到结果集中，也就避免了去重的工作。  

```cpp
class Solution {
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(),candidates.end());
        vector<vector<int>> result;
        vector<int> path;
        dfs(candidates,path,result,target,0);
        return result;
    }
    void dfs(vector<int>& nums,vector<int>& path,vector<vector<int>>& result,int gap,int start)
    {
        if(!gap)
        {
            result.push_back(path);
            return;
        }
        for(size_t i=start;i<nums.size();++i)
        {
            if(i>start&&nums[i]==nums[i-1]) continue;//确保每个元素至多用一次
            if(nums[i]>gap) return;
            path.push_back(nums[i]);
            dfs(nums,path,result,gap-nums[i],i+1);
            path.pop_back();
        }
    }
};
```

### Combination Sum III

<p>Find all possible combinations of <em><strong>k</strong></em> numbers that add up to a number <em><strong>n</strong></em>, given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.</p>
<p>Ensure that numbers within the set are sorted in ascending order.</p>
<p> <em><strong>Example 1:</strong></em></p>
<p>Input:  <em><strong>k</strong></em> = 3,  <em><strong>n</strong></em> = 7</p>
<p>Output: </p>
<pre>[[1,2,4]]
</pre>
<br>
<p> <em><strong>Example 2:</strong></em></p>
<p>Input:  <em><strong>k</strong></em> = 3,  <em><strong>n</strong></em> = 9</p>
<p>Output: </p>
<pre>[[1,2,6], [1,3,5], [2,3,4]]
</pre>

题目大意：寻找所有满足k个数之和等于n的组合，只允许使用数字1-9，并且每一种组合中的数字应该是唯一的。该题与前面两道最显著的不同就是这道题的个数是固定的，为k。n是k个数字之和，如果n小于0，则直接返回，如果n正好等于0，而且此时path中数字的个数正好为k，说明此时是一个正确解，将其存入结果result中，代码如下：  

```cpp
class Solution {
public:
    vector<vector<int>> combinationSum3(int k, int n) {
        vector<int> nums{1,2,3,4,5,6,7,8,9};
        vector<vector<int>> result;
        vector<int> path;
        dfs(nums,path,result,n,k,0);
        return result;
    }
    void dfs(vector<int>& nums,vector<int>& path,vector<vector<int>>& result,int gap,int length,int start)
    {
        if(length<0) return;
        if(gap==0&&length==0)
        {
            result.push_back(path);
            return;
        }
            for(size_t i=start;i<nums.size();++i)
            {
                if(nums[i]>gap) return;//gap小于0，直接返回
                path.push_back(nums[i]);
                dfs(nums,path,result,gap-nums[i],length-1,i+1);
                path.pop_back();
            }
    }
};
```

参考资料：[hujing_Liu的博客](http://blog.csdn.net/lc_910927/article/details/37535541?utm_source=tuicool&utm_medium=referral)  [Grandyang的博客](http://www.cnblogs.com/grandyang/p/4419386.html)