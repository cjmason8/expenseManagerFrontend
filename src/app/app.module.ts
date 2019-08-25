import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {CookieService} from 'angular2-cookie/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { RecurringComponent } from './home/recurring.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routing } from './app.routing';
import { TransactionsModule } from "./shared/transactions.module";
import { ExpensesModule } from "./expenses/expenses.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { RefDatasModule } from "./ref-data/ref-datas.module";
import { LoginModule } from "./login/login.module";
import { HomeModule } from "./home/home.module";
import { DonationsModule } from "./donations/donations.module";
import { RentalPaymentsModule } from "./rentalpayments/rentalpayments.module";
import { DocumentsModule } from "./documents/documents.module";
import { AuthenticateComponent } from './shared/authenticate.component';
import { FileComponent } from './shared/file.component';

import { AuthenticateService } from './shared/authenticate.service';
import { DocumentsService } from './documents/shared/documents.service';

import { HttpInterceptor } from "./shared/http.interceptor"

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NotFoundComponent,
    AuthenticateComponent,
    FileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    TransactionsModule,
    NotificationsModule,
    LoginModule,
    RefDatasModule,
    HomeModule,
    DonationsModule,
    RentalPaymentsModule,
    DocumentsModule,
    ExpensesModule,
    routing
  ],
  providers: [DocumentsService, AuthenticateService, CookieService, HttpInterceptor, HttpModule, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
