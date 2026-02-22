import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase.client';
import { User } from './user.entity';

@Injectable()
export class UsersService {
	async findAll(): Promise<User[]> {
		const { data, error } = await supabase.from('users').select('*');
		if (error) throw error;
		return data as User[];
	}

	async findById(id: number): Promise<User | null> {
		const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
		if (error) return null;
		return data as User;
	}

	async create(user: Partial<User>): Promise<User> {
		const { data, error } = await supabase.from('users').insert([user]).select().single();
		if (error) throw error;
		return data as User;
	}
}
