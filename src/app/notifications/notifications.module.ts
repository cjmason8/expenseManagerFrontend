import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

import { NotificationsComponent } from './notifications.component';
import { NotificationsService } from './shared/notifications.service';

import {MatInputModule, MatButtonModule,
  MatAutocompleteModule, MatOptionModule, MatDatepickerModule, MatNativeDateModule,
  DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    NotificationsComponent,
  ],
  exports: [
    NotificationsComponent
  ],
  providers: [
    NotificationsService
  ]
})
export class NotificationsModule { }
