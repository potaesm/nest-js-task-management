import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import { Task } from './task.entity';

export interface TasksRepository extends Repository<Task> {
  getTasks: (searchTaskDto: SearchTaskDto) => Promise<Task[]>;
  createTask: (createTaskDto: CreateTaskDto) => Promise<Task>;
}
