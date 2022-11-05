export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS_DONE = 'IN_PROGRESS_DONE',
  DONE = 'DONE',
}
