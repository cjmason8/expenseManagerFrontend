import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

import { RecurringExpensesComponent } from './recurring-expenses.component';
import { RecurringExpensesService } from './shared/recurring-expenses.service';
import { RecurringExpenseFormComponent } from './recurring-expense-form/recurring-expense-form.component';

import {MaterializeDirective} from "angular2-materialize";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule
  ],
  declarations: [
    RecurringExpensesComponent,
    RecurringExpenseFormComponent,
    MaterializeDirective
  ],
  exports: [
    RecurringExpensesComponent
  ],
  providers: [
    RecurringExpensesService
  ]
})
export class ExpensesModule { }
