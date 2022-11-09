import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import { Task } from './task.entity';
import constants from 'src/constants';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @Inject(constants.TASK_REPOSITORY)
    private tasksRepository: Repository<Task>,
  ) {}
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  async getTaskById(id: string): Promise<Task> {
    const foundTask = await this.tasksRepository.findOneBy({ id });
    if (!foundTask)
      throw new NotFoundException(`Task with ID "${id} not found"`);
    return foundTask;
  }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTask(id: string): void {
  //   const foundTask = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
  // }
  // updateTask(id: string, key: string, value: any): Task {
  //   let updatedTask: Task;
  //   const foundTask = this.getTaskById(id);
  //   this.tasks = this.tasks.map((task: Task) => {
  //     if (task.id === foundTask.id && task[key] !== undefined && !!value) {
  //       task[key] = value;
  //       updatedTask = { ...task };
  //       return updatedTask;
  //     }
  //     return task;
  //   });
  //   return updatedTask;
  // }
  // searchTasks(searchTaskDto: SearchTaskDto): Task[] {
  //   const { status, search } = searchTaskDto;
  //   let tasks = [...this.tasks];
  //   if (!!status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (!!search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
}
