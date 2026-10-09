---
title: "Lab 1A | Hello Frontend!"
date: "2026-10-09"
summary: "React 入门：从交互式计数器理解组件与状态管理"
tags:
  - WisePen
  - Lab 1A
  - React
  - TypeScript
  - JSX
  - TSX
  - State
  - useState
  - HeroUI
demo: counter
---

## 实验概览

WisePen Lab 1A《Hello Frontend！》以一个交互式计数器介绍 React 前端开发。实验说明要求实现每次点击数字加一，学习项目初始化、`useState` 和 HeroUI 按钮，并提供三道组件与状态更新思考题。本文根据实际源码和实验 PDF 整理，技术解释采用客观总结，不推测个人耗时、困难或学习经历。

查看 [GitHub 公开源码](https://github.com/20163070/wisepen-lab1a)或[原计数器 App.tsx](https://github.com/20163070/wisepen-lab1a/blob/main/src/App.tsx)。公开仓库为整理副本：计数器代码保持原实现，运行依赖和样式入口已补齐。

本地核心实现位于 `src/App.tsx`：用 `useState(0)` 初始化状态，`handleClick` 调用 `setCount(prev => prev + 1)`，HeroUI `Button` 通过 `onPress` 绑定事件，按钮显示 `count is {count}`。入口 `src/main.tsx` 使用 React 的 `createRoot`，并启用 `StrictMode`。

| 范围         | 实际检查结果                                                           |
| ------------ | ---------------------------------------------------------------------- |
| 实验技术     | React、TypeScript / TSX、Vite；源码导入 HeroUI 按钮                    |
| 核心功能     | 初始值 0，每次按下按钮加 1，在按钮文字中展示状态                       |
| 原目录依赖   | HeroUI 不在依赖声明中，也无法解析；不能据此宣称原目录可直接构建        |
| 公开源码副本 | 保留原 `App.tsx`，补齐 HeroUI 依赖和样式入口，移除未使用的模板资源     |
| 本网站 Demo  | React Client Component，保留状态逻辑，改用原生按钮和已有 Tailwind 样式 |

本实验属于课程学习档案，不计入主要工程项目。没有加入存储、服务端接口、多人协作或其他原源码未实现的功能。Demo 状态只存在当前组件中，刷新页面会重置。

## 核心代码：原实验与网站适配

### 原实验的状态与按钮

下面是原 `App.tsx` 的核心逻辑节选，省略了只负责居中的 `main` 外层。实际组件名是 `App`；它承担本实验计数器组件（Counter Component）的职责。

```tsx
import { useState } from "react";
import { Button } from "@heroui/react";

export default function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <Button variant="primary" onPress={handleClick}>
      count is {count}
    </Button>
  );
}
```

这是一个状态、一个更新函数和一个按钮组成的最小交互。`onPress` 是 HeroUI 提供的按下事件 API，不是原生 HTML 按钮的属性。

### Next.js 展示代码

作品集已有 React 和样式系统，未安装 HeroUI。这里保留相同的函数式状态更新，使用原生 `button` 的 `onClick`；下面节选实际 `CounterDemo.tsx` 的交互部分：

```tsx
"use client";

import { useState } from "react";

export function CounterDemo() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((prev) => prev + 1);
  }

  return (
    <button type="button" onClick={handleClick}>
      count is {count}
    </button>
  );
}
```

`"use client"` 标明组件需要在浏览器中处理状态和事件。完整展示组件还提供当前值、轻量的 `aria-live` 状态播报、聚焦样式和操作提示。原生按钮自带 Tab、Enter、空格的键盘行为。它随静态页面一起导出，加载后由 React 接管交互，不需要单独服务器，也没有把整个 Vite 工程嵌入网站。

公开的 Vite 源码副本保留 HeroUI 实现；网站 Demo 使用现有设计系统。两份代码的按钮层不同，计数的状态更新规则相同。[HeroUI 官方按钮文档](https://heroui.com/en/docs/react/components/button)说明组件 API。

## HTML、CSS 与 JavaScript

HTML 描述页面的结构和语义，例如标题、正文和按钮；CSS 控制布局、颜色、间距与不同屏幕上的表现；JavaScript 处理点击等行为和数据变化。

React 在这些基础能力之上组织 UI。组件（Component）可以把一段界面和相关逻辑放在一起，之后在其他页面中复用。计数器的按钮是界面结构，居中和配色是样式，点击后计算下一次计数是交互逻辑。

## 组件、JSX / TSX 与声明式 UI

React 函数组件接收输入并返回界面的描述。组件通常以大写名称引用，例如 `<App />`；小写 `<button>` 表示内置 HTML 元素。组件是函数，并不意味着应该在自己的业务代码里直接执行 `App()`；正常用法由 React 通过 JSX 调用它并管理状态。[React 的组件说明](https://react.dev/learn/your-first-component)介绍了这个约定。

JSX 是 JavaScript 中描述 UI 的语法扩展，看起来像 HTML，但可以在 `{}` 中嵌入 JavaScript 表达式。它会由工具链转换成 JavaScript，浏览器不会直接运行 JSX 源文件。TSX 则是包含 JSX 的 TypeScript 文件形式，可以同时写界面表达式和类型信息。`.ts` 适合一般类型与逻辑，`.tsx` 用于需要 JSX 的文件；文件扩展名不决定一个函数是否是 React 组件。[JSX 官方说明](https://react.dev/learn/writing-markup-with-jsx)解释了这种标记与 JavaScript 的关系。

`count is {count}` 的意思是“此时状态是多少，就显示多少”。这种根据状态描述界面的方式称为声明式 UI（Declarative UI），不用在点击后自己寻找按钮并改写它的 `textContent`。

## useState 与重新渲染

状态（State）是 React 为组件保存、能影响下一次界面的信息。`useState(0)` 返回当前 `count` 与更新函数 `setCount`：前者用于本次渲染，后者请求后续更新。组件需要更新时，React 再次执行组件函数得到新的界面描述，并将所需变化提交到 DOM；重新渲染（Re-render）不等于把整个网页销毁重建。

概念流程如下，属于说明示意：

```text
按下按钮
   ↓ 事件处理（Event Handling）
handleClick → setCount(prev => prev + 1)
   ↓ React 处理状态更新
重新执行组件 → 生成新界面描述
   ↓ 更新 DOM
按钮显示新的 count
```

普通局部变量既不能通知 React 重新渲染，也不会自动跨每次组件调用保留。需要变化驱动界面的数据应使用状态，而不是直接修改局部变量。[React 状态文档](https://react.dev/learn/state-a-components-memory)解释了状态如何保存组件信息。

## 实验思考题解析

以下三题对应实验 PDF 的思考部分，以独立解释和最小示例整理，未上传原 PDF 或截图。

### 一：为什么组件可以是导出的函数

组件本质上给 React 返回界面描述，所以可以由函数实现。`export` 是模块系统语法，让入口文件能导入组件；它不会把普通函数自动变为组件。函数返回 JSX、按组件方式被 React 使用，才构成这里的函数组件。TSX 同时承载 TypeScript 和 JSX，由编译工具转换后供应用运行。

例如 `main.tsx` 导入默认导出的 `App`，再将 `<App />` 交给根节点渲染。状态的生命周期由 React 维护，不是由 `export` 或 `.tsx` 扩展名提供。

### 二：为什么普通变量不能更新显示

实验中的示例是：

```tsx
function Counter() {
  let count = 0;

  const handleClick = () => {
    count++;
  };

  return <button onClick={handleClick}>count is {count}</button>;
}
```

第一次渲染时按钮文字是 `count is 0`。点击处理函数可以修改该次渲染闭包中的局部变量，但这个赋值没有向 React 提交更新请求，因此按钮显示不会随之变化。如果其他原因让组件再次执行，`let count = 0` 又会初始化一个新的局部变量。

关键不是“变量绝对不能改变”，而是“变量改变没有触发 React 更新，也没有作为组件状态保存”。使用 `useState` 同时解决保存和通知更新的问题。

### 三：连续三次更新为什么通常只加 1

实验示例在同一次点击处理函数里调用：

```tsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

事件处理函数读到的是所属渲染的状态快照（State Snapshot）。假设本次 `count` 是 0，这三行求值得到的参数都是 1，向队列加入三次“替换为 1”的请求。React 在事件处理结束后处理这些更新；最终是 1，不是 3。`setCount` 不会立即改写当前函数里已有的 `count` 绑定。下一次独立点击会读取新渲染的快照。

函数式更新则把计算下一步的函数放入队列：

```tsx
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

每个更新函数接收前一步更新结果：从 0 出发，依次得到 1、2、3。这里才会一次加 3。Demo 的普通点击只调用一次更新函数，所以仍然每次加 1。[React 状态快照](https://react.dev/learn/state-as-a-snapshot)与[更新队列](https://react.dev/learn/queueing-a-series-of-state-updates)分别解释这两部分。

更新函数应保持纯粹，不在其中执行网络请求或其他副作用。开发环境的 Strict Mode 可能额外调用更新函数来检查纯度并忽略重复结果；这不意味着一次点击应该加两次。

## 技术总结与相关实验

| 知识             | 在本实验中的作用                             |
| ---------------- | -------------------------------------------- |
| React Component  | 将计数逻辑与界面组织成可复用函数组件         |
| JSX / TSX        | 在代码中描述按钮，插入当前状态，结合类型检查 |
| State / useState | 保存组件状态，通过 setter 请求更新           |
| Event Handling   | 将按钮操作交给 `handleClick`                 |
| Re-render        | 根据下一次状态重新计算界面                   |
| State Snapshot   | 一次渲染的事件处理函数读取当次状态           |
| Declarative UI   | 由状态决定按钮文字，无需手动更新 DOM 文本    |

组件库可以提供统一的样式和交互能力，但也需要正确安装、加载样式并匹配版本。本实验原代码选择 HeroUI；在已有设计系统的作品集里，一个原生按钮就足以展示相同的状态机制。

这是一份技术知识整理，不将未记录的学习经历、调试过程或教师评价写成个人成果。

继续查看 [Learning → WisePen 课程实验](/learning/#wisepen)、[WisePen 分类笔记](/tags/WisePen/)或[Lab 0：Git 协作与故障排查](/blog/wisepencat-lab0-git-workflow/)。
