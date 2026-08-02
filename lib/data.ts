// 数据访问层 - 服务端组件可以直接调用

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  weeklyCommits: {
    Monday: number;
    Tuesday: number;
    Wednesday: number;
    Thursday: number;
    Friday: number;
    Saturday: number;
    Sunday: number;
  };
}

// 模拟从数据库获取成员数据
export async function getMembers(): Promise<TeamMember[]> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: 1,
      name: '张明',
      email: 'zhangming@example.com',
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
      email: 'lihua@example.com',
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
      email: 'wangfang@example.com',
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
      email: 'zhaoqiang@example.com',
      avatar: 'ZQ',
      role: '测试开发工程师',
      weeklyCommits: {
        Monday: 2,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 3,
        Saturday: 2,
        Sunday: 1,
      },
    },
  ];
}

// 根据ID获取单个成员
export async function getMemberById(id: string): Promise<TeamMember | null> {
  const members = await getMembers();
  return members.find(m => String(m.id) === id) || null;
}