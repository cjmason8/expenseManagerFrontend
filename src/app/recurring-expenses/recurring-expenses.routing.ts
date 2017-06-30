import { Routes, RouterModule } from '@angular/router';

import { RecurringExpensesComponent } from './recurring-expenses.component';
import {RecurringExpenseFormComponent} from "./recurring-expense-form/recurring-expense-form.component";

const recurringExpensesRoutes: Routes = [
  { path: 'recurringExpenses', component: RecurringExpensesComponent, pathMatch: 'full' },
  { path: 'recurringExpenses/new', component: RecurringExpenseFormComponent},
  { path: 'recurringExpenses/:id', component: RecurringExpenseFormComponent}
];

export const recurringExpensesRouting = RouterModule.forChild(recurringExpensesRoutes);
