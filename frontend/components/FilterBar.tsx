'use client';

interface FilterBarProps {
  status: string;
  priority: string;
  onStatusChange: (v: string) => void;
  onPriorityChange: (v: string) => void;
}

const selectClass =
  'bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500';

export default function FilterBar({ status, priority, onStatusChange, onPriorityChange }: FilterBarProps) {
  return (
    <div className="flex items-center gap-3">
      <select value={status} onChange={(e) => onStatusChange(e.target.value)} className={selectClass}>
        <option value="">All statuses</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In progress</option>
        <option value="done">Done</option>
      </select>
      <select value={priority} onChange={(e) => onPriorityChange(e.target.value)} className={selectClass}>
        <option value="">All priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
}
