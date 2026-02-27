'use client';

interface Category {
  id: number;
  name: string;
}

interface FilterBarProps {
  status: string;
  priority: string;
  categoryId: string;
  categories: Category[];
  onStatusChange: (v: string) => void;
  onPriorityChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
}

const selectClass =
  'bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500';

export default function FilterBar({
  status, priority, categoryId, categories,
  onStatusChange, onPriorityChange, onCategoryChange,
}: FilterBarProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
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
      {categories.length > 0 && (
        <select value={categoryId} onChange={(e) => onCategoryChange(e.target.value)} className={selectClass}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      )}
    </div>
  );
}
