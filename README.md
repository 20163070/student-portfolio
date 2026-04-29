# 学生个人作品集网站

这是一个从零创建的个人作品集网站，使用 Next.js、TypeScript 和 Tailwind CSS 构建。项目结构尽量保持简单，适合大一软件工程学生继续学习和维护。

## 功能

- 响应式首页
- Hero、About、Projects、Skills、Contact 五个区块
- 示例项目数据
- 清晰的组件拆分
- TypeScript 类型支持
- Tailwind CSS 样式系统

## 技术栈

- Next.js
- TypeScript
- Tailwind CSS
- ESLint

## 项目结构

```txt
src/
  app/
    globals.css      全局样式
    layout.tsx       页面布局和元信息
    page.tsx         首页入口
  components/        页面组件
  data/              示例项目和技能数据
```

## 安装依赖

```bash
npm install
```

## 本地运行

```bash
npm run dev
```

打开浏览器访问：

```txt
http://localhost:3000
```

## 代码检查

```bash
npm run lint
```

## 构建项目

```bash
npm run build
```

## 生产环境运行

```bash
npm run start
```

## 部署说明

推荐使用 Vercel 部署：

1. 将代码推送到 GitHub。
2. 登录 Vercel。
3. 导入这个 GitHub 仓库。
4. Framework Preset 选择 Next.js。
5. 点击 Deploy。

也可以部署到支持 Node.js 的服务器。部署前请先运行：

```bash
npm run build
```

## 如何修改内容

- 修改个人介绍：编辑 `src/components/About.tsx`
- 修改项目列表：编辑 `src/data/projects.ts`
- 修改技能列表：编辑 `src/data/skills.ts`
- 修改联系方式：编辑 `src/components/Contact.tsx`
- 修改整体颜色：编辑 `tailwind.config.ts` 和 `src/app/globals.css`

## 学习建议

如果你刚开始学习前端，可以按这个顺序继续扩展：

1. 把示例项目替换成自己的真实项目。
2. 给每个项目添加 GitHub 链接和在线预览链接。
3. 添加深色模式。
4. 添加博客或学习笔记页面。
5. 学习后端后，再加入留言表单或数据库。
