import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

import { HomeComponent } from './home.component';
import { RecurringComponent } from './recurring.component';
import { HomeService } from './shared/home.service';

import {MaterializeModule} from "angular2-materialize";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    MaterializeModule
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
    HomeService
  ]
})
export class HomeModule { }
