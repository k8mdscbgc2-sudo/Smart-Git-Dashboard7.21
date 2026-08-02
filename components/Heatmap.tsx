"use client";

interface HeatmapProps {
  weeklyCommits: number[]; // 7个数字，索引0=周一，1=周二，...，6=周日
}

const DAY_LABELS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

export default function Heatmap({ weeklyCommits }: HeatmapProps) {
  // 计算最大值，用于颜色深浅
  const maxCount = Math.max(...weeklyCommits, 1); // 最小为1，避免除以0

  // 根据提交数量返回颜色
  const getColor = (count: number) => {
    if (count === 0) return '#e5e7eb'; // 浅灰色 - 0次提交
    
    const intensity = count / maxCount;
    if (intensity <= 0.25) return '#93c5fd'; // 最浅蓝
    if (intensity <= 0.5) return '#60a5fa';  // 浅蓝
    if (intensity <= 0.75) return '#3b82f6'; // 中蓝
    return '#1d4ed8'; // 深蓝
  };

  return (
    <div className="w-full">
      {/* 7列 x 1行 网格 */}
      <div className="flex items-center justify-center gap-3">
        {weeklyCommits.map((count, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            {/* 热力图方块 */}
            <div
              className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:scale-110 transition-transform shadow-sm select-none"
              style={{ backgroundColor: getColor(count) }}
              title={`${DAY_LABELS[index]}: ${count} 次提交`}
            >
              {count}
            </div>
            {/* 星期标签 */}
            <span className="text-sm text-gray-600">{DAY_LABELS[index]}</span>
          </div>
        ))}
      </div>

      {/* 颜色图例 */}
      <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-100">
        <span className="text-sm text-gray-500">颜色说明:</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">0 次</span>
          <div className="w-6 h-6 rounded" style={{ backgroundColor: '#e5e7eb' }}></div>
          <div className="w-6 h-6 rounded" style={{ backgroundColor: '#93c5fd' }}></div>
          <div className="w-6 h-6 rounded" style={{ backgroundColor: '#60a5fa' }}></div>
          <div className="w-6 h-6 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
          <div className="w-6 h-6 rounded" style={{ backgroundColor: '#1d4ed8' }}></div>
          <span className="text-xs text-gray-500">更多</span>
        </div>
      </div>
    </div>
  );
}