export enum TaskPriority {
  Sooner = 'sooner',
  Later = 'later',
  MaybeNever = 'maybe never',
}

export enum TaskStatus {
  Created = 'created',
  Resolved = 'resolved',
  Rejected = 'rejected',
}

export class Task {
  public taskId: string;
  public description: string;
  public creationDate: string;
  public status: TaskStatus;
  public updateDate: string;
  public priority: TaskPriority;
  public expirationDate: string;

  resolveTask(status: Exclude<TaskStatus, TaskStatus.Created>): void {
    this.status = status;
    this.updateDate = new Date().toISOString();
  }

  static fromJSON(json: unknown): Task {
    if (!json) {
      return undefined;
    }
    const newTask = new Task();
    Object.assign(newTask, json);
    return newTask;
  }
}
