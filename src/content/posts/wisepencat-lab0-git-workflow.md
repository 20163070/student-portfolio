---
title: "从零完成一次 GitHub 开源协作：WisePenCat Lab 0 实践与故障排查"
date: "2026-10-09"
updated: "2026-10-09"
summary: "WisePenCat Lab 0 的 Git / GitHub 命令行实践：从 Fork 到 PR，记录 Version Control 状态变化、网络连接、JSON 与 Windows 路径故障。"
tags:
  - WisePen
  - Git
  - GitHub
  - CLI
  - Vite
  - Version Control
  - Open Source
---

## 实验结果与证据

2026 年 10 月 9 日，我完成了 WisePenCat Lab 0 的本地实践：运行现有项目、添加自己的贡献者条目与头像，通过两次提交发起拉取请求（Pull Request，PR）。这是一次真实的软件工程实验记录（Verified Engineering Lab）。**截至同日核验，PR 已提交，等待审核，尚未合并。** 状态是静态记录，后续以 GitHub 页面为准。

| 公开证据                                                                                               | 可验证的内容                                                        |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| [原始仓库](https://github.com/zhao-jingyan/WisePenCat)                                                 | 项目代码和实验背景属于原始项目作者                                  |
| [我的 Fork](https://github.com/20163070/WisePenCat)                                                    | 我的 GitHub 仓库副本                                                |
| [提交 bd05e14](https://github.com/20163070/WisePenCat/commit/bd05e1405649deea4c7800ec92674413f06e6321) | `feat: add 20163070 to contributors`，修改 `src/contributors.json`  |
| [提交 7f91b6e](https://github.com/20163070/WisePenCat/commit/7f91b6e992cb20cf9975e7b2c799e918f33e5050) | `feat: add avatar for 20163070`，新增 `src/assets/20163070.png`     |
| [PR #20](https://github.com/zhao-jingyan/WisePenCat/pull/20)                                           | 从我的 `main` 向上游 `main` 提交，两次提交、两个文件；核验时为 Open |

我的代码贡献限于贡献者名单和头像。WisePenCat 的整体实现、界面和架构来自原始项目；命令行操作及排错过程是我的学习实践。提交证据能验证文件变更，不能独立证明此前每次网络失败的原因。

## 背景与实验目标

WisePenCat 是 WisePen 产品与 UIUX 入门实验使用的仓库。Lab 0《在命令行通关 Git》用一次小型开源协作（Open Source Collaboration），帮助初学者建立版本控制（Version Control）的基本习惯。

我阅读的实验 PDF 要求先派生仓库（Fork），再克隆（Clone）、安装依赖、运行项目，修改贡献者名单，通过提交（Commit）和推送（Push）发起 PR；加上与用户名匹配的头像是 Bonus。实验允许不同熟练程度的参与者采用合适流程，没有要求我在本次额外完成复杂分支操作。

这份记录关注两个目标：理解命令行界面（Command-Line Interface，CLI）如何操作实际文件和 Git 状态，以及在出错时找到能够验证下一步判断的证据。原始 PDF 仅用于核对要求，本文没有公开上传其全文。

## 环境与记录边界

| 项目                 | 本次环境或来源                                       |
| -------------------- | ---------------------------------------------------- |
| 系统与终端           | Windows，CMD / PowerShell                            |
| 版本控制工具         | Git for Windows                                      |
| 前端运行环境         | Node.js、npm；项目使用 Vite 开发服务器               |
| 本地访问             | `http://localhost:5173`，来自我的当时实践记录        |
| 任务要求             | 本地 Lab 0 PDF，已阅读核对                           |
| 文件与 PR 结果       | 公开 GitHub 提交及 PR，2026-10-09 核验               |
| 网络、JSON、复制错误 | 我的实践记录；本次整理没有重新制造或复现这些历史故障 |

整理时还只读检查了本地 WisePenCat：存在这两次提交，工作区干净。该检查仅说明检查时的状态。本次没有重新运行该项目，也没有把当前工具版本冒充成实验开始时的版本。没有可用的历史截图，因此用公开链接和文字记录展示结果。

## 从 Fork 到第一笔提交

### 获取并运行项目

Fork 在 GitHub 上创建我自己的远程副本，Clone 将这个副本的历史和文件下载到本地。两者发生的位置不同：只有完成克隆，才有可以编辑的本地工作目录。

以下命令按仓库根目录整理，供复习使用，不是逐字终端录像。首次普通克隆遭遇网络失败，成功克隆的方法和排查过程见后文；得到本地仓库后继续：

```powershell
git clone https://github.com/20163070/WisePenCat.git
cd WisePenCat
npm install
npm run dev
```

`npm install` 安装项目依赖；`npm run dev` 调用项目现有的 Vite 开发脚本。当时我通过 `localhost:5173` 查看页面。实际端口应以终端提示为准，若端口被占用，开发服务器可能选择其他端口。

### 编辑、检查与提交贡献者条目

我在 `src/contributors.json` 的数组中添加字符串 `"20163070"`。先检查差异和状态，再将目标文件加入暂存区，避免把无关文件混入提交。

```powershell
git diff -- src/contributors.json
git status
git add src/contributors.json
git diff --cached
git commit -m "feat: add 20163070 to contributors"
git log --oneline -2
git push origin main
```

`git diff` 检查尚未暂存的变更；`git diff --cached` 检查即将提交的内容，是适合继续保留的检查习惯。后者作为复习建议列出，不代表我当时记录了这条命令的运行输出。我的第一笔提交消息和文件变更可以在公开提交中核对。

接着在 GitHub 创建 PR #20：源是我的 Fork 的 `main`，目标是原始仓库的 `main`。本次实际使用的分支（Branch）就是 `main`，没有另建功能分支。

### 添加头像并更新同一个 PR

我把头像放入 `src/assets/20163070.png`。文件名与贡献者字符串相同，保持项目约定。确认路径后进行第二次提交并推送：

```powershell
git status
git add src/assets/20163070.png
git diff --cached --stat
git commit -m "feat: add avatar for 20163070"
git push origin main
git status
```

第二次推送仍然来自同一个 PR 的源分支，因此会更新已经存在的 PR，无需再开一个头像 PR。仓库维护者审核后才能决定是否合并（Merge）；我的推送本身不执行上游合并。[GitHub 的 PR 说明](https://docs.github.com/en/pull-requests/reference/pull-requests)解释了源分支后续提交与 PR 的关系。

## Git 的四个位置与状态变化

工作区（Working Directory / Working Tree）是实际编辑的文件；暂存区（Staging Area / Index）保存下一次提交准备收录的内容；本地仓库（Local Repository）保存提交历史；远程仓库（Remote Repository）在 GitHub 上接收推送。

下面是概念示意，**不是终端输出**：

```text
编辑文件
  ↓
工作区 ── git add ──→ 暂存区
                       │ git commit
                       ↓
                    本地仓库
                       │ git push
                       ↓
                 我的 GitHub Fork
                       │ Pull Request + 审核
                       ↓
                   上游仓库合并
```

贡献者名单是已有的受跟踪文件，编辑后表现为 Modified；新头像此前没有被 Git 跟踪，表现为 Untracked。`git add` 把对应内容暂存，`git commit` 把暂存内容记录为本地提交。

“Committed”和“Pushed”帮助描述操作进度，但不能把它们当成 `git status` 对文件显示的连续四种标签。推送处理的是提交与远程引用，不把某个文件变成一种叫 Pushed 的工作区状态。

我最终看到 `nothing to commit, working tree clean`。它表示没有待提交的工作区和暂存区变化；即使本地提交还没有推送，也可能得到干净状态。推送是否成功，应结合推送结果以及 GitHub 上的提交核对；上游是否接受则看 PR。`git status` 显示的领先或落后关系也依赖本地记录的远程跟踪引用，新鲜程度取决于最近一次与远程通信。复查时可以先 `git fetch origin`，再看状态和历史。

## 网络故障：把观察和解释分开

### 普通 HTTPS 成功不等于克隆成功

最初普通克隆报过 `Recv failure: Connection was reset`；另一些尝试报 `Failed to connect to github.com port 443`。这些信息说明失败发生在网络连接或传输过程中，但单凭一句错误不能判断唯一原因。

我用下面两个命令逐步缩小范围：

```powershell
curl.exe -I https://github.com
git ls-remote https://github.com/20163070/WisePenCat.git
```

实践记录里，前者得到 `HTTP/1.1 200 OK`，后者能取得 `HEAD` 和 `refs/heads/main`。这是当时观察到的结果，不是这里重新执行生成的日志。

`curl.exe -I` 请求站点响应头，`git ls-remote` 查询仓库引用，Clone 则还要传输对象历史。请求用途、传输量、时刻与客户端配置可能不同。一个短请求成功，说明那次请求可达，不能保证稍后的完整克隆一定成功。

### 查看连接日志

当时我在 **CMD** 开启调试变量：

```dos
set GIT_TRACE=1
set GIT_CURL_VERBOSE=1
git clone https://github.com/20163070/WisePenCat.git
set GIT_TRACE=
set GIT_CURL_VERBOSE=
```

最后两行是结束诊断后清除变量的建议。在 PowerShell 中，设置方法不同，应使用 `$env:GIT_TRACE = "1"` 与 `$env:GIT_CURL_VERBOSE = "1"`，结束后用 `Remove-Item Env:GIT_TRACE, Env:GIT_CURL_VERBOSE` 清除。

日志显示 Git 曾在连接一个 GitHub 公网 IP 的 443 端口时超时；另一次 curl 测试连接同一 IP 成功。这不能排除时序性网络波动。调试日志适合定位连接阶段，公开时只保留必要错误与判断，不复制完整请求头、Cookie 或认证信息。[Git 官方文档](https://git-scm.com/docs/git)提供命令参数和调试环境变量说明。

### Schannel 尝试成功，根因仍有边界

成功的尝试是为这一条命令指定传输层安全协议（Transport Layer Security，TLS）后端：

```powershell
git -c http.sslBackend=schannel clone https://github.com/20163070/WisePenCat.git
```

传输控制协议（Transmission Control Protocol，TCP）先建立连接；TLS 随后进行加密握手和证书验证；超文本传输协议（Hypertext Transfer Protocol，HTTP）在其上交换请求和响应。连接端口超时可能发生在 TLS 握手之前，因此不能直接把所有超时归咎于证书或 TLS 实现。

Schannel 是 Windows 的安全通道实现；OpenSSL 是另一套常用密码与 TLS 库。Git 的 HTTPS 传输使用 libcurl，能否选择某个后端取决于其构建支持。不同后端可能使用不同的证书信任机制；本次没有记录并对比原后端的完整配置，不能默认原来一定是 OpenSSL。[Git 配置文档](https://git-scm.com/docs/git-config#Documentation/git-config.txt-httpsslBackend)说明 `http.sslBackend` 的用途；[curl 的证书说明](https://curl.se/docs/sslcerts.html)介绍了原生证书存储与证书文件的差异。

准确结论是：**在这次排查中，指定 Schannel 的克隆尝试成功了，但没有通过充分的对照实验确定唯一根因。** 网络状态、时间和配置差异仍可能影响结果。这里使用的命令保留证书校验。

### 为什么用单次配置

Git 配置作用域（Configuration Scope）影响修改持续多久、作用于哪里：系统级配置影响系统安装；`--global` 影响当前用户；`--local` 影响当前仓库；`git -c` 为当前这次调用提供配置。若还有包含文件或其他环境配置，应结合来源检查实际生效值。

这里使用 `-c`，可以试验后端而不把这次选择永久写入所有仓库。要排查实际配置，可在本地使用 `git config --show-origin --get http.sslBackend`，但分享输出前应处理可能出现的私人配置路径。本次结果不构成必须修改全局配置的理由。

## 本地文件与语法故障

| 问题          | 观察与修正                                                                | 学到的检查方式                             |
| ------------- | ------------------------------------------------------------------------- | ------------------------------------------ |
| JSON 数组错误 | `expected ',' or ']' at line 16 column 1`；数组元素之间漏了逗号           | 检查报错行前一个元素、英文双引号和逗号     |
| 暂存路径错误  | `git add src/contributor.json` 不匹配；真实文件是 `src/contributors.json` | 核对单复数、当前目录和实际树结构           |
| CMD 复制失败  | 源与目标顺序错误、两个引号参数之间缺少空格                                | 按源在前、目标在后输入，复制后检查目标文件 |

### JSON：定位附近的结构

JavaScript 对象表示法（JavaScript Object Notation，JSON）对数组元素分隔符有明确要求。下面是最小语法示例，`existing-user` 是说明用的名字，不是仓库原文：

```json
["existing-user", "20163070"]
```

报错位置常是解析器首次无法继续的位置，实际缺失的逗号可能在上一行。JSON 也不能使用数组末尾的多余逗号。修正后，应保存文件、检查差异，并在开发页面确认数据能被读取。

### 路径：命令与当前目录一起决定目标

实验 PDF 中有一处 `git add src/contributor.json` 示例，与实际复数文件名不一致。这与我遇到的路径错误相符；执行时应以实际文件为准，而不是直接照抄文档。

本文把命令统一到仓库根目录：目标是 `src/contributors.json`。如果已经进入 `src`，相对路径应为 `contributors.json`，继续写 `src/…` 就会指向另一层目录。路径规格（Pathspec）不匹配，首先应检查拼写和当前目录，而不是急着改 Git 配置。

### Windows 复制：参数边界也属于语法

以下是使用泛化源路径的 **CMD 示例**，不是历史原命令：

```dos
copy "avatar source\portrait.png" "src\assets\20163070.png"
dir src\assets\20163070.png
```

源路径在前，目标在后；两个带引号的参数之间必须有空格。引号包住包含空格的路径，不能代替参数之间的分隔。在 PowerShell 中可以使用：

```powershell
Copy-Item -LiteralPath "avatar source\portrait.png" -Destination "src\assets\20163070.png"
Get-Item -LiteralPath "src\assets\20163070.png"
```

成功复制只是文件系统层面的结果，还需要 `git status` 确认新文件，再暂存和提交。公开的第二笔提交验证了最终目标文件确实进入仓库。

## 学习收获与后续方向

这次小实验把编辑、暂存、提交、推送和请求合并串在了一起。我开始理解为什么“本地修改完成”和“远程审核完成”是两个不同的阶段，也学会用差异和提交证据检查自己实际交付了什么。

排错过程中更有用的习惯是提出可验证的问题：普通请求是否通、仓库引用能否读取、超时发生在哪个阶段、文件名与当前目录是否匹配。一次成功的尝试值得记录，但只有充分对照才能更有把握地解释原因。

下一步准备在独立练习仓库学习功能分支（Feature Branch）、合并、合并冲突（Merge Conflict）以及变基（Rebase）。本次没有完成复杂分支合并或冲突处理，也没有把这些列为已掌握成果。继续练习时，我会保留最小复现步骤和脱敏日志，让后来的复盘比这次更容易核对。

回到 [Learning 实验档案](/learning/#labs)，或直接查看 [PR #20 的最新状态](https://github.com/zhao-jingyan/WisePenCat/pull/20)。
