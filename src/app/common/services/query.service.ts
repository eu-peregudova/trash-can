import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

import { SortOptionApiName } from '../../models/sort.model';
import { TaskStatus } from '../../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  private filterSubject: BehaviorSubject<TaskStatus[]> = new BehaviorSubject<TaskStatus[]>([TaskStatus.Created]);
  filter$ = this.filterSubject.asObservable();

  private sortSubject: BehaviorSubject<string> = new BehaviorSubject<string>(SortOptionApiName.NewerFirst);
  sort$ = this.sortSubject.asObservable();

  private paginationSubject: BehaviorSubject<number> = new BehaviorSubject<number>(10);
  pagination$ = this.paginationSubject.asObservable();

  private refreshSubject: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  private refresh$ = this.refreshSubject.asObservable();

  combined$: Observable<[void, string, TaskStatus[], string]>;

  constructor() {
    this.combined$ = combineLatest([this.refresh$, this.search$, this.filter$, this.sort$]);
  }

  updateSearch(search: string): void {
    this.searchSubject.next(search);
  }

  updateFilter(filter: TaskStatus[]): void {
    this.filterSubject.next(filter);
  }

  updateSort(sort: string): void {
    this.sortSubject.next(sort);
  }

  updatePagination(): void {
    this.paginationSubject.next(this.paginationSubject.getValue() + 10);
  }

  refreshQuery(): void {
    this.refreshSubject.next();
  }
}
