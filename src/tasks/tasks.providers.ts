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
      let tasksRepository = dataSource.getRepository(Task);
      tasksRepository = tasksRepository.extend({
        async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
          const { title, description } = createTaskDto;
          const task = tasksRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
          });
          await tasksRepository.save(task);
          return task;
        },
      });
      tasksRepository = tasksRepository.extend({
        async getTasks(searchTaskDto: SearchTaskDto): Promise<Task[]> {
          const { status, search } = searchTaskDto;
          const query = tasksRepository.createQueryBuilder('task');
          if (!!status) {
            query.andWhere('task.status = :searchStatus', {
              searchStatus: status,
            });
          }
          if (!!search) {
            query.andWhere(
              'LOWER(task.title) LIKE LOWER(:searchPhrase) OR LOWER(task.description) LIKE LOWER(:searchPhrase)',
              { searchPhrase: `%${search}%` },
            );
          }
          const tasks = query.getMany();
          return tasks;
        },
      });
      return tasksRepository;
    },
    inject: [constants.DATA_SOURCE],
  },
];
