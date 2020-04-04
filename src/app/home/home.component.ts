import { Component, OnInit, NgZone } from '@angular/core';
import { AuthenticateService } from '../shared/authenticate.service';
import { HomeService } from './shared/home.service';
import { Expense } from "../expenses/shared/expense";
import { Income } from "../incomes/shared/income";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FileComponent } from '../shared/file.component';
import { DocumentsService } from '../documents/shared/documents.service';
import { ExpensesService } from '../expenses/shared/expenses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})
export class HomeComponent extends FileComponent {
  dateString: string;
  public expenses: Expense[] = [];
  public unpaidExpenses: Expense[] = [];
  public incomes: Income[] = [];
  public previousWeek: String;
  public nextWeek: String;
  public thisWeek: String;
  public incomeTotal: String;
  public expenseTotal: String;
  public unpaidExpenseTotal: String;
  public difference: String;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, router: Router,
    private homeService: HomeService,
    authenticateService: AuthenticateService, documentsService: DocumentsService,
    private expensesService: ExpensesService, private zone: NgZone) {
      super(authenticateService, documentsService, router);
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
