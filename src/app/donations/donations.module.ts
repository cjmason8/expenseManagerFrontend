import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { DonationsComponent } from './donations.component';
import { DonationsService } from './shared/donations.service';
import { DonationFormComponent } from './donation-form/donation-form.component';

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
    DonationsComponent,
    DonationFormComponent
  ],
  exports: [
    DonationsComponent
  ],
  providers: [
    DonationsService
  ]
})
export class DonationsModule { }
