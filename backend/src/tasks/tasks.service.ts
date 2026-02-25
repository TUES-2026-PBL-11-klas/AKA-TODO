import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase.client';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
	async findAll(): Promise<Task[]> {
		const { data, error } = await supabase.from('tasks').select('*');
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
}
