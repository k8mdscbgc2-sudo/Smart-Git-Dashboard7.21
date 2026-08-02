# Smart Git Dashboard - 项目开发规范

## 项目概述

本项目为 Smart Git Dashboard，是 Smart Commit Helper CLI 工具的 Web 化升级版本。

项目背景源于 W1 阶段开发的 Smart Commit Helper CLI 已被团队 5 人广泛使用，为了进一步提升团队协作效率和代码质量可视化管理，现需升级为可视化 Web Dashboard。

该 Dashboard 的核心目标是让团队 Leader 能够直观看到提交数据、PR 状态和成员活跃度，从而更科学地进行项目管理和资源调配。

项目采用 Next.js 14+ App Router + React Server Components (RSC) 架构，独立交付并部署至 Vercel 平台。

本项目将作为团队内部工具持续迭代和优化。

## 技术栈约束

框架层面强制使用 Next.js 14+ 并采用 App Router 模式，不得使用 Pages Router 或其他过时的路由方案。

编程语言严格采用 TypeScript 并开启 strict 严格模式，任何 TS strict 错误都不允许被开发者容忍，必须全部修复。

样式方案固定为 Tailwind CSS v4 配合 shadcn/ui 组件库，保持设计风格的一致性。

状态管理优先利用 RSC 的服务端能力，必要时才引入 Zustand 进行客户端状态管理。

数据获取必须在 RSC 中直接使用 async/await，彻底摒弃传统的客户端数据获取模式。

图表库仅选用 Recharts 且仅限 Client 组件中使用，确保服务端渲染兼容性。

包管理统一采用 pnpm，不得混用 npm 或 yarn，保证依赖版本一致性。

部署目标平台为 Vercel，充分利用其边缘计算和自动部署能力。

## 目录结构与文件命名约定

采用 Next.js App Router 标准目录结构，所有页面文件放置于 app 目录下。

路由页面按功能模块组织，根路径对应首页入口，展示项目介绍和功能说明。

/dashboard 对应仪表盘主页面，展示关键业务指标。

二级路由包括 commits、pulls、members/[id] 等，分别对应不同的数据视图。

页面文件统一命名为 page.tsx，且每个路由目录下必须配套 loading.tsx 和 error.tsx。

组件文件采用 PascalCase 命名规范，例如 DashboardCard、CommitChart 等。

工具函数采用 camelCase 命名，例如 formatDate、calculateStats 等。

类型定义文件统一使用 .d.ts 后缀，放置于 types 目录或对应模块目录下。

公共组件放置于 components 目录下，按功能子目录分类。

工具函数放置于 lib 目录，数据获取逻辑集中在 app 目录下的对应页面中。

## 核心代码铁律

"use client" 指令全项目使用数量严格控制，总计不得超过 3 个，最大程度利用 RSC 能力。

禁止在根 layout 上加 use client，此举会污染整棵子树，导致全部变成客户端渲染。

严格禁止使用 useEffect + fetch 拉取数据，所有数据获取必须通过 RSC 的 async/await 方式完成。

禁止在 Client Component 中 import Server Component，这会导致不可预期的渲染行为。

禁止将函数作为 prop 传递给 RSC，因为函数无法在服务端和客户端之间序列化传递。

禁止使用 next/router 旧 API，必须统一使用 next/navigation 提供的新 API。

禁止 error.tsx 不加 use client 指令，错误边界组件必须在客户端运行。

Mock 数据禁止使用相对路径，必须采用 path.join + process.cwd() 方式构建绝对路径。

## 命名规范

组件命名统一采用 PascalCase，例如 DashboardCard、CommitChart、MemberProfile 等。

工具函数与普通函数采用 camelCase 命名风格，例如 formatDate、calculateStats、getCommitList 等。

常量全部大写并用下划线分隔，例如 MAX_RETRY_COUNT、DEFAULT_PAGE_SIZE、CACHE_DURATION 等。

接口与类型名采用 PascalCase，前缀加 I 或直接使用描述性名称，例如 ICommitData、IPullRequest、IMemberStats 等。

CSS 类名采用 kebab-case 配合 Tailwind 工具类，必要时可使用 @apply 提取复用样式。

路由目录采用小写 kebab-case 命名方式，动态路由用方括号包裹，例如 [memberId]。

文件名遵循 Next.js 约定，页面文件为 page.tsx，加载状态为 loading.tsx，错误边界为 error.tsx。

布局文件命名为 layout.tsx，模板文件命名为 template.tsx。

