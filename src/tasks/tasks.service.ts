import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import { Task } from './task.entity';
import constants from '../constants';
import { TasksRepository } from './tasks.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject(constants.TASK_REPOSITORY)
    private tasksRepository: TasksRepository,
  ) {}
  async getAllTasks(searchTaskDto: SearchTaskDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(searchTaskDto, user);
  }
  async getTaskById(id: string, user: User): Promise<Task> {
    const foundTask = await this.tasksRepository.findOneBy({ id, user });
    if (!foundTask)
      throw new NotFoundException(`Task with ID "${id} not found"`);
    return foundTask;
  }
  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }
  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    if (!result.affected) {
      throw new NotFoundException(`Task with ID "${id} not found"`);
    }
  }
  async updateTask(
    id: string,
    key: string,
    value: any,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task[key] = value;
    this.tasksRepository.save(task);
    return task;
  }
}
