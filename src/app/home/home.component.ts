import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { ExpensesService } from '../expenses/shared/expenses.service';
import { IncomesService } from '../incomes/shared/incomes.service';
import {Expense} from "../expenses/shared/expense";
import {Income} from "../incomes/shared/income";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CookieService]
})
export class HomeComponent implements OnInit {

  private expenses: Expense[] = [];
  private incomes: Income[] = [];
  private previousWeek: String;
  private nextWeek: String;
  private thisWeek: String;
  private incomeTotal: String;
  private expenseTotal: String;
  private difference: String;

  constructor(private expensesService: ExpensesService, private route: ActivatedRoute, private router: Router,
    private _cookieService:CookieService, private incomesService: IncomesService) { }

  ngOnInit() {
    this.expensesService.authenticate(this._cookieService.get('token'));

    this.route.params.subscribe(params => {
      this.expensesService.getExpensesForWeek(params['weekString'])
        .subscribe(data => {
          this.expenses = data.expenses;
          this.incomes = data.incomes;
          this.previousWeek = data.previousWeek;
          this.nextWeek = data.nextWeek;
          this.thisWeek = data.thisWeek;
          this.incomeTotal = data.incomeTotal;
          this.expenseTotal = data.expenseTotal;
          this.difference = data.difference;
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
      var index = this.expenses.indexOf(income);
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

  gotoWeek() {
    this.router.navigate(['' + document.forms[0]['dateString'].value]);
    document.forms[0]['dateString'].value = "";
  }

}
