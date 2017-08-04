import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

import { RefDatasComponent } from './ref-datas.component';
import { RefDatasService } from './shared/ref-datas.service';
import { RefDataFormComponent } from './ref-data-form/ref-data-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule
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
