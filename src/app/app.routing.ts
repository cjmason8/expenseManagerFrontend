import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RecurringComponent } from './home/recurring.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: ':weekString', component: HomeComponent },
  { path: 'loginJade/now', component: HomeComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'recurring/all', component: RecurringComponent },
  { path: '**', redirectTo: 'not-found' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
