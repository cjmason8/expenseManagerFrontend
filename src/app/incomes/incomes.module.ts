import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

import { IncomesService } from './shared/incomes.service';
import { IncomeFormComponent } from './income-form/income-form.component';

import {MaterializeModule} from "angular2-materialize";

import {MdCardModule, MdInputModule, MdButtonModule, MaterialModule, MdAutocompleteModule, MdOptionModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    MaterializeModule,
    MdCardModule,
    MdInputModule,
    MdButtonModule,
    MaterialModule,
    MdAutocompleteModule,
    MdOptionModule
  ],
  declarations: [
    IncomeFormComponent
  ],
  exports: [
  ],
  providers: [
    IncomesService
  ]
})
export class IncomesModule { }
