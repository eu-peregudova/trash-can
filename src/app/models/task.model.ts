export enum TaskPriority {
  Sooner = 'sooner',
  Later = 'later',
  MaybeNever = 'maybe never',
}

export class Task {
  constructor(
    public taskId: string,
    public description: string,
    public creationDate: string,
    public resolveDate: string | null,
    public rejectDate: string | null,
    public priority: TaskPriority,
  ) {}

  resolveTask() {
    this.resolveDate = new Date().toISOString();
  }

  static createNewFromObject(task: {
    taskId: string;
    description: string;
    creationDate: string;
    resolveDate: string | null;
    rejectDate: string | null;
    priority: TaskPriority;
  }) {
    return new Task(
      task.taskId,
      task.description,
      task.creationDate,
      task.resolveDate,
      task.rejectDate,
      task.priority,
    );
  }
}
