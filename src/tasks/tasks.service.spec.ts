import { Test } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import constants from '../constants';
import { DatabaseModule } from '../database.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from '../config.schema';

const mockTasksRepository = () => ({ getTasks: jest.fn() });

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: [`.env.stage.${process.env.STAGE}`],
          validationSchema: configValidationSchema,
        }),
        DatabaseModule,
      ],
      providers: [
        TasksService,
        {
          provide: constants.TASK_REPOSITORY,
          useFactory: mockTasksRepository,
          inject: [constants.DATA_SOURCE],
        },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(constants.TASK_REPOSITORY);
  });
  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', () => {
      expect(tasksRepository.getTasks).not.toHaveBeenCalled();
    });
  });
});
