import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase.client';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
	async findAll(userId: string): Promise<Category[]> {
		const { data, error } = await supabase
			.from('categories')
			.select('*')
			.eq('user_id', userId)
			.order('created_at', { ascending: true });
		if (error) throw error;
		return data as Category[];
	}

	async findById(id: number): Promise<Category | null> {
		const { data, error } = await supabase.from('categories').select('*').eq('id', id).single();
		if (error) return null;
		return data as Category;
	}

	async create(category: Partial<Category>): Promise<Category> {
		const { data, error } = await supabase.from('categories').insert([category]).select().single();
		if (error) throw error;
		return data as Category;
	}
}
