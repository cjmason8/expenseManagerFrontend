import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { ExpensesService } from '../expenses/shared/expenses.service';
import { IncomesService } from '../incomes/shared/incomes.service';
import { AuthenticateService } from '../shared/authenticate.service';
import { HomeService } from './shared/home.service';
import {Expense} from "../expenses/shared/expense";
import {Income} from "../incomes/shared/income";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recurring',
  templateUrl: './recurring.component.html',
  styleUrls: ['./recurring.component.css'],
  providers: [CookieService]
})
export class RecurringComponent implements OnInit {

  private expenses: Expense[] = [];
  private incomes: Income[] = [];

  constructor(private expensesService: ExpensesService, private route: ActivatedRoute,
    private _cookieService:CookieService, private incomesService: IncomesService,
    private authenticateService: AuthenticateService, private homeService: HomeService) { }

  ngOnInit() {
    this.authenticateService.authenticate(this._cookieService.get('token'));

    this.route.params.subscribe(params => {
      this.homeService.getRecurring()
        .subscribe(data => {
          this.expenses = data.expenses;
          this.incomes = data.incomes;
        });
    });
  }

  deleteExpense(expense){
    if (confirm("Are you sure you want to delete " + expense.expenseTypeDescription + " for " + expense.dueDateString + "?")) {
      var index = this.expenses.indexOf(expense);
      this.expenses.splice(index, 1);
      this.expensesService.deleteExpense(expense.id)
        .subscribe(null,
          err => {
            alert("Could not delete expense.");
            // Revert the view back to its original state
            this.expenses.splice(index, 0, expense);
          });
    }
  }

  deleteIncome(income){
    if (confirm("Are you sure you want to delete " + income.incomeTypeDescription + " for " + income.dueDateString + "?")) {
      var index = this.incomes.indexOf(income);
      this.incomes.splice(index, 1);
      this.incomesService.deleteIncome(income.id)
        .subscribe(null,
          err => {
            alert("Could not delete expense.");
            // Revert the view back to its original state
            this.incomes.splice(index, 0, income);
          });
    }
  }  
}
