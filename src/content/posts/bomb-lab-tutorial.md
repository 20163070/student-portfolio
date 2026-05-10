---
title: "ICS Bomb Lab：从汇编到输入推理"
date: "2026-05-10"
updated: "2026-05-10"
summary: "记录 Bomb Lab 的 GDB 调试、汇编阅读和输入推理过程。"
tags:
  - ICS
  - Lab
  - GDB
  - Assembly
---
# ICS Bomb Lab 教程：从汇编到输入推理

> 作者：20163070  
> 课程：ICS / CS:APP  
> 实验：Bomb Lab  
> 目标：不是背答案，而是掌握二进制逆向、GDB 调试、汇编阅读和程序逻辑还原能力。

---

## 0. 写在前面

Bomb Lab 的本质不是“猜六行答案”，而是：

> 给你一个二进制程序，让你通过反汇编和调试，逆推出每个 `phase_x` 对输入的要求。

整个实验训练的是：

- 阅读 x86-64 汇编
- 使用 GDB 动态调试
- 理解函数调用约定
- 理解栈、寄存器、条件跳转
- 从汇编还原 C 语言逻辑
- 构造满足条件的输入

---

## 1. 实验环境

### 1.1 文件结构

```bash
bomb
bomb.c
README
````

### 1.2 常用工具

```bash
gdb ./bomb
objdump -d bomb > bomb.d
strings bomb
```

### 1.3 常用 GDB 命令

```gdb
break phase_1
break phase_2
break explode_bomb

run
run < input.txt

disas phase_1
disas /r phase_1

info registers
x/s 0x地址
x/20gx $rsp
x/20dw $rsp

stepi
nexti
continue
quit
```

---

## 2. 总体解题流程

每一关都按这个流程走：

```text
找到 phase_x
↓
反汇编 phase_x
↓
找 explode_bomb 之前的判断条件
↓
看输入如何被读取
↓
看寄存器/栈中保存了什么
↓
还原成 C 语言逻辑
↓
构造合法输入
↓
写入 input.txt 测试
```

核心原则：

> 不要盲试输入。
> 每次输入都必须来自汇编证据。

---

# Phase 1：字符串比较

## 1. 本关目标

本关通常考察：

* 字符串常量读取
* 函数调用
* `strings_not_equal`
* 条件跳转
* 如何用 GDB 查看内存字符串

目标是找到程序要求输入的那一行字符串。

---

## 2. 进入 GDB

```bash
gdb ./bomb
```

设置断点：

```gdb
break phase_1
break explode_bomb
run
```

---

## 3. 反汇编 phase_1

```gdb
disas phase_1
```

粘贴关键汇编：

```asm
; 在这里粘贴你的 phase_1 汇编
```

---

## 4. 汇编逐句解释

### 4.1 关键调用

```asm
call strings_not_equal
```

说明这里在比较两个字符串：

* 一个是用户输入
* 一个是程序内置的正确字符串

### 4.2 条件跳转

```asm
test %eax, %eax
jne explode_bomb
```

解释：

* `strings_not_equal` 返回 0：两个字符串相等
* 返回非 0：两个字符串不等
* `jne explode_bomb`：如果不相等，就爆炸

所以本关逻辑可以还原成：

```c
if (strings_not_equal(input, target) != 0) {
    explode_bomb();
}
```

---

## 5. 如何查看目标字符串

在汇编中找到类似：

```asm
mov $0x402400, %esi
```

或者：

```asm
lea 0x????(%rip), %rsi
```

然后用：

```gdb
x/s 0x402400
```

记录结果：

```text
目标字符串：
TODO: 在这里填入你看到的字符串
```

---

## 6. 最终输入

```text
TODO: 写入 phase_1 的答案
```

---

## 7. 测试

创建输入文件：

```bash
echo "TODO: phase_1_answer" > input.txt
./bomb input.txt
```

或者：

```bash
./bomb < input.txt
```

---

## 8. 本关总结

本关核心：

* 看懂函数调用
* 知道 `%rdi` / `%rsi` 常用于传递前两个参数
* 知道 `strings_not_equal` 返回值如何影响跳转
* 学会用 `x/s 地址` 查看字符串

---

## 9. 易错点

1. 只用 `strings bomb` 乱找字符串，容易找错。
2. 没看清楚 `jne` 和 `je` 的区别。
3. 看到地址不会用 `x/s` 查看。
4. 把 `strings_not_equal` 理解反了。

---

# Phase 2：数字序列

## 1. 本关目标

本关通常考察：

* 读取多个整数
* 栈上数组
* 循环
* 数列规律
* 条件跳转

---

## 2. 设置断点

```gdb
break phase_2
break explode_bomb
run
```

---

## 3. 反汇编

```gdb
disas phase_2
```

粘贴关键汇编：

```asm
; 在这里粘贴 phase_2 汇编
```

---

## 4. 找输入读取函数

常见形式：

```asm
call read_six_numbers
```

说明程序会读取 6 个整数。

输入格式大概率是：

```text
a1 a2 a3 a4 a5 a6
```

---

## 5. 查看栈中数字

在 `read_six_numbers` 后设置断点或单步执行后：

```gdb
x/6dw $rsp
```

或者如果数字存在别的位置：

```gdb
x/6dw 具体地址
```

---

## 6. 还原循环逻辑

粘贴循环部分：

```asm
; TODO: 粘贴循环判断汇编
```

逐句解释：

```text
TODO:
1. 初始条件是什么？
2. 每次循环比较哪两个数？
3. 如果不满足什么条件会爆炸？
4. 循环变量如何变化？
```

---

## 7. 还原成 C 语言

```c
// TODO: 根据汇编还原逻辑
if (numbers[0] != ?) {
    explode_bomb();
}