## Git 协作与提交规范

提交信息严格遵循约定式提交规范，统一格式为 type(scope): description。

type 可选值包括 feat、fix、docs、style、refactor、test、chore、perf 等。

scope 用于指明影响范围，例如 dashboard、commits、pulls、members 等功能模块。

description 采用简洁明了的中文描述提交内容，不超过 50 个字符为宜。

每个 Pull Request 需关联对应功能模块或 Issue，提交前必须经过代码审查流程。

分支命名采用 feature/xxx、bugfix/xxx、hotfix/xxx 格式明确区分分支类型。

主分支设为 main，开发分支从 main 检出，功能开发完成后通过 PR 合并回 main。

合并前必须通过所有自动化检查，包括类型检查、构建测试和代码风格检查。

## 用户体验与性能指标

每个路由页面必须配套 loading.tsx 和 error.tsx 文件，防止首屏长时间白屏。

页面首屏加载时间控制在 3 秒以内，核心内容优先渲染展示。

交互响应时间不超过 100ms，提供即时的用户操作反馈。

图片资源按需加载并采用合适格式，优先使用 WebP，必要时进行懒加载。

利用 RSC 特性大幅减少客户端 JavaScript 体积，提升页面加载速度。

图表等重型组件采用动态导入方式延迟加载，避免阻塞首屏渲染。

核心内容优先渲染，非关键内容逐步加载，提供渐进式体验。

添加必要的 Skeleton 骨架屏和加载动画，减少用户等待焦虑。

必须配置全局的 loading 与 error 兜底页面，确保全站用户体验一致性。

## 验收标准

项目正式交付前必须通过以下验收标准。

CLAUDE.md 规范文档说明内容不少于 50 行，确保规范详尽完备。

研发计划拆解必须包含 8 个及以上关键步骤，保证项目实施路径清晰。

全局必须配置统一的 loading 和 error 兜底页面，覆盖所有路由场景。

部署环节必须提供 Vercel Preview 预览地址，便于功能验证和代码审查。

## 环境变量与安全

环境变量统一通过 process.env 访问，禁止在代码中硬编码配置值。

敏感信息不得硬编码于源码中，必须通过环境变量注入或密钥管理服务获取。

服务端环境变量与客户端可访问变量明确区分，防止敏感信息泄露。

客户端可访问变量必须冠以 NEXT_PUBLIC_ 前缀，确保仅暴露必要配置。

Mock 数据路径必须采用 path.join 配合 process.cwd() 构建绝对路径，避免 Vercel 部署路径问题。

API 密钥等敏感数据仅限服务端使用，严禁泄露至客户端代码或浏览器端。

.env.local 文件加入 .gitignore 防止提交至仓库，本地配置文件不纳入版本控制。

生产环境变量通过 Vercel Dashboard 配置，不在代码仓库中存储。

## AI 协作约定

在进行代码修改前，先明确修改范围与目的，理解需求背景和预期效果。

改动涉及 3 个及以上文件时，必须先输出详细的修改 Plan，经确认后再执行具体编码。

每次提交独立的功能或修复对应一次完整的逻辑单元，保持提交历史清晰可追溯。

代码提交前自行运行类型检查与构建验证，确保代码质量达标。

严格遵循本规范文件 CLAUDE.md 作为代码生成的首要参考依据，不偏离约定。

遇到规范未覆盖场景先确认后再实现，不擅自做重大架构或风格变更。

复杂逻辑先给出实现方案再编码，必要时提供多种方案供选型讨论。

生成代码时确保 TypeScript 类型安全，避免 any 类型或类型断言滥用。

## 常见已踩坑记录

recharts 图表库必须在标记为 "use client" 的组件中使用，否则在服务端渲染时会报 window is not defined 错误，这是最常见的坑之一。

禁止在根 layout.tsx 上加 use client，会导致整个应用都变成客户端渲染，严重影响性能和 SEO。

next/router API 已彻底废弃，必须使用 next/navigation，否则运行时会报错或行为异常。

error.tsx 必须加 use client 否则不生效，错误边界组件必须在客户端才能捕获异常。

Mock 数据在 Vercel 上用相对路径会报错，要用 path.join(process.cwd(), 'path/to/mock') 构建绝对路径。

Client Component 不能 import Server Component，会导致渲染失败和 hydration 不匹配。

函数不能作为 prop 传递给 RSC 组件，Next.js 不支持序列化函数，会抛出运行时错误。