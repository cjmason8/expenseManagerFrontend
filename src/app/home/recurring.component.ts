import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { AuthenticateService } from '../shared/authenticate.service';
import { AuthenticateComponent } from '../shared/authenticate.component';
import { HomeService } from './shared/home.service';
import {Expense} from "../expenses/shared/expense";
import {Income} from "../incomes/shared/income";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recurring',
  templateUrl: './recurring.component.html',
  styleUrls: ['./recurring.component.css'],
  providers: []
})
export class RecurringComponent extends AuthenticateComponent {

  private expenses: Expense[] = [];
  private incomes: Income[] = [];

  constructor(private route: ActivatedRoute,
    _cookieService:CookieService, authenticateService: AuthenticateService, private homeService: HomeService) {
      super(authenticateService, _cookieService);
     }

  ngOnInit() {
    super.ngOnInit();

    this.route.params.subscribe(params => {
      this.homeService.getRecurring()
        .subscribe(data => {
          this.expenses = data.expenses;
          this.incomes = data.incomes;
        });
    });
  }

  deleteExpense(expense) {
    this.homeService.deleteExpense(expense, this.expenses);
  }

  deleteIncome(income) {
    this.homeService.deleteIncome(income, this.incomes);
  }
}
