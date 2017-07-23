import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { ExpensesService } from '../expenses/shared/expenses.service';
import { IncomesService } from '../incomes/shared/incomes.service';
import {Expense} from "../expenses/shared/expense";
import {Income} from "../incomes/shared/income";
import { Login } from '../login/shared/login';
import { LoginService } from '../login/shared/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CookieService]
})
export class HomeComponent implements OnInit {

  private expenses: Expense[] = [];
  private unpaidExpenses: Expense[] = [];
  private incomes: Income[] = [];
  private previousWeek: String;
  private nextWeek: String;
  private thisWeek: String;
  private incomeTotal: String;
  private expenseTotal: String;
  private unpaidExpenseTotal: String;
  private difference: String;

  constructor(private expensesService: ExpensesService, private route: ActivatedRoute, private router: Router,
    private _cookieService:CookieService, private incomesService: IncomesService, private loginService: LoginService) { }

  ngOnInit() {
    if (document.location.href.indexOf('Jade') != -1) {
      var login = new Login();
      login.name = "jade";
      login.password = "jade76";
      var result = this.loginService.loginUser(login);

      result.subscribe(data => {
        if (data.loginStatus === 'success') {
          this._cookieService.put('token', data.token);
          this._cookieService.put('roles', data.roles);

          this.displayPage();
        }
      });
    }
    else {
      this.displayPage();
    }
  }

  displayPage() {
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
          this.unpaidExpenseTotal = data.unpaidExpenseTotal;
          this.difference = data.difference;
          this.unpaidExpenses = data.unpaidExpenses;
          if (this.unpaidExpenses && this.unpaidExpenses.length > 0) {
            document.getElementById("unpaidExpensesTable").style.display = "block";
          }
          else {
            document.getElementById("unpaidExpensesTable").style.display = "none";
          }
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
