# Easy SaaS Next

一个现代化的、功能丰富的 SaaS 应用模板，基于 Next.js 15 和 React 19 构建。

## 项目简介

Easy SaaS Next 是一个完整的 SaaS 应用程序模板，提供了丰富的开箱即用功能，帮助开发者快速构建高质量的 SaaS 产品。项目采用最新的 Web 技术栈，确保了良好的性能、可维护性和用户体验。

## 功能特点

- 🚀 基于 Next.js 15 的现代化应用架构
- 🎨 集成 Tailwind CSS 的响应式 UI 设计
- 📚 内置文档系统 (fumadocs)
- 🔐 用户认证系统 (better-auth)
- 🌐 国际化支持 (next-intl)
- 📊 数据库集成 (drizzle-orm)
- 🎯 AI 功能支持
- 📝 Markdown/MDX 支持
- 🔥 实时加载进度条
- 🌓 深色模式支持
- Seo
  - metadata
  - sitemap
  - robots
- ⚡ Turbopack 支持

## 技术栈

### 核心框架
- Next.js 15
- React 19
- TypeScript

### UI/样式
- Tailwind CSS
- shadcn/ui 组件
- Lucide React 图标

### 数据库和ORM
- PostgreSQL
- Drizzle ORM

### 开发工具
- ESLint
- Prettier
- Husky
- TypeScript
- Lint-staged

### 功能组件
- next-intl (国际化)
- next-themes (主题切换)
- ai (AI 功能集成)
- resend (邮件服务)
- zod (数据验证)

### 文档支持
- fumadocs-core
- fumadocs-mdx
- fumadocs-ui
- KaTeX (数学公式)
- Mermaid (图表)

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

## 数据库操作

```bash
# 启动数据库管理界面
pnpm db:studio

# 执行数据库迁移
pnpm db:migrate
```

## 代码质量

```bash
# 运行代码检查
pnpm lint

# 自动修复代码问题
pnpm lint:fix

# 检查 TypeScript 类型
pnpm ts:check
```

## 许可证

私有项目 - 保留所有权利
