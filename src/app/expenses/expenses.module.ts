import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

import { ExpensesComponent } from './expenses.component';

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
    ExpensesComponent
  ],
  exports: [
    ExpensesComponent
  ],
  providers: [
  ]
})
export class ExpensesModule { }
