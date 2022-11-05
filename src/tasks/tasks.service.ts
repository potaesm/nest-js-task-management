import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
  updateTask(id: string, key: string, value: any): Task {
    let updatedTask: Task;
    this.tasks = this.tasks.map((task: Task) => {
      if (task.id === id && task[key] !== undefined && !!value) {
        task[key] = value;
        updatedTask = { ...task };
        return updatedTask;
      }
      return task;
    });
    return updatedTask;
  }
  searchTasks(searchTaskDto: SearchTaskDto): Task[] {
    const { status, search } = searchTaskDto;
    let tasks = [...this.tasks];
    if (!!status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (!!search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }
}
