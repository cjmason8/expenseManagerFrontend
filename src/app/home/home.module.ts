import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

import { HomeComponent } from './home.component';
import { RecurringComponent } from './recurring.component';
import { HomeService } from './shared/home.service';

import { MyDateAdapter, MY_DATE_FORMATS } from '../shared/mydate.adapter';
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
    HomeComponent,
    RecurringComponent
  ],
  exports: [
    HomeComponent,
    RecurringComponent
  ],
  providers: [
    HomeService,
    {provide: DateAdapter, useClass: MyDateAdapter},
    {provide: MD_DATE_FORMATS, useValue: MY_DATE_FORMATS},    
  ]
})
export class HomeModule { }
