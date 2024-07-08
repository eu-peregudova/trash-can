import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { QueryService } from '../../../common/services/query.service';
import { Sort } from '../../../models/sort.model';
import { TaskStatus } from '../../../models/task.model';

@Component({
  selector: 'tc-query-bar',
  templateUrl: './query-bar.component.html',
  styleUrls: ['./query-bar.component.scss'],
})
export class QueryBarComponent implements OnInit {
  sortOptions = Sort.sortOptions;

  sortSelected$: Observable<string>;
  searchCurrent$: Observable<string>;
  filterCurrent$: Observable<string[]>;

  constructor(private queryService: QueryService) {}

  ngOnInit(): void {
    this.sortSelected$ = this.queryService.sort$;
    this.searchCurrent$ = this.queryService.search$;
    this.filterCurrent$ = this.queryService.filter$;
  }

  onSortChange(value: string): void {
    this.queryService.updateSort(value);
  }

  onSearchChange(value: string): void {
    this.queryService.updateSearch(value);
  }

  onFilterChange(values: TaskStatus[]): void {
    this.queryService.updateFilter(values);
  }
}
