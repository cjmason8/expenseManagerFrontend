import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

import { ExpensesService } from './shared/expenses.service';
import { ExpenseFormComponent } from './expense-form/expense-form.component';

import {MaterializeModule} from "angular2-materialize";

import {MdCardModule, MdInputModule, MdButtonModule, MaterialModule, MdAutocompleteModule, MdOptionModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    MaterializeModule,
    MdCardModule,
    MdInputModule,
    MdButtonModule,
    MaterialModule,
    MdAutocompleteModule,
    MdOptionModule
  ],
  declarations: [
    ExpenseFormComponent
  ],
  exports: [
  ],
  providers: [
    ExpensesService
  ]
})
export class ExpensesModule { }
