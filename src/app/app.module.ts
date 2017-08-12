import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {CookieService} from 'angular2-cookie/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { RecurringComponent } from './home/recurring.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routing } from './app.routing';
import { TransactionsModule } from "./shared/transactions.module";
import { RefDatasModule } from "./ref-data/ref-datas.module";
import { LoginModule } from "./login/login.module";
import { HomeModule } from "./home/home.module";
import { DonationsModule } from "./donations/donations.module";

import { AuthenticateService } from './shared/authenticate.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    TransactionsModule,
    LoginModule,
    RefDatasModule,
    HomeModule,
    DonationsModule,
    routing
  ],
  providers: [AuthenticateService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
