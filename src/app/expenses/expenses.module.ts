import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';
import { ChartModule } from 'angular2-chartjs';

import { ExpensesComponent } from './expenses.component';
import { SearchService } from './shared/search.service';

import {MatInputModule, MatButtonModule,
  MatAutocompleteModule, MatOptionModule, MatDatepickerModule, MatNativeDateModule,
  DateAdapter, NativeDateAdapter} from '@angular/material';

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
    MatNativeDateModule,
    ChartModule
  ],
  declarations: [
    ExpensesComponent
  ],
  exports: [
    ExpensesComponent
  ],
  providers: [
    SearchService
  ]
})
export class ExpensesModule { }
