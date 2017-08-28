import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsComponent } from './documents.component';
import { DocumentsService } from './shared/documents.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DocumentsComponent
  ],
  exports: [
    DocumentsComponent
  ],
  providers: [
    DocumentsService
  ]
})
export class DocumentsModule { }