for (int i = ?; i < ?; i++) {
    if (numbers[i] != ?) {
        explode_bomb();
    }
}
```

---

## 8. 推出数列

```text
TODO:
a1 =
a2 =
a3 =
a4 =
a5 =
a6 =
```

最终输入：

```text
TODO: 填入六个数字
```

---

## 9. 测试

```bash
echo "TODO: six numbers" >> input.txt
./bomb < input.txt
```

---

## 10. 本关总结

本关训练：

* 数组在栈上的表示
* 循环结构的汇编识别
* 条件跳转推理
* 从局部比较推出整体数列

---

# Phase 3：switch / jump table

## 1. 本关目标

本关通常考察：

* `sscanf`
* 多个输入参数
* switch 语句
* jump table
* 间接跳转
* case 分支匹配

---

## 2. 反汇编

```gdb
disas phase_3
```

粘贴关键汇编：

```asm
; TODO: 粘贴 phase_3 汇编
```

---

## 3. 识别输入格式

找到类似：

```asm
call __isoc99_sscanf
```

查看格式字符串：

```gdb
x/s 0x格式字符串地址
```

记录：

```text
输入格式：
TODO: 例如 "%d %d"
```

如果是：

```c
sscanf(input, "%d %d", &a, &b)
```

那么输入应该是：

```text
a b
```

---

## 4. 识别参数数量判断

常见逻辑：

```asm
cmp $0x1, %eax
jle explode_bomb
```

解释：

```text
sscanf 返回成功读取的参数数量。
如果读取数量不够，就爆炸。
```

---

## 5. 找 switch 范围

常见：

```asm
cmpl $0x7, ...
ja explode_bomb
```

说明：

```text
第一个参数必须在 0 到 7 之间。
```

记录：

```text
第一个参数范围：
TODO
```

---

## 6. 找 jump table

常见形式：

```asm
jmp *0x402470(,%rax,8)
```

查看 jump table：

```gdb
x/8gx 0x402470
```

记录：

```text
case 0 -> 地址：
case 1 -> 地址：
case 2 -> 地址：
case 3 -> 地址：
case 4 -> 地址：
case 5 -> 地址：
case 6 -> 地址：
case 7 -> 地址：
```

---

## 7. 分析每个 case

| case | 跳转地址 | 目标值  | 是否可用 |
| ---- | ---- | ---- | ---- |
| 0    | TODO | TODO | TODO |
| 1    | TODO | TODO | TODO |
| 2    | TODO | TODO | TODO |
| 3    | TODO | TODO | TODO |
| 4    | TODO | TODO | TODO |
| 5    | TODO | TODO | TODO |
| 6    | TODO | TODO | TODO |
| 7    | TODO | TODO | TODO |

---

## 8. 还原 C 语言

```c
int a, b;
if (sscanf(input, "%d %d", &a, &b) < 2) {
    explode_bomb();
}

