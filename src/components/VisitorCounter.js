'use client';

import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa6';

export default function VisitorCounter() {
  const [views, setViews] = useState(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    const action = hasVisited ? 'fetch' : 'increment';

    fetch(`/api/view-count?action=${action}`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.views) {
          setViews(data.views);
          if (!hasVisited) {
            localStorage.setItem('hasVisited', 'true');
          }
        }
      })
      .catch(() => {});
  }, []);

  if (!views) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900/60 px-3 py-1.5 rounded-full border border-zinc-800/80 w-fit font-mono mt-2">
      <div className="relative flex h-2 w-2 items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
      </div>
      <FaEye size={11} className="text-zinc-500" />
      <span>{views.toLocaleString()} visitors</span>
    </div>
  );
}
