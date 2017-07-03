import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LogoutComponent } from './logout/logout.component';
import { routing } from './app.routing';
import { expensesRouting } from "./expenses/expenses.routing";
import { recurringExpensesRouting } from "./recurring-expenses/recurring-expenses.routing";
import { loginRouting } from "./login/login.routing";
import { logoutRouting } from "./logout/logout.routing";
import { ExpensesModule } from "./expenses/expenses.module";
import { RecurringExpensesModule } from "./recurring-expenses/recurring-expenses.module";
import { LoginModule } from "./login/login.module";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    NotFoundComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ExpensesModule,
    RecurringExpensesModule,
    LoginModule,
    expensesRouting,
    recurringExpensesRouting,
    loginRouting,
    logoutRouting,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
