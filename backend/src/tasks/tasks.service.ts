import { Injectable, ForbiddenException } from '@nestjs/common';
import { supabase } from '../supabase.client';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
	async findAll(userId: string, status?: string, priority?: string): Promise<Task[]> {
		let query = supabase
			.from('tasks')
			.select('*')
			.eq('user_id', userId)
			.is('deleted_at', null)
			.order('created_at', { ascending: false });

		if (status) query = query.eq('status', status);
		if (priority) query = query.eq('priority', priority);

		const { data, error } = await query;
		if (error) throw error;
		return data as Task[];
	}

	async findById(id: number): Promise<Task | null> {
		const { data, error } = await supabase.from('tasks').select('*').eq('id', id).single();
		if (error) return null;
		return data as Task;
	}

	async create(task: Partial<Task>): Promise<Task> {
		const { data, error } = await supabase.from('tasks').insert([task]).select().single();
		if (error) throw error;
		return data as Task;
	}

	async update(id: number, userId: string, dto: UpdateTaskDto): Promise<Task> {
		const existing = await this.findById(id);
		if (!existing || existing.user_id !== userId) throw new ForbiddenException();
		const { data, error } = await supabase
			.from('tasks')
			.update({ ...dto, updated_at: new Date().toISOString() })
			.eq('id', id)
			.select()
			.single();
		if (error) throw error;
		return data as Task;
	}

	async softDelete(id: number, userId: string): Promise<void> {
		const existing = await this.findById(id);
		if (!existing || existing.user_id !== userId) throw new ForbiddenException();
		const { error } = await supabase
			.from('tasks')
			.update({ deleted_at: new Date().toISOString() })
			.eq('id', id);
		if (error) throw error;
	}

	async findStats(userId: string): Promise<{ total: number; completed: number; pending: number }> {
		const { data, error } = await supabase
			.from('tasks')
			.select('status')
			.eq('user_id', userId)
			.is('deleted_at', null);
		if (error) throw error;
		const total = data.length;
		const completed = data.filter((t) => t.status === 'done').length;
		const pending = total - completed;
		return { total, completed, pending };
	}
}
