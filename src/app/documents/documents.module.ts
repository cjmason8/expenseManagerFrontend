import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

import { DonationsComponent } from './donations.component';
import { DonationsService } from './shared/donations.service';
import { DonationFormComponent } from './donation-form/donation-form.component';

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
