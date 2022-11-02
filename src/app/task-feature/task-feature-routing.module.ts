import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskFormPageComponent } from './task-form-page/task-form-page.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { TaskResolver } from './task.resolver';

const routes: Routes = [
  { path: 'list', component: TaskPageComponent },
  { path: 'form', component: TaskFormPageComponent },
  {
    path: 'form/:sn',
    component: TaskFormPageComponent,
    resolve: {
      task: TaskResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
