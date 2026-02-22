export interface Task {
  id: number;
  user_id: number;
  category_id?: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}
