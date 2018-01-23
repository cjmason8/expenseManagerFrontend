import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

import { HomeComponent } from './home.component';
import { RecurringComponent } from './recurring.component';
import { HomeService } from './shared/home.service';

import { MyDateAdapter, MY_DATE_FORMATS } from '../shared/mydate.adapter';
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
    HomeComponent,
    RecurringComponent
  ],
  exports: [
    HomeComponent,
    RecurringComponent
  ],
  providers: [
    HomeService,
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    {provide: DateAdapter, useClass: MyDateAdapter}
  ]
})
export class HomeModule { }
