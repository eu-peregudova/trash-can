export interface Task {
  taskId: string;
  description: string;
  creationDate: string;
  resolveDate: string | null;
  rejectDate: string | null;
  priority: 'sooner' | 'later' | 'maybe never';
}