switch (a) {
    case 0:
        target = ?;
        break;
    case 1:
        target = ?;
        break;
    case 2:
        target = ?;
        break;
    default:
        explode_bomb();
}

if (b != target) {
    explode_bomb();
}
```

---

## 9. 最终输入

选择一个合法 case：

```text
TODO: a b
```

---

## 10. 本关总结

本关核心能力：

* 识别 `sscanf`
* 识别 switch
* 识别 jump table
* 用 `x/Ngx 地址` 查看跳转表
* 将 case 分支还原成输入约束

---

# Phase 4：递归 / 二分搜索

## 1. 本关目标

本关通常考察：

* 递归函数
* 二分查找
* 函数返回值
* 参数传递
* 多条件输入

---

## 2. 反汇编 phase_4

```gdb
disas phase_4
```

粘贴：

```asm
; TODO
```

---

## 3. 找辅助函数

常见名字：

```text
func4
```

反汇编：

```gdb
disas func4
```

粘贴：

```asm
; TODO
```

---

## 4. 识别输入格式

```gdb
x/s 0x格式字符串地址
```

记录：

```text
输入格式：
TODO
```

---

## 5. 分析参数传递

x86-64 System V 前几个整数参数：

```text
第 1 个参数：%edi
第 2 个参数：%esi
第 3 个参数：%edx
第 4 个参数：%ecx
```

记录调用 `func4` 前：

```text
func4(arg1, arg2, arg3)

arg1 =
arg2 =
arg3 =
```

---

## 6. 还原 func4 逻辑

根据汇编写伪代码：

```c
int func4(int x, int low, int high) {
    int mid = ?;

    if (mid > x) {
        return ?;
    } else if (mid < x) {
        return ?;
    } else {
        return ?;
    }
}
```

---

## 7. 推出合法输入

phase_4 通常会检查：

```c
if (func4(x, low, high) != target) {
    explode_bomb();
}

if (y != another_target) {
    explode_bomb();
}
```

记录：

```text
x 的范围：
func4 返回值要求：
第二个输入 y 要求：
```

---

## 8. 最终输入

```text
TODO: x y
```

---

## 9. 本关总结

本关训练：

* 递归函数阅读
* 二分搜索理解
* 函数参数追踪
* 返回值约束推导

---

# Phase 5：字符串 / 位运算 / 查表

## 1. 本关目标

本关通常考察：

* 字符串长度
* 字符逐个处理
* 位运算 `& 0xf`
* 查表
* 构造目标字符串

---

## 2. 反汇编

```gdb
disas phase_5
```

粘贴：

```asm
; TODO
```

---

## 3. 字符串长度判断

常见：

```asm
call string_length
cmp $0x6, %eax
jne explode_bomb
```

说明：

```text
输入字符串长度必须为 6。
```

---

## 4. 找字符映射表

常见：

```asm
and $0xf, %edx
movzbl 0x表地址(%rdx), %edx
```

查看表：

```gdb
x/s 0x表地址
```

记录：

```text
映射表：
TODO
```

---

## 5. 找目标字符串

常见：

```asm
call strings_not_equal
```

查看目标字符串：

```gdb
x/s 0x目标字符串地址
```

记录：

```text
目标字符串：
TODO
```

---

## 6. 还原逻辑

```c
char table[] = "TODO";

for (int i = 0; i < 6; i++) {
    int index = input[i] & 0xf;
    result[i] = table[index];
}

