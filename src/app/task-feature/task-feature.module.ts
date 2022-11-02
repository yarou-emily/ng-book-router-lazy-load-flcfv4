import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TaskRoutingModule } from './task-feature-routing.module';
import { TaskPageComponent } from './task-page/task-page.component';
import { TaskComponent } from './task/task.component';
import { TaskFormPageComponent } from './task-form-page/task-form-page.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TaskRoutingModule],
  declarations: [TaskPageComponent, TaskComponent, TaskFormPageComponent],
})
export class TaskFeatureModule {}
