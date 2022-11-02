import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Task } from './task';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class TaskResolver implements Resolve<Task> {
  constructor(private taskService: TaskService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Task> {
    const sn = route.paramMap.get('sn');
    return this.taskService.get(sn);
  }
}
