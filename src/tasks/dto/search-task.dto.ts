import { TaskStatus } from '../task.model';

export class SearchTaskDto {
  status: TaskStatus;
  search: string;
}
