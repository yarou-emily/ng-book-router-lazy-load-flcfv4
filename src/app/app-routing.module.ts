import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PlatformPageComponent } from './platform-page/platform-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'platform',
    component: PlatformPageComponent,
    children: [
      { path: 'main', component: MainPageComponent },
      { path: 'tasks', pathMatch: 'full', redirectTo: 'task/list' },
      {
        path: 'task',
        loadChildren: () =>
          import('./task-feature/task-feature.module').then(
            (m) => m.TaskFeatureModule
          ),
      },
    ],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // 預先載入全部模組
  // imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
