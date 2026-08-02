import Link from "next/link";
import { notFound } from "next/navigation";
import { getMemberById } from "../../../lib/data";
import Heatmap from "../../../components/Heatmap";

const DAY_LABELS: Record<string, string> = {
  Monday: '周一',
  Tuesday: '周二',
  Wednesday: '周三',
  Thursday: '周四',
  Friday: '周五',
  Saturday: '周六',
  Sunday: '周日',
};

export default async function MemberDetailPage({ params }: { params: { id: string } }) {
  const member = await getMemberById(params.id);
  
  if (!member) {
    notFound();
  }

  return (
    <div className="p-8">
      {/* 返回链接 */}
      <div className="mb-6">
        <Link href="/members" className="text-blue-600 hover:underline text-sm">
          ← 返回成员列表
        </Link>
      </div>

      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">成员详情</h1>
        <p className="text-gray-500 text-sm mt-1">服务端组件渲染</p>
      </div>

      {/* 成员基本信息卡片 */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <div className="flex items-center gap-8">
          {/* 头像 */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-6xl font-bold">
            {member.avatar}
          </div>
          
          {/* 信息 */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{member.name}</h2>
            <p className="text-lg text-gray-500 mt-1">{member.email}</p>
            <p className="text-sm text-gray-400 mt-2">{member.role}</p>
          </div>
        </div>
      </div>

      {/* 本周提交热力图 - 使用客户端组件 */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">7天提交热力图</h3>
        <p className="text-sm text-gray-500 mb-6">数据由服务端获取，热力图组件在客户端渲染</p>
        
        <Heatmap 
          weeklyCommits={[
            member.weeklyCommits.Monday,
            member.weeklyCommits.Tuesday,
            member.weeklyCommits.Wednesday,
            member.weeklyCommits.Thursday,
            member.weeklyCommits.Friday,
            member.weeklyCommits.Saturday,
            member.weeklyCommits.Sunday,
          ]} 
        />
      </div>

      {/* 文字数据明细 */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">详细数据</h3>
        
        <div className="space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold">周一：</span>{member.weeklyCommits.Monday} 次
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">周二：</span>{member.weeklyCommits.Tuesday} 次
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">周三：</span>{member.weeklyCommits.Wednesday} 次
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">周四：</span>{member.weeklyCommits.Thursday} 次
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">周五：</span>{member.weeklyCommits.Friday} 次
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">周六：</span>{member.weeklyCommits.Saturday} 次
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">周日：</span>{member.weeklyCommits.Sunday} 次
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-lg">
            <span className="font-semibold text-gray-800">本周总提交：</span>
            <span className="text-blue-600 font-bold">
              {Object.values(member.weeklyCommits).reduce((a, b) => a + b, 0)} 次
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}