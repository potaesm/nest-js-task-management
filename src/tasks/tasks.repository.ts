import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import { Task } from './task.entity';

export interface TasksRepository extends Repository<Task> {
  getTasks: (searchTaskDto: SearchTaskDto, user: User) => Promise<Task[]>;
  createTask: (createTaskDto: CreateTaskDto, user: User) => Promise<Task>;
}
