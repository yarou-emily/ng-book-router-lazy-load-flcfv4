import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css'],
})
export class TaskPageComponent implements OnInit, OnDestroy {
  tasks$!: Observable<Task[]>;

  pageIndex!: number;
  pageSize!: number;

  private readonly stop$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.route.queryParamMap.pipe(
      map((queryParamMap) => ({
        index: +queryParamMap.get('pageIdx') ?? 0,
        size: +queryParamMap.get('pageSize') || 5,
      })),
      tap(({ index, size }) => {
        this.pageIndex = index;
        this.pageSize = size;
      }),
      switchMap(({ index, size }) => this.taskService.getList(index, size)),
      takeUntil(this.stop$)
    );
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  onAdd(): void {
    this.router.navigate(['../', 'form'], { relativeTo: this.route });
  }

  onEdit(task: Task): void {
    this.router.navigate(['../', 'form', task.TaskSn], {
      queryParamsHandling: 'preserve',
      relativeTo: this.route,
    });
  }

  onNextPage(moveIndex: number): void {
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        pageIdx: this.pageIndex + moveIndex,
      },
    });
  }
}
