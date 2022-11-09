import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.model';

export class UpdateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
