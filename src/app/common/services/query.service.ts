import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, Observable } from 'rxjs';

import { SortOptionApiName } from '../../models/sort.model';
import { TaskStatus } from '../../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable().pipe(debounceTime(1000));

  private filterSubject: BehaviorSubject<TaskStatus[]> = new BehaviorSubject<TaskStatus[]>([TaskStatus.Created]);
  filter$ = this.filterSubject.asObservable();

  private sortSubject: BehaviorSubject<string> = new BehaviorSubject<string>(SortOptionApiName.NewerFirst);
  sort$ = this.sortSubject.asObservable();

  // paging
  private currentPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPageSubject.asObservable().pipe(debounceTime(1000));

  private totalPagesSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  totalPages$ = this.totalPagesSubject.asObservable();

  private refreshSubject: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  private refresh$ = this.refreshSubject.asObservable();

  combined$: Observable<[void, string, TaskStatus[], string, number]>;

  constructor() {
    this.combined$ = combineLatest([this.refresh$, this.search$, this.filter$, this.sort$, this.currentPage$]);
  }

  updateSearch(search: string): void {
    this.currentPageSubject.next(1);
    this.searchSubject.next(search);
  }

  updateFilter(filter: TaskStatus[]): void {
    this.currentPageSubject.next(1);
    this.filterSubject.next(filter);
  }

  updateSort(sort: string): void {
    this.currentPageSubject.next(1);
    this.sortSubject.next(sort);
  }

  updatePagination(): void {
    if (
      this.currentPageSubject.getValue() >= 1 &&
      this.currentPageSubject.getValue() < this.totalPagesSubject.getValue()
    ) {
      this.currentPageSubject.next(this.currentPageSubject.getValue() + 1);
    }
  }

  updatePaginationTotal(amount: number): void {
    this.totalPagesSubject.next(amount);
  }

  getTotalPages(): number {
    return this.totalPagesSubject.getValue();
  }

  getCurrentPage(): number {
    return this.currentPageSubject.getValue();
  }

  refreshQuery(): void {
    this.refreshSubject.next();
  }
}
