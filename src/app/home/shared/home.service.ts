import { Injectable } from '@angular/core';
import { ExpensesService } from '../../expenses/shared/expenses.service';
import { IncomesService } from '../../incomes/shared/incomes.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'
import { HomeInfo } from './homeInfo'

import { HttpClient } from "@angular/common/http"

@Injectable()
export class HomeService {

  private url: string = environment.backendEndPoint;

  constructor(private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute,
      private expensesService: ExpensesService,
      private incomesService: IncomesService) { }

  getTransactionsForWeek(weekString): Observable<HomeInfo> {
    var suffix = weekString ? "/" + weekString : "";
    return this.http.get<HomeInfo>(this.url + "/week" + suffix);
  }

  getRecurring(includeAll): Observable<HomeInfo> {
    if (includeAll) {
      return this.http.get<HomeInfo>(this.url + "/recurring/all");
    }
    else {
      return this.http.get<HomeInfo>(this.url + "/recurring/active");
    }
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
