import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

import { ExpensesService } from '../expenses/shared/expenses.service';
import { IncomesService } from '../incomes/shared/incomes.service';
import { MyDateAdapter, MY_DATE_FORMATS } from './mydate.adapter';
import { ExpenseFormComponent } from '../expenses/expense-form/expense-form.component';
import { IncomeFormComponent } from '../incomes/income-form/income-form.component';
import { TransactionFormComponent } from '../shared/transaction-form.component';

import {MatInputModule, MatButtonModule,
  MatAutocompleteModule, MatOptionModule, MatDatepickerModule, MatNativeDateModule,
  DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    ExpenseFormComponent,
    IncomeFormComponent,
    TransactionFormComponent
  ],
  exports: [
  ],
  providers: [
    ExpensesService,
    IncomesService,
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    {provide: DateAdapter, useClass: MyDateAdapter}
  ]
})
export class TransactionsModule { }