if (strings_not_equal(result, target)) {
    explode_bomb();
}
```

---

## 7. 逆推出输入

目标字符串每个字符对应 table 中的位置：

| 目标字符 | table 下标 | 需要 input[i] & 0xf 等于 |
| ---- | -------- | -------------------- |
| TODO | TODO     | TODO                 |
| TODO | TODO     | TODO                 |
| TODO | TODO     | TODO                 |
| TODO | TODO     | TODO                 |
| TODO | TODO     | TODO                 |
| TODO | TODO     | TODO                 |

选择 ASCII 字符，使其低 4 位满足要求。

例如：

```text
如果需要低 4 位是 1，可以选 'a'，因为 0x61 & 0xf = 1
```

---

## 8. 最终输入

```text
TODO: 六个字符
```

---

## 9. 本关总结

本关训练：

* 字符串处理
* 位运算
* 查表
* 逆向构造输入

---

# Phase 6：链表 / 排序 / 指针

## 1. 本关目标

本关通常考察：

* 读取六个数字
* 检查范围
* 检查重复
* 链表节点
* 指针重排
* 排序约束

---

## 2. 反汇编

```gdb
disas phase_6
```

粘贴：

```asm
; TODO
```

---

## 3. 输入读取

通常仍然是：

```asm
call read_six_numbers
```

输入形式：

```text
n1 n2 n3 n4 n5 n6
```

---

## 4. 范围检查

记录：

```text
每个数字必须满足：
TODO
```

常见是：

```text
1 <= number <= 6
```

---

## 5. 重复检查

记录汇编：

```asm
; TODO
```

解释：

```text
六个数字不能重复。
```

---

## 6. 是否有数字变换

有些 Bomb 会有：

```c
numbers[i] = 7 - numbers[i];
```

记录：

```text
是否存在 7 - x 变换：
TODO
```

如果有：

| 原始输入 | 变换后 |
| ---- | --- |
| 1    | 6   |
| 2    | 5   |
| 3    | 4   |
| 4    | 3   |
| 5    | 2   |
| 6    | 1   |

---

## 7. 查看链表节点

找到链表头地址：

```gdb
x/24gx 0x链表头地址
```

或者按结构查看：

```gdb
x/6gx 0x节点地址
```

链表节点通常类似：

```c
struct Node {
    int value;
    int index;
    struct Node *next;
};
```

记录节点：

| 节点编号  | 地址   | value | next |
| ----- | ---- | ----- | ---- |
| node1 | TODO | TODO  | TODO |
| node2 | TODO | TODO  | TODO |
| node3 | TODO | TODO  | TODO |
| node4 | TODO | TODO  | TODO |
| node5 | TODO | TODO  | TODO |
| node6 | TODO | TODO  | TODO |

---

## 8. 判断排序要求

常见汇编：

```asm
cmp ...
jge ...
```

或者：

```asm
jl explode_bomb
```

记录：

```text
链表最终必须：
TODO: value 递增 / 递减
```

---

## 9. 推出节点顺序

按 value 排序：

| 排名 | 节点   | value |
| -- | ---- | ----- |
| 1  | TODO | TODO  |
| 2  | TODO | TODO  |
| 3  | TODO | TODO  |
| 4  | TODO | TODO  |
| 5  | TODO | TODO  |
| 6  | TODO | TODO  |

如果没有 `7 - x`：

```text
最终输入就是节点编号顺序。
```

如果有 `7 - x`：

```text
原始输入 = 7 - 节点编号
```

---

## 10. 最终输入

```text
TODO: 六个数字
```

---

## 11. 本关总结

本关训练：

* 多重循环
* 数组与指针
* 链表结构
* 内存查看
* 排序约束
* 逆向构造输入

---

# Secret Phase：隐藏关

## 1. 如何触发

在 `phase_defused` 中查看是否存在隐藏逻辑：

```gdb
disas phase_defused
```

查找：

```text
secret_phase
```

或者：

```bash
objdump -d bomb | grep -n "secret_phase"
```

---

## 2. 反汇编 secret_phase

```gdb
disas secret_phase
```

粘贴：

```asm
; TODO
```

---

## 3. 分析输入范围

记录：

```text
输入范围：
TODO
```

---

## 4. 分析树结构 / fun7

```gdb
disas fun7
```

粘贴：

```asm
; TODO
```

---

## 5. 查看树节点

节点结构通常类似：

```c
struct TreeNode {
    int value;
    TreeNode *left;
    TreeNode *right;
};
```

查看根节点：

```gdb
x/3gx 0x根节点地址
```

递归查看左右节点。

记录：

```text
TODO: 画出二叉树结构
```

可以写成：

```text
          root
         /    \
      left    right
```

---

## 6. 还原 fun7

```c
int fun7(TreeNode *node, int target) {
    if (node == NULL) {
        return -1;
    }

    if (target < node->value) {
        return 2 * fun7(node->left, target);
    } else if (target == node->value) {
        return 0;
    } else {
        return 2 * fun7(node->right, target) + 1;
    }
}
```

---

## 7. 推出目标路径

secret_phase 通常检查：

```c
if (fun7(root, input) != target) {
    explode_bomb();
}
```

记录：

```text
fun7 返回值要求：
TODO

