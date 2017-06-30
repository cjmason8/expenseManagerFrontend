import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

import { ExpensesComponent } from './expenses.component';
import { ExpensesService } from './shared/expenses.service';
import { ExpenseFormComponent } from './expense-form/expense-form.component';

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
    ExpensesComponent,
    ExpenseFormComponent,
    MaterializeDirective
  ],
  exports: [
    ExpensesComponent
  ],
  providers: [
    ExpensesService
  ]
})
export class ExpensesModule { }
