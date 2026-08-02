import { ReactNode } from 'react';

export default function DemoBanner({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm mb-6">
      <p className="font-medium">🛠 {title}</p>
      <p className="text-amber-700 text-xs mt-1">{description}</p>
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
}