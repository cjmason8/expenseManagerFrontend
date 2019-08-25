import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { RefDatasComponent } from './ref-datas.component';
import { RefDatasService } from './shared/ref-datas.service';
import { RefDataFormComponent } from './ref-data-form/ref-data-form.component';

import {MatSelectModule, MatInputModule, MatButtonModule,
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
    MatSelectModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    RefDatasComponent,
    RefDataFormComponent
  ],
  exports: [
    RefDatasComponent
  ],
  providers: [
    RefDatasService
  ]
})
export class RefDatasModule { }
