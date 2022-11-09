import constants from 'src/constants';
import { DataSource } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.model';
import { Task } from './task.entity';

export const tasksProviders = [
  {
    provide: constants.TASK_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      let tasksRepository = dataSource.getRepository(Task);
      tasksRepository = tasksRepository.extend({
        async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
          const { title, description } = createTaskDto;
          const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
          });
          await this.save(task);
          return task;
        },
      });
      return tasksRepository;
    },
    inject: [constants.DATA_SOURCE],
  },
];
