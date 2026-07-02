'use client';

import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa6';

export default function VisitorCounter() {
  const [views, setViews] = useState(null);

  useEffect(() => {
    // Check if the user has already visited in this browser
    const hasVisited = localStorage.getItem('hasVisited');
    const action = hasVisited ? 'fetch' : 'increment';

    // Fetch view count (incrementing only if they haven't visited)
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
      .catch(console.error);
  }, []);

  if (!views) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 hover:bg-white/10 transition-colors px-3 py-1.5 rounded-full border border-white/5 w-fit font-mono mt-4">
      <div className="relative flex h-2 w-2 items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
      </div>
      <FaEye size={12} className="text-gray-500" />
      <span>{views.toLocaleString()} visitors</span>
    </div>
  );
}
