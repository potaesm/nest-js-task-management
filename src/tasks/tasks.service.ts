import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import { Task } from './task.entity';
import constants from 'src/constants';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @Inject(constants.TASK_REPOSITORY)
    private tasksRepository: TasksRepository,
  ) {}
  async getAllTasks(searchTaskDto: SearchTaskDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(searchTaskDto);
  }
  async getTaskById(id: string): Promise<Task> {
    const foundTask = await this.tasksRepository.findOneBy({ id });
    if (!foundTask)
      throw new NotFoundException(`Task with ID "${id} not found"`);
    return foundTask;
  }
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete({ id });
    if (!result.affected) {
      throw new NotFoundException(`Task with ID "${id} not found"`);
    }
  }
  async updateTask(id: string, key: string, value: any): Promise<Task> {
    const task = await this.getTaskById(id);
    task[key] = value;
    this.tasksRepository.save(task);
    return task;
  }
}
