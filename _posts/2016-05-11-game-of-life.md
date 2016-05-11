---
layout: post
section-type: post
title: Game of Life
category: leetcode
tags: [ 'array' ]
---

### Container With Most Water

<p>According to the&nbsp;<a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">Wikipedia's article</a>: "The&nbsp;Game of Life, also known simply as&nbsp;Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."</p>
<p>Given a&nbsp;<em>board</em>&nbsp;with&nbsp;<em>m</em>&nbsp;by&nbsp;<em>n</em>&nbsp;cells, each cell has an initial state&nbsp;<em>live</em>&nbsp;(1) or&nbsp;<em>dead</em>&nbsp;(0). Each cell interacts with its&nbsp;<a href="https://en.wikipedia.org/wiki/Moore_neighborhood" target="_blank">eight neighbors</a>&nbsp;(horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):</p>
<p>&nbsp;</p>
<ol>
<li>Any live cell with fewer than two live neighbors dies, as if caused by under-population.</li>
<li>Any live cell with two or three live neighbors lives on to the next generation.</li>
<li>Any live cell with more than three live neighbors dies, as if by over-population..</li>
<li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
</ol>
<p>&nbsp;</p>
<p>Write a function to compute the next state (after one update) of the board given its current state.</p>
<p>Follow up:&nbsp;</p>
<ol>
<li>Could you solve it in-place? Remember that the board needs to be updated at the same time: You cannot update some cells first and then use their updated values to update other cells.</li>
<li>In this question, we represent the board using a 2D array. In principle, the board is infinite, which would cause problems when the active area encroaches the border of the array. How would you address these problems?</li>
</ol>
<p>&nbsp;</p> 


题目大意：

根据维基百科的文章：“生命游戏，也被简称为生命，是一款由英国数学家约翰·霍顿康威于1970年设计的细胞自动机。”

给定一个m * n的细胞隔板，每一个细胞拥有一个初始状态：存活(1)或者死亡(0)。每一个细胞与其周围的8个邻居细胞（水平，竖直，对角线）发生交互，依据如下四条规则（摘自维基百科）：

   任何相邻存活细胞数小于2个的存活细胞都会死亡，模拟人口不足。
   
   任何相邻存活细胞数为2个或者3个的存活细胞会存活到下一代。
   
   任何相邻存活细胞数大于3个的存活细胞都会死亡，模拟人口过载。
   
   任何相邻存活细胞数等于3个的死亡细胞都会成为一个存活细胞，模拟繁殖。

编写函数，根据隔板的当前状态，计算其下一个状态（一次更新之后）

进一步思考：

    你可以就地完成题目吗？记住隔板需要同时更新：你不能先更新某些细胞然后再以其变更后的值来更新其他细胞。
	
    在这个问题中，我们使用2维数组表示隔板。原则上，隔板是无穷的，这可能导致一些边界问题。你怎么处理边界问题？

解题思路：

由于题目中要求我们用置换方法in-place来解题，所以我们就不能新建一个相同大小的数组，那么我们只能更新原有数组，但是题目中要求所有的位置必须被同时更新，但是在循环程序中我们还是一个位置一个位置更新的，那么当一个位置更新了，这个位置成为其他位置的相邻细胞时，我们怎么知道其未更新的状态呢，我们可以使用状态机转换：

状态0： 死细胞转为死细胞

状态1： 活细胞转为活细胞

状态2： 活细胞转为死细胞

状态3： 死细胞转为活细胞

最后我们对所有状态对2取余，那么状态0和2就变成死细胞，状态1和3就是活细胞，达成目的。我们先对原数组进行逐个扫描，对于每一个位置，扫描其周围八个位置，如果遇到状态1或2，就计数器累加1，扫完8个邻居，如果少于两个活细胞或者大于三个活细胞，而且当前位置是活细胞的话，标记状态2，如果正好有三个活细胞且当前是死细胞的话，标记状态3。完成一遍扫描后再对数据扫描一遍，对2取余变成我们想要的结果。参见代码如下：

```cpp
class Solution {
public:
    void gameOfLife(vector<vector<int> >& board) {
        int m = board.size(), n = m ? board[0].size() : 0;
        int dx[] = {-1, -1, -1, 0, 1, 1, 1, 0};
        int dy[] = {-1, 0, 1, 1, 1, 0, -1, -1};
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                int cnt = 0;
                for (int k = 0; k < 8; ++k) {
                    int x = i + dx[k], y = j + dy[k];
                    if (x >= 0 && x < m && y >= 0 && y < n && (board[x][y] == 1 || board[x][y] == 2)) {
                        ++cnt;
                    }
                }
                if (board[i][j] && (cnt < 2 || cnt > 3)) board[i][j] = 2;
                else if (!board[i][j] && cnt == 3) board[i][j] = 3;
            }
        }
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                board[i][j] %= 2;
            }
        }
    }
};
```


