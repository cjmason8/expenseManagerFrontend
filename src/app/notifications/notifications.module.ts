import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }  from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NotificationsComponent } from './notifications.component';
import { NotificationsService } from './shared/notifications.service';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatOptionModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';  

@NgModule({
  imports: [
    CommonModule,
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
