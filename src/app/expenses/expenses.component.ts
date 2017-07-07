import { Component, OnInit } from '@angular/core';
import {ExpensesService} from "./shared/expenses.service";
import {Expense} from "./shared/expense";
import {CookieService} from 'angular2-cookie/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  providers: [CookieService]
})
export class ExpensesComponent implements OnInit {

  private expenses: Expense[] = [];
  private previousWeek: String;
  private nextWeek: String;
  private thisWeek: String;

  constructor(private expensesService: ExpensesService, private route: ActivatedRoute,
    private _cookieService:CookieService) { }

  ngOnInit() {
    this.expensesService.authenticate(this._cookieService.get('token'));

    this.route.params.subscribe(params => {
      this.expensesService.getExpensesForWeek(params['weekString'])
        .subscribe(data => {
          this.expenses = data.expenses;
          this.previousWeek = data.previousWeek;
          this.nextWeek = data.nextWeek;
          this.thisWeek = data.thisWeek;
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

}
