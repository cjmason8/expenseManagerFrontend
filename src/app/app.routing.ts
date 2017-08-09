import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RecurringComponent } from './home/recurring.component';
import { ExpenseFormComponent } from "./expenses/expense-form/expense-form.component";
import { IncomeFormComponent } from "./incomes/income-form/income-form.component";
import { RefDatasComponent } from './ref-data/ref-datas.component';
import { RefDataFormComponent } from "./ref-data/ref-data-form/ref-data-form.component";
import { LoginFormComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";

const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'logout', component: LogoutComponent },  
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: ':weekString', component: HomeComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'recurring/all', component: RecurringComponent },
  { path: 'expenses/new', component: ExpenseFormComponent },
  { path: 'expenses/:id', component: ExpenseFormComponent },  
  { path: 'incomes/new', component: IncomeFormComponent },
  { path: 'incomes/:id', component: IncomeFormComponent },  
  { path: 'refdatas/all', component: RefDatasComponent },
  { path: 'refdatas/new', component: RefDataFormComponent },
  { path: 'refdatas/:id', component: RefDataFormComponent },
  { path: '**', redirectTo: 'not-found' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
