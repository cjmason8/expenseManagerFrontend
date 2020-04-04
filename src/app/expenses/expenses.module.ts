import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular2-chartjs';

import { MyDateAdapter, MY_DATE_FORMATS } from '../shared/mydate.adapter';
import { ExpensesComponent } from './expenses.component';
import { SearchService } from './shared/search.service';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatOptionModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
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
    SearchService,
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    {provide: DateAdapter, useClass: MyDateAdapter}
  ]
})
export class ExpensesModule { }
