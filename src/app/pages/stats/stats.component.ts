import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EChartsOption } from 'echarts';

import { TaskService } from '../../common/services/task.service';
import { TaskStatus } from '../../models/task.model';
import { priorityChartOption } from './chartOptions/priority-chart-option';
import { statusChartOption } from './chartOptions/status-chart-option';

@Component({
  selector: 'tc-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  statusChart: EChartsOption = statusChartOption;
  priorityChart: EChartsOption = priorityChartOption;

  data: {
    created: {
      sooner: number;
      later: number;
      'maybe never': number;
      all: number;
    };
    resolved: {
      sooner: number;
      later: number;
      'maybe never': number;
      all: number;
    };
    rejected: {
      sooner: number;
      later: number;
      'maybe never': number;
      all: number;
    };
  } = {
    created: { sooner: 0, later: 0, 'maybe never': 0, all: 0 },
    resolved: { sooner: 0, later: 0, 'maybe never': 0, all: 0 },
    rejected: { sooner: 0, later: 0, 'maybe never': 0, all: 0 },
  };

  constructor(
    private tasksService: TaskService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.tasksService
      .getTasks('', [TaskStatus.Created, TaskStatus.Resolved, TaskStatus.Rejected])
      .subscribe((tasks) => {
        tasks.forEach((task) => {
          this.data[task.status].all += 1;
          this.data[task.status][task.priority] += 1;
        });
        this.statusChart.series[0].data = [
          { value: this.data.created.all, name: 'Waiting' },
          { value: this.data.resolved.all, name: 'Done' },
          { value: this.data.rejected.all, name: 'Forgotten' },
        ];
        this.priorityChart.series[0].data = [
          { value: this.data.created.sooner, name: 'Sooner' },
          { value: this.data.created.later, name: 'Later' },
          { value: this.data.created['maybe never'], name: 'Maybe never' },
        ];
      });
  }
}
