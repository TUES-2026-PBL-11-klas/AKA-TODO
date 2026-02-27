'use client';

import { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import TaskCard from '@/components/TaskCard';
import StatsBar from '@/components/StatsBar';
import FilterBar from '@/components/FilterBar';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  created_at: string;
  category_id?: number;
}

interface Stats {
  total: number;
  completed: number;
  pending: number;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, completed: 0, pending: 0 });
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (priority) params.set('priority', priority);
    const qs = params.toString();
    const [taskData, statsData] = await Promise.all([
      apiFetch<Task[]>(`/tasks${qs ? `?${qs}` : ''}`),
      apiFetch<Stats>('/tasks/stats'),
    ]);
    setTasks(taskData);
    setStats(statsData);
  }, [status, priority]);

  useEffect(() => {
    setLoading(true);
    fetchTasks().finally(() => setLoading(false));
  }, [fetchTasks]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Tasks</h1>
      </div>

      {/* Stats */}
      <div className="mb-5">
        <StatsBar stats={stats} />
      </div>

      {/* Filters */}
      <div className="mb-5">
        <FilterBar
          status={status}
          priority={priority}
          onStatusChange={setStatus}
          onPriorityChange={setPriority}
        />
      </div>

      {/* Task list */}
      {loading ? (
        <p className="text-slate-400 text-sm">Loading…</p>
      ) : tasks.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 text-sm">No tasks yet.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
