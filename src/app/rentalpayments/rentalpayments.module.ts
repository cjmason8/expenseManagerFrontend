import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { RentalPaymentsComponent } from './rentalpayments.component';
import { RentalPaymentsService } from './shared/retntalpayments.service';
import { RentalPaymentFormComponent } from './rentalpayment-form/rentalpayment-form.component';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatOptionModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

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
