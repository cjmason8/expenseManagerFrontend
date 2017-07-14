import { Routes, RouterModule } from '@angular/router';

import { ExpensesComponent } from './expenses.component';
import {ExpenseFormComponent} from "./expense-form/expense-form.component";

const expensesRoutes: Routes = [
  { path: 'expenses/new', component: ExpenseFormComponent},
  { path: 'expenses/:id', component: ExpenseFormComponent}
];

export const expensesRouting = RouterModule.forChild(expensesRoutes);
