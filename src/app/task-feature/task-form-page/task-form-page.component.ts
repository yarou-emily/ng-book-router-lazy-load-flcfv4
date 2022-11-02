import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';

import { Task } from '../task';

@Component({
  templateUrl: './task-form-page.component.html',
  styleUrls: ['./task-form-page.component.css'],
})
export class TaskFormPageComponent implements OnInit, OnDestroy {
  task: Task;

  readonly formControl = new FormControl();

  private readonly stop$ = new Subject<void>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        map(({ task }: Data) => task),
        filter((task) => !!task),
        tap((task) => (this.task = task)),
        takeUntil(this.stop$)
      )
      .subscribe((task) => this.formControl.setValue(task.TaskName));
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  onCancel(): void {
    this.router.navigate(['platform', 'task', 'list'], {
      queryParamsHandling: 'preserve',
    });
  }
}
