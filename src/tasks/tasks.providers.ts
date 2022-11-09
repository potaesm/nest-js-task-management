import constants from 'src/constants';
import { DataSource } from 'typeorm';
import { Task } from './task.entity';

export const tasksProviders = [
  {
    provide: constants.TASK_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
    inject: [constants.DATA_SOURCE],
  },
];
