import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { supabase } from '../supabase.client';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  async register(dto: AuthDto) {
    const { data, error } = await supabase.auth.signUp({
      email: dto.email,
      password: dto.password,
    });
    if (error) throw new BadRequestException(error.message);
    return { user: data.user, session: data.session };
  }

  async login(dto: AuthDto) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: dto.email,
      password: dto.password,
    });
    if (error) throw new UnauthorizedException(error.message);
    return { access_token: data.session.access_token, user: data.user };
  }
}
