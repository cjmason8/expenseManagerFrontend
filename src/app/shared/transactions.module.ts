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

import {MdInputModule, MdButtonModule, MaterialModule, 
  MdAutocompleteModule, MdOptionModule, MdDatepickerModule, MdNativeDateModule,
  DateAdapter, NativeDateAdapter, MD_DATE_FORMATS} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    MdInputModule,
    MdButtonModule,
    MaterialModule,
    MdAutocompleteModule,
    MdOptionModule,
    MdDatepickerModule,
    MdNativeDateModule
  ],
  declarations: [
    ExpenseFormComponent,
    IncomeFormComponent
  ],
  exports: [
  ],
  providers: [
    ExpensesService,
    IncomesService,
    {provide: DateAdapter, useClass: MyDateAdapter},
    {provide: MD_DATE_FORMATS, useValue: MY_DATE_FORMATS},
  ]
})
export class TransactionsModule { }

