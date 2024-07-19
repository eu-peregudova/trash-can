import { Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  docData,
  Firestore,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { from, map, Observable, of, switchMap, tap } from 'rxjs';

import { Task, TaskStatus } from '../../models/task.model';
import { AuthService } from './auth.service';
import { QueryService } from './query.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private queryService: QueryService
  ) {}

  getTasks(
    search?: string,
    filter: TaskStatus[] = [TaskStatus.Created],
    sort?: string,
    pagination?: number
  ): Observable<Task[]> {
    return this.authService.authUser$.pipe(
      switchMap((user) => {
        if (!user) return of([]);
        const tasksRef = collection(this.firestore, `users/${user.uid}/tasks`);
        let tasksQuery = query(tasksRef);

        if (search) {
          // TODO
        }

        if (filter) {
          tasksQuery = query(tasksRef, where('status', 'in', filter));
        }

        if (sort) {
          // TODO
          // need to store priority as number in database first
          // then split current sort into two: field and direction
        }

        if (pagination) {
          // TODO
        }

        return from(getDocs(tasksQuery)).pipe(
          tap((snapshot) => {
            this.queryService.updatePaginationTotal(snapshot.size);
          }),
          map((snapshot) => snapshot.docs.map((doc) => ({ taskId: doc.id, ...doc.data() }) as Task)),
          map((tasks) => tasks.map((task) => Task.fromJSON(task)))
        );
      })
    );
  }

  getTaskById(taskId: string): Observable<any> {
    return this.authService.authUser$.pipe(
      switchMap((user) => {
        if (!user) return of(null);
        const taskDocRef = doc(this.firestore, `users/${user.uid}/tasks/${taskId}`);
        return docData(taskDocRef, { idField: 'taskId' }).pipe(map(Task.fromJSON));
      })
    );
  }

  createTask(task: Task): Observable<void> {
    return this.authService.authUser$.pipe(
      switchMap((user) => {
        if (!user) return of(undefined);
        const taskId = doc(collection(this.firestore, `users/${user.uid}/tasks`)).id;
        return from(setDoc(doc(this.firestore, `users/${user.uid}/tasks/${taskId}`), { taskId, ...task })).pipe(
          switchMap(() => of(undefined))
        );
      })
    );
  }

  updateTask(taskId: string, task: Task): Observable<void> {
    return this.authService.authUser$.pipe(
      switchMap((user) => {
        if (!user) return of(undefined);
        const taskDocRef = doc(this.firestore, `users/${user.uid}/tasks/${taskId}`);
        return from(updateDoc(taskDocRef, { taskId, ...task })).pipe(switchMap(() => of(undefined)));
      })
    );
  }

  deleteTask(taskId: string): Observable<void> {
    return this.authService.authUser$.pipe(
      switchMap((user) => {
        if (!user) return of(undefined);
        return from(deleteDoc(doc(this.firestore, `users/${user.uid}/tasks/${taskId}`))).pipe(
          switchMap(() => of(undefined))
        );
      })
    );
  }
}
