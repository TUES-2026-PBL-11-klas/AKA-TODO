'use client';

import { useEffect, useState, useCallback, FormEvent } from 'react';
import { apiFetch } from '@/lib/api';
import CategoryCard from '@/components/CategoryCard';
import ConfirmDialog from '@/components/ConfirmDialog';

interface Category {
  id: number;
  name: string;
  created_at: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [inputName, setInputName] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = useCallback(async () => {
    const data = await apiFetch<Category[]>('/categories');
    setCategories(data);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchCategories().finally(() => setLoading(false));
  }, [fetchCategories]);

  function openEdit(category: Category) {
    setEditingCategory(category);
    setInputName(category.name);
    setError('');
  }

  function cancelEdit() {
    setEditingCategory(null);
    setInputName('');
    setError('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!inputName.trim()) return;
    setError('');
    setSaving(true);
    try {
      if (editingCategory) {
        await apiFetch(`/categories/${editingCategory.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ name: inputName.trim() }),
        });
      } else {
        await apiFetch('/categories', {
          method: 'POST',
          body: JSON.stringify({ name: inputName.trim() }),
        });
      }
      setInputName('');
      setEditingCategory(null);
      await fetchCategories();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deletingCategory) return;
    await apiFetch(`/categories/${deletingCategory.id}`, { method: 'DELETE' });
    setDeletingCategory(null);
    await fetchCategories();
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Categories</h1>

      {/* Create / Edit form */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder={editingCategory ? 'Edit category name…' : 'New category name…'}
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={saving || !inputName.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {saving ? 'Saving…' : editingCategory ? 'Save' : '+ Add'}
        </button>
        {editingCategory && (
          <button
            type="button"
            onClick={cancelEdit}
            className="px-4 py-2 text-sm text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            Cancel
          </button>
        )}
      </form>

      {error && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2 mb-4">
          {error}
        </p>
      )}

      {/* List */}
      {loading ? (
        <p className="text-slate-400 text-sm">Loading…</p>
      ) : categories.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 text-sm">No categories yet. Add one above.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onEdit={openEdit}
              onDelete={setDeletingCategory}
            />
          ))}
        </div>
      )}

      {deletingCategory && (
        <ConfirmDialog
          message={`Delete category "${deletingCategory.name}"? Tasks in this category will become uncategorised.`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingCategory(null)}
        />
      )}
    </div>
  );
}
