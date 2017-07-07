import { Component, OnInit } from '@angular/core';
import {RecurringExpensesService} from "./shared/recurring-expenses.service";
import {RecurringExpense} from "./shared/recurring-expense";
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-recurring-expenses',
  templateUrl: './recurring-expenses.component.html',
  styleUrls: ['./recurring-expenses.component.css'],
  providers: [CookieService]
})
export class RecurringExpensesComponent implements OnInit {

  private recurringExpenses: RecurringExpense[] = [];

  constructor(private recurringExpensesService: RecurringExpensesService,
    private _cookieService:CookieService) { }

  ngOnInit() {
    this.recurringExpensesService.authenticate(this._cookieService.get('token'));

    this.recurringExpensesService.getRecurringExpenses()
      .subscribe(data => this.recurringExpenses = data);
  }

  deleteRecurringExpense(recurringExpense){
    if (confirm("Are you sure you want to delete " + recurringExpense.expenseTypeDescription + " recurring " + recurringExpense.recurringTypeDescription + "?")) {
      var index = this.recurringExpenses.indexOf(recurringExpense);
      this.recurringExpenses.splice(index, 1);
      this.recurringExpensesService.deleteRecurringExpense(recurringExpense.id)
        .subscribe(null,
          err => {
            alert("Could not delete expense.");
            // Revert the view back to its original state
            this.recurringExpenses.splice(index, 0, recurringExpense);
          });
    }
  }

}
