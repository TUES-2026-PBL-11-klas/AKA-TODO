import {
  Controller, Get, Post, Patch, Delete,
  Param, Body, UseGuards, Request, HttpCode,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(@Request() req) {
    return this.categoriesService.findAll(req.user.id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.categoriesService.findById(Number(id));
  }

  @Post()
  create(@Request() req, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create({ ...createCategoryDto, user_id: req.user.id });
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(Number(id), req.user.id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Request() req, @Param('id') id: string) {
    return this.categoriesService.delete(Number(id), req.user.id);
  }
}
