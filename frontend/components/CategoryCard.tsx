'use client';

interface Category {
  id: number;
  name: string;
  created_at: string;
}

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export default function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 flex items-center justify-between">
      <div>
        <p className="text-white text-sm font-medium">{category.name}</p>
        <p className="text-slate-500 text-xs mt-0.5">
          {new Date(category.created_at).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(category)}
          className="text-xs px-2 py-1 rounded-lg text-slate-400 hover:text-white bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(category)}
          className="text-xs px-2 py-1 rounded-lg text-red-400 hover:text-white bg-red-500/10 hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
