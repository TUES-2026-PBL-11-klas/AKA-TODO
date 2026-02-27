interface Stats {
  total: number;
  completed: number;
  pending: number;
}

export default function StatsBar({ stats }: { stats: Stats }) {
  const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="flex items-center gap-6">
      <div className="flex gap-4 text-sm">
        <span className="text-slate-400">
          Total: <span className="text-white font-medium">{stats.total}</span>
        </span>
        <span className="text-slate-400">
          Done: <span className="text-emerald-400 font-medium">{stats.completed}</span>
        </span>
        <span className="text-slate-400">
          Pending: <span className="text-amber-400 font-medium">{stats.pending}</span>
        </span>
      </div>
      {stats.total > 0 && (
        <div className="flex items-center gap-2">
          <div className="w-32 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-slate-400">{pct}%</span>
        </div>
      )}
    </div>
  );
}
