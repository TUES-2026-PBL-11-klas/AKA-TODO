import { Injectable, ForbiddenException } from '@nestjs/common';
import { supabase } from '../supabase.client';
import { Category } from './category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

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

	async update(id: number, userId: string, dto: UpdateCategoryDto): Promise<Category> {
		const existing = await this.findById(id);
		if (!existing || existing.user_id !== userId) throw new ForbiddenException();
		const { data, error } = await supabase
			.from('categories')
			.update(dto)
			.eq('id', id)
			.select()
			.single();
		if (error) throw error;
		return data as Category;
	}

	async delete(id: number, userId: string): Promise<void> {
		const existing = await this.findById(id);
		if (!existing || existing.user_id !== userId) throw new ForbiddenException();
		const { error } = await supabase.from('categories').delete().eq('id', id);
		if (error) throw error;
	}
}
