import { Component, OnInit, NgZone } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { AuthenticateService } from '../shared/authenticate.service';
import { HomeService } from './shared/home.service';
import { Expense } from "../expenses/shared/expense";
import { Income } from "../incomes/shared/income";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthenticateComponent } from '../shared/authenticate.component';
import { FileUploadService } from '../shared/file.upload.service';
import { ExpensesService } from '../expenses/shared/expenses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})
export class HomeComponent extends AuthenticateComponent {
  dateString: string;
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

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    _cookieService:CookieService, private homeService: HomeService,
    authenticateService: AuthenticateService, private fileUploadService: FileUploadService,
    private expensesService: ExpensesService, private zone: NgZone) {
      super(authenticateService, _cookieService);
      this.form = formBuilder.group({
      dateString: ['', []],
      datePic: ['', []]
    });
     }

  ngOnInit() {
    super.ngOnInit();

    this.route.params.subscribe(params => {
      this.homeService.getTransactionsForWeek(params['weekString'])
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
          if (document.getElementById("unpaidExpensesTable")) {
            if (this.unpaidExpenses && this.unpaidExpenses.length > 0) {
              document.getElementById("unpaidExpensesTable").style.display = "block";
            }
            else {
              document.getElementById("unpaidExpensesTable").style.display = "none";
            }
          }
        });
    });
  }

  deleteExpense(expense) {
    this.homeService.deleteExpense(expense, this.expenses);
  }

  deleteIncome(income) {
    this.homeService.deleteIncome(income, this.incomes);
  }

  gotoWeek() {
    var datePipe = new DatePipe('en-au');
    if (this.dateString && this.dateString != '') {
      this.router.navigate(['' + datePipe.transform(this.dateString, 'dd-MM-yyyy')]);
      this.dateString = '';
    }
  }

  viewDocumentation(id, type) {
      this.fileUploadService.getFile(id, type)
        .subscribe((res) => {
          var fileURL = URL.createObjectURL(res);
          window.open(fileURL);
        });
  }

  payExpense(expense) {
      this.expensesService.payExpense(expense.id)
        .subscribe((res) => {
        expense.paid = true;
        });
  }

  unPayExpense(expense) {
      this.expensesService.unPayExpense(expense.id)
        .subscribe((res) => {
          expense.paid = false;
        });
  }

}
