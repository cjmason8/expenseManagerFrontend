import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { RentalPaymentsComponent } from './rentalpayments.component';
import { RentalPaymentsService } from './shared/retntalpayments.service';
import { RentalPaymentFormComponent } from './rentalpayment-form/rentalpayment-form.component';

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
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    RentalPaymentsComponent,
    RentalPaymentFormComponent
  ],
  exports: [
    RentalPaymentsComponent
  ],
  providers: [
    RentalPaymentsService
  ]
})
export class RentalPaymentsModule { }
