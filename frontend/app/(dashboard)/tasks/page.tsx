'use client';

import { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import TaskCard from '@/components/TaskCard';
import StatsBar from '@/components/StatsBar';
import FilterBar from '@/components/FilterBar';
import TaskModal from '@/components/TaskModal';
import ConfirmDialog from '@/components/ConfirmDialog';

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

interface Category {
  id: number;
  name: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, completed: 0, pending: 0 });
  const [categories, setCategories] = useState<Category[]>([]);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const fetchAll = useCallback(async () => {
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
    apiFetch<Category[]>('/categories').then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchAll().finally(() => setLoading(false));
  }, [fetchAll]);

  async function handleSave(data: Partial<Task>) {
    if (editingTask) {
      await apiFetch(`/tasks/${editingTask.id}`, { method: 'PATCH', body: JSON.stringify(data) });
    } else {
      await apiFetch('/tasks', { method: 'POST', body: JSON.stringify(data) });
    }
    await fetchAll();
  }

  async function handleDelete() {
    if (!deletingTask) return;
    await apiFetch(`/tasks/${deletingTask.id}`, { method: 'DELETE' });
    setDeletingTask(null);
    await fetchAll();
  }

  async function handleToggleDone(task: Task) {
    const newStatus = task.status === 'done' ? 'pending' : 'done';
    await apiFetch(`/tasks/${task.id}`, { method: 'PATCH', body: JSON.stringify({ status: newStatus }) });
    await fetchAll();
  }

  function openCreate() {
    setEditingTask(null);
    setModalOpen(true);
  }

  function openEdit(task: Task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Tasks</h1>
        <button
          onClick={openCreate}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + New task
        </button>
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
          <button onClick={openCreate} className="mt-3 text-indigo-400 hover:text-indigo-300 text-sm">
            Create your first task
          </button>
        </div>
      ) : (
        <div className="grid gap-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={openEdit}
              onDelete={setDeletingTask}
              onToggleDone={handleToggleDone}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {modalOpen && (
        <TaskModal
          task={editingTask}
          categories={categories}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}

      {deletingTask && (
        <ConfirmDialog
          message={`Delete "${deletingTask.title}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingTask(null)}
        />
      )}
    </div>
  );
}
