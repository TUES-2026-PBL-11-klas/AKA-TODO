import {
  Controller, Get, Post, Patch, Delete,
  Param, Body, UseGuards, Request, Query, HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('stats')
  getStats(@Request() req) {
    return this.tasksService.findStats(req.user.id);
  }

  @Get()
  findAll(
    @Request() req,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('category_id') categoryId?: string,
  ) {
    return this.tasksService.findAll(req.user.id, status, priority, categoryId ? Number(categoryId) : undefined);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.tasksService.findById(Number(id));
  }

  @Post()
  create(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create({ ...createTaskDto, user_id: req.user.id });
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(Number(id), req.user.id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(204)
  softDelete(@Request() req, @Param('id') id: string) {
    return this.tasksService.softDelete(Number(id), req.user.id);
  }
}
