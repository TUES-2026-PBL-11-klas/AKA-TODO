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
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <p className={`font-medium text-sm ${task.status === 'done' ? 'line-through text-slate-500' : 'text-white'}`}>
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
      <p className="text-xs text-slate-600">
        {new Date(task.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}
