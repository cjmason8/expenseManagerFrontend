import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { ExpensesService } from '../../expenses/shared/expenses.service';
import { IncomesService } from '../../incomes/shared/incomes.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'

@Injectable()
export class HomeService {

  private url: string = environment.backendEndPoint;

  constructor(private http: Http,
      private router: Router,
      private route: ActivatedRoute,
      private expensesService: ExpensesService,
      private incomesService: IncomesService) { }

  getTransactionsForWeek(weekString){
    var suffix = weekString ? "/" + weekString : "";
    return this.http.get(this.url + "/week" + suffix)
      .map(res => res.json());
  }

  getRecurring() {
    return this.http.get(this.url + "/recurring")
      .map(res => res.json());
  }

  deleteExpense(expense, expenses) {
    if (confirm("Are you sure you want to delete " + expense.expenseTypeDescription + " for " + expense.dueDateString + "?")) {
      var index = expenses.indexOf(expense);
      expenses.splice(index, 1);
      this.expensesService.deleteExpense(expense.id)
        .subscribe(null,
          err => {
            alert("Could not delete expense.");
            // Revert the view back to its original state
            expenses.splice(index, 0, expense);
          });
    }
  }

  deleteIncome(income, incomes) {
    if (confirm("Are you sure you want to delete " + income.incomeTypeDescription + " for " + income.dueDateString + "?")) {
      var index = incomes.indexOf(income);
      incomes.splice(index, 1);
      this.incomesService.deleteIncome(income.id)
        .subscribe(null,
          err => {
            alert("Could not delete expense.");
            // Revert the view back to its original state
            incomes.splice(index, 0, income);
          });
    }
  }  

}
