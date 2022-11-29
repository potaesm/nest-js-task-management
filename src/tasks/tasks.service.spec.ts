import { Test } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import constants from '../constants';
import { DatabaseModule } from '../database.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from '../config.schema';
import { TaskStatus } from './task-status.model';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOneBy: jest.fn(),
});
const mockUser = {
  username: 'potaesm',
  id: 'someId',
  password: 'aabbccdd',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepository | any;
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
    it('calls TasksRepository.getTasks and returns the result', async () => {
      expect(tasksRepository.getTasks).not.toHaveBeenCalled();
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getAllTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });
  describe('getTaskById', () => {
    it('calls TasksRepository.findOneBy and returns the result', async () => {
      const mockTask = {
        title: 'Title',
        description: 'Description',
        id: 'someId',
        status: TaskStatus.OPEN,
      };
      tasksRepository.findOneBy.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById(mockTask.id, mockUser);
      expect(result).toEqual(mockTask);
    });
    it('calls TasksRepository.findOneBy and handles an error', async () => {
      tasksRepository.findOneBy.mockResolvedValue(null);
      expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
