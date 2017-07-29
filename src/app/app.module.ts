import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { RecurringComponent } from './home/recurring.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LogoutComponent } from './logout/logout.component';
import { routing } from './app.routing';
import { expensesRouting } from "./expenses/expenses.routing";
import { refDatasRouting } from "./ref-data/ref-datas.routing";
import { incomesRouting } from "./incomes/incomes.routing";
import { loginRouting } from "./login/login.routing";
import { logoutRouting } from "./logout/logout.routing";
import { ExpensesModule } from "./expenses/expenses.module";
import { IncomesModule } from "./incomes/incomes.module";
import { RefDatasModule } from "./ref-data/ref-datas.module";
import { LoginModule } from "./login/login.module";
import { HomeModule } from "./home/home.module";

import { AuthenticateService } from './shared/authenticate.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NotFoundComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ExpensesModule,
    IncomesModule,
    LoginModule,
    RefDatasModule,
    HomeModule,
    expensesRouting,
    refDatasRouting,
    incomesRouting,
    loginRouting,
    logoutRouting,
    routing
  ],
  providers: [AuthenticateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
