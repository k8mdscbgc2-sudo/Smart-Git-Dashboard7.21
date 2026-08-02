// Git提交记录 - 20条
export const commits = [
  { id: 1, hash: 'a1b2c3d', message: 'feat: 添加用户认证模块', author: '张明', date: '2026-07-16T09:30:00', type: 'feat' },
  { id: 2, hash: 'b2c3d4e', message: 'fix: 修复登录页面响应式问题', author: '李华', date: '2026-07-16T11:20:00', type: 'bugfix' },
  { id: 3, hash: 'c3d4e5f', message: 'docs: 更新API文档说明', author: '王芳', date: '2026-07-16T14:15:00', type: 'docs' },
  { id: 4, hash: 'd4e5f6g', message: 'feat: 实现数据导出功能', author: '赵强', date: '2026-07-17T10:00:00', type: 'feat' },
  { id: 5, hash: 'e5f6g7h', message: 'fix: 修复图表加载失败', author: '张明', date: '2026-07-17T13:45:00', type: 'bugfix' },
  { id: 6, hash: 'f6g7h8i', message: 'feat: 添加暗黑模式支持', author: '李华', date: '2026-07-17T16:30:00', type: 'feat' },
  { id: 7, hash: 'g7h8i9j', message: 'docs: 补充README部署指南', author: '王芳', date: '2026-07-18T09:15:00', type: 'docs' },
  { id: 8, hash: 'h8i9j0k', message: 'fix: 修复表单验证逻辑', author: '赵强', date: '2026-07-18T11:50:00', type: 'bugfix' },
  { id: 9, hash: 'i9j0k1l', message: 'feat: 实现搜索过滤功能', author: '张明', date: '2026-07-18T15:20:00', type: 'feat' },
  { id: 10, hash: 'j0k1l2m', message: 'fix: 修复移动端菜单显示问题', author: '李华', date: '2026-07-19T10:30:00', type: 'bugfix' },
  { id: 11, hash: 'k1l2m3n', message: 'feat: 添加数据分页功能', author: '王芳', date: '2026-07-19T14:00:00', type: 'feat' },
  { id: 12, hash: 'l2m3n4o', message: 'docs: 更新组件使用文档', author: '赵强', date: '2026-07-19T16:45:00', type: 'docs' },
  { id: 13, hash: 'm3n4o5p', message: 'fix: 修复日期选择器格式', author: '张明', date: '2026-07-20T09:45:00', type: 'bugfix' },
  { id: 14, hash: 'n4o5p6q', message: 'feat: 实现批量操作功能', author: '李华', date: '2026-07-20T12:30:00', type: 'feat' },
  { id: 15, hash: 'o5p6q7r', message: 'fix: 修复图片上传大小限制', author: '王芳', date: '2026-07-20T15:15:00', type: 'bugfix' },
  { id: 16, hash: 'p6q7r8s', message: 'feat: 添加通知提醒系统', author: '赵强', date: '2026-07-21T10:00:00', type: 'feat' },
  { id: 17, hash: 'q7r8s9t', message: 'docs: 编写测试用例文档', author: '张明', date: '2026-07-21T13:30:00', type: 'docs' },
  { id: 18, hash: 'r8s9t0u', message: 'fix: 修复缓存失效问题', author: '李华', date: '2026-07-21T16:15:00', type: 'bugfix' },
  { id: 19, hash: 's9t0u1v', message: 'feat: 实现权限管理模块', author: '王芳', date: '2026-07-22T09:00:00', type: 'feat' },
  { id: 20, hash: 't0u1v2w', message: 'fix: 修复性能优化导致的bug', author: '赵强', date: '2026-07-22T11:45:00', type: 'bugfix' },
];

// 合并请求PR - 6条
export const pullRequests = [
  { id: 1, title: '用户认证模块开发', author: '张明', status: 'approved', created: '2026-07-15T10:00:00', reviewed: '2026-07-16T14:30:00', reviewers: ['李华', '王芳'] },
  { id: 2, title: '数据导出功能实现', author: '赵强', status: 'pending', created: '2026-07-17T09:00:00', reviewed: null, reviewers: ['张明'] },
  { id: 3, title: '暗黑模式支持', author: '李华', status: 'approved', created: '2026-07-17T15:00:00', reviewed: '2026-07-18T11:00:00', reviewers: ['王芳', '赵强'] },
  { id: 4, title: '搜索过滤功能优化', author: '张明', status: 'changes', created: '2026-07-18T14:00:00', reviewed: '2026-07-19T09:30:00', reviewers: ['李华'] },
  { id: 5, title: '批量操作功能实现', author: '李华', status: 'approved', created: '2026-07-19T11:00:00', reviewed: '2026-07-20T16:00:00', reviewers: ['张明', '王芳'] },
  { id: 6, title: '通知提醒系统开发', author: '赵强', status: 'pending', created: '2026-07-21T10:00:00', reviewed: null, reviewers: ['王芳'] },
];

// 团队成员 - 4人，每人7天提交数量
export const teamMembers = [
  {
    id: 1,
    name: '张明',
    avatar: 'ZM',
    role: '前端开发工程师',
    weeklyCommits: {
      Monday: 5,
      Tuesday: 3,
      Wednesday: 4,
      Thursday: 2,
      Friday: 6,
      Saturday: 1,
      Sunday: 0,
    },
  },
  {
    id: 2,
    name: '李华',
    avatar: 'LH',
    role: '后端开发工程师',
    weeklyCommits: {
      Monday: 4,
      Tuesday: 5,
      Wednesday: 3,
      Thursday: 5,
      Friday: 2,
      Saturday: 2,
      Sunday: 1,
    },
  },
  {
    id: 3,
    name: '王芳',
    avatar: 'WF',
    role: '全栈开发工程师',
    weeklyCommits: {
      Monday: 3,
      Tuesday: 4,
      Wednesday: 5,
      Thursday: 3,
      Friday: 4,
      Saturday: 0,
      Sunday: 0,
    },
  },
  {
    id: 4,
    name: '赵强',
    avatar: 'ZQ',
    role: 'DevOps工程师',
    weeklyCommits: {
      Monday: 2,
      Tuesday: 3,
      Wednesday: 2,
      Thursday: 4,
      Friday: 5,
      Saturday: 1,
      Sunday: 2,
    },
  },
];

// 统计数字
export const statistics = {
  totalCommits: 20,
  totalPRs: 6,
  approvedPRs: 3,
  pendingPRs: 2,
  changesPRs: 1,
  avgReviewHours: 22.5, // 平均审核时长（小时）
  completionRate: 85, // 完成率（百分比）
  thisWeekCommits: 20,
  lastWeekCommits: 15,
  commitGrowthRate: 33.3,
};

// 按类型统计提交
export const commitTypeStats = {
  feat: 8,
  bugfix: 8,
  docs: 4,
};