对应二叉树路径：
TODO
```

---

## 8. 最终输入

```text
TODO
```

---

# 附录 A：x86-64 常用寄存器

| 寄存器    | 常见作用          |
| ------ | ------------- |
| `%rax` | 返回值           |
| `%eax` | `%rax` 低 32 位 |
| `%rdi` | 第 1 个参数       |
| `%rsi` | 第 2 个参数       |
| `%rdx` | 第 3 个参数       |
| `%rcx` | 第 4 个参数       |
| `%r8`  | 第 5 个参数       |
| `%r9`  | 第 6 个参数       |
| `%rsp` | 栈顶指针          |
| `%rbp` | 栈帧基址，有时被优化掉   |

---

# 附录 B：常见条件跳转

| 指令            | 含义      | 常见解释          |
| ------------- | ------- | ------------- |
| `je` / `jz`   | 相等则跳转   | zero flag = 1 |
| `jne` / `jnz` | 不相等则跳转  | zero flag = 0 |
| `jg`          | 有符号大于   |               |
| `jge`         | 有符号大于等于 |               |
| `jl`          | 有符号小于   |               |
| `jle`         | 有符号小于等于 |               |
| `ja`          | 无符号大于   |               |
| `jae`         | 无符号大于等于 |               |
| `jb`          | 无符号小于   |               |
| `jbe`         | 无符号小于等于 |               |

---

# 附录 C：常见指令解释

| 指令          | 含义          |
| ----------- | ----------- |
| `mov`       | 复制数据        |
| `lea`       | 计算地址，也常用于算术 |
| `cmp a, b`  | 比较 `b - a`  |
| `test a, a` | 测试 a 是否为 0  |
| `call`      | 调用函数        |
| `ret`       | 函数返回        |
| `push`      | 压栈          |
| `pop`       | 出栈          |
| `add`       | 加           |
| `sub`       | 减           |
| `imul`      | 乘           |
| `shr`       | 逻辑右移        |
| `sar`       | 算术右移        |
| `and`       | 按位与         |

---

# 附录 D：常用调试套路

## 1. 查看函数

```gdb
disas phase_1
disas phase_2
disas func4
```

## 2. 查看字符串

```gdb
x/s 0x地址
```

## 3. 查看整数数组

```gdb
x/6dw $rsp
```

## 4. 查看地址数组 / jump table

```gdb
x/8gx 0x地址
```

## 5. 查看寄存器

```gdb
info registers
```

## 6. 单步执行

```gdb
stepi
nexti
```

## 7. 防止炸弹爆炸

```gdb
break explode_bomb
```

如果断在 `explode_bomb`，说明上一条判断失败了。

这时候不要继续，直接：

```gdb
quit
```

---

# 附录 E：每关教程写作模板

每一关都按下面写：

````md
# Phase X：标题

## 1. 本关考察什么

## 2. 关键汇编

```asm
TODO
````

## 3. 输入格式

```text
TODO
```

## 4. 关键判断

```asm
TODO
```

解释：

```text
TODO
```

## 5. 还原 C 语言逻辑

```c
TODO
```

## 6. 推理过程

```text
TODO
```

## 7. 最终输入

```text
TODO
```

## 8. 测试方法

```bash
TODO
```

## 9. 易错点

1. TODO
2. TODO
3. TODO

## 10. 本关训练了什么能力

* TODO
* TODO
* TODO

````

---

# 附录 F：推荐 commit 方式

每完成一关教程后：

```bash
git add .
git commit -m "study: add bomb lab phase 1 tutorial"
git push
````

持续更新：

```bash
git add .
git commit -m "study: update bomb lab phase 3 jump table notes"
git push
```

---

# 最后总结

Bomb Lab 教程最重要的不是答案，而是这条链：

```text
汇编证据
→ 程序逻辑
→ 输入约束
→ 最终答案
→ 方法总结
```

如果你的教程能让别人看完之后知道：

> 下次遇到类似汇编，我该怎么拆。

那这篇教程就不是作业记录，而是你的 ICS 能力作品。

```
```
