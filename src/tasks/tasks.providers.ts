import { User } from 'src/auth/user.entity';
import constants from 'src/constants';
import { DataSource } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import { TaskStatus } from './task-status.model';
import { Task } from './task.entity';

export const tasksProviders = [
  {
    provide: constants.TASK_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      const tasksRepository = dataSource.getRepository(Task);
      return tasksRepository.extend({
        async createTask(
          createTaskDto: CreateTaskDto,
          user: User,
        ): Promise<Task> {
          const { title, description } = createTaskDto;
          const task = tasksRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user,
          });
          await tasksRepository.save(task);
          return task;
        },
        async getTasks(
          searchTaskDto: SearchTaskDto,
          user: User,
        ): Promise<Task[]> {
          const { status, search } = searchTaskDto;
          const query = tasksRepository.createQueryBuilder('task');
          query.where({ user });
          if (!!status) {
            query.andWhere('task.status = :searchStatus', {
              searchStatus: status,
            });
          }
          if (!!search) {
            query.andWhere(
              '(LOWER(task.title) LIKE LOWER(:searchPhrase) OR LOWER(task.description) LIKE LOWER(:searchPhrase))',
              { searchPhrase: `%${search}%` },
            );
          }
          const tasks = query.getMany();
          return tasks;
        },
      });
    },
    inject: [constants.DATA_SOURCE],
  },
];
