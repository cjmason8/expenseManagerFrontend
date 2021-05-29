import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RecurringComponent } from './home/recurring.component';
import { ExpenseFormComponent } from "./expenses/expense-form/expense-form.component";
import { ExpensesComponent } from "./expenses/expenses.component";
import { IncomeFormComponent } from "./incomes/income-form/income-form.component";
import { RefDatasComponent } from './ref-data/ref-datas.component';
import { RefDataFormComponent } from "./ref-data/ref-data-form/ref-data-form.component";
import { DonationFormComponent } from "./donations/donation-form/donation-form.component";
import { DonationsComponent } from "./donations/donations.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { DocumentsComponent } from "./documents/documents.component";
import { RentalPaymentsComponent } from "./rentalpayments/rentalpayments.component";
import { RentalPaymentFormComponent } from "./rentalpayments/rentalpayment-form/rentalpayment-form.component";
import { DocumentsMoveComponent } from "./documents/documents.move.component";
import { LoginFormComponent } from "./login/login.component";

const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'logout', component: LoginFormComponent },  
  { path: ':weekString', component: HomeComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'recurring/all', component: RecurringComponent },
  { path: 'recurring/active', component: RecurringComponent },
  { path: 'expenses/search', component: ExpensesComponent },
  { path: 'expenses/new', component: ExpenseFormComponent },
  { path: 'expenses/:id', component: ExpenseFormComponent },  
  { path: 'incomes/new', component: IncomeFormComponent },
  { path: 'incomes/:id', component: IncomeFormComponent },  
  { path: 'refdatas/all', component: RefDatasComponent },
  { path: 'refdatas/new', component: RefDataFormComponent },
  { path: 'refdatas/:id', component: RefDataFormComponent },
  { path: 'donations/all', component: DonationsComponent },
  { path: 'donations/new', component: DonationFormComponent },
  { path: 'donations/:id', component: DonationFormComponent },
  { path: 'documents/all', component: DocumentsComponent },
  { path: 'rentalpayments/all', component: RentalPaymentsComponent },
  { path: 'rentalpayments/new', component: RentalPaymentFormComponent },
  { path: 'rentalpayments/:id', component: RentalPaymentFormComponent },
  { path: 'documents/move', component: DocumentsMoveComponent },
  { path: 'notifications/all', component: NotificationsComponent },
{ path: '', pathMatch: 'full', component: HomeComponent },  
  { path: '**', redirectTo: 'not-found' }
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
