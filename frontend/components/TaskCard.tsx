'use client';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  created_at: string;
  category_id?: number;
}

const statusStyles: Record<string, string> = {
  pending: 'bg-slate-700 text-slate-300',
  in_progress: 'bg-blue-500/20 text-blue-400',
  done: 'bg-emerald-500/20 text-emerald-400',
};

const priorityStyles: Record<string, string> = {
  Low: 'bg-slate-700 text-slate-400',
  Medium: 'bg-amber-500/20 text-amber-400',
  High: 'bg-red-500/20 text-red-400',
};

const statusLabel: Record<string, string> = {
  pending: 'Pending',
  in_progress: 'In progress',
  done: 'Done',
};

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onToggleDone: (task: Task) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onToggleDone }: TaskCardProps) {
  const isDone = task.status === 'done';

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <p className={`font-medium text-sm ${isDone ? 'line-through text-slate-500' : 'text-white'}`}>
          {task.title}
        </p>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityStyles[task.priority] ?? priorityStyles.Low}`}>
            {task.priority}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[task.status] ?? statusStyles.pending}`}>
            {statusLabel[task.status] ?? task.status}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="text-xs text-slate-400 leading-relaxed">{task.description}</p>
      )}

      <div className="flex items-center justify-between mt-1">
        <p className="text-xs text-slate-600">{new Date(task.created_at).toLocaleDateString()}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleDone(task)}
            className={`text-xs px-2 py-1 rounded-lg transition-colors ${
              isDone
                ? 'text-slate-400 hover:text-white bg-slate-700 hover:bg-slate-600'
                : 'text-emerald-400 hover:text-white bg-emerald-500/10 hover:bg-emerald-600'
            }`}
          >
            {isDone ? 'Undo' : 'Done'}
          </button>
          <button
            onClick={() => onEdit(task)}
            className="text-xs px-2 py-1 rounded-lg text-slate-400 hover:text-white bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task)}
            className="text-xs px-2 py-1 rounded-lg text-red-400 hover:text-white bg-red-500/10 hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
