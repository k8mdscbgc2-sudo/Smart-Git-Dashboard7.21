# Smart Git Dashboard - 项目规格说明书 (spec.md)

## 1. 项目概述

**项目名称**：Smart Git Dashboard  
**项目背景**：W1 做的 Smart Commit Helper CLI 工具被团队 5 人广泛使用，现在需要升级为 Web Dashboard，让团队 Lead 能直观看到提交数据、PR 状态和成员活跃度。  
**项目目标**：独立交付一个 Next.js 14+ App Router + RSC 的团队工具，部署到 Vercel。

---

## 2. 技术栈

| 类别 | 技术选型 |
|:---|:---|
| 框架 | Next.js 14+ (App Router) |
| 语言 | TypeScript (strict 模式) |
| 样式 | Tailwind CSS v4 + shadcn/ui |
| 状态管理 | 优先 RSC，必要时用 Zustand |
| 数据获取 | RSC 直接 async/await（禁止 useEffect + fetch） |
| 图表 | Recharts（仅 Client 组件） |
| 包管理 | pnpm |
| 部署 | Vercel |

---

## 3. 功能需求

| 路由 | 页面内容 | 组件类型 |
|:---|:---|:---|
| `/` | 首页：项目介绍 + 跳转 Dashboard 入口 | RSC |
| `/dashboard` | 4 张指标卡（提交总数 / PR 数 / 平均审核时长 / Plan 完成度） | RSC |
| `/dashboard/commits` | Commit 列表 + 类型分布柱状图 | RSC + Client（仅图表） |
| `/dashboard/pulls` | PR 看板（待审核 / 已通过 / 需修改 三列） | RSC |
| `/dashboard/members/[id]` | 成员详情 + 本周热力图 | RSC + Client（仅热力图） |

---

## 4.禁止项
禁止在 layout 上加 use client（污染整棵子树）
禁止用 useEffect + fetch 拉数据（用 RSC async/await）
禁止在 Client Component 里 import Server Component
禁止传函数当 prop 给 RSC（Functions cannot be passed）
禁止使用 next/router 旧 API（用 next/navigation）
禁止不写 loading.tsx（首屏白屏 3 秒）
禁止 error.tsx 不加 use client
禁止 Recharts 在服务端渲染（必须用 use client 包一层）
禁止 Mock 数据用相对路径（Vercel 会报错，要用 path.join + process.cwd()）
禁止 use client 超过 3 个
禁止 TS strict 错被 dev 容忍

---

## 5.验收标准

CLAUDE.md文档不少于50行说明
研发计划拆解≥8个关键步骤
全局配置loading/error兜底页
必须提供Vercel Preview预览地址