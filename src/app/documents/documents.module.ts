import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DocumentsComponent } from './documents.component';
import { DocumentsMoveComponent } from './documents.move.component';
import { DocumentsService } from './shared/documents.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DocumentsComponent,
    DocumentsMoveComponent
  ],
  exports: [
    DocumentsComponent,
    DocumentsMoveComponent
  ],
  providers: [
    DocumentsService
  ]
})
export class DocumentsModule { }
