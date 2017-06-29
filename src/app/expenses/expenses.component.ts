import { Component, OnInit } from '@angular/core';
import {ExpensesService} from "./shared/expenses.service";
import {Expense} from "./shared/expense";
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  providers: [CookieService]
})
export class ExpensesComponent implements OnInit {

  private expenses: Expense[] = [];

  constructor(private expensesService: ExpensesService,
    private _cookieService:CookieService) { }

  ngOnInit() {
    this.expensesService.authenticate(this._cookieService.get('token'));

    this.expensesService.getExpenses()
      .subscribe(data => this.expenses = data);
  }

  deleteExpense(expense){
    if (confirm("Are you sure you want to delete " + expense.name + "?")) {
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
