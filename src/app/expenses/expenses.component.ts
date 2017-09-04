import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {ExpensesService} from "./shared/expenses.service";
import { AuthenticateService } from '../shared/authenticate.service';
import { FileComponent } from '../shared/file.component';
import { Expense } from "./shared/expense";
import {CookieService} from 'angular2-cookie/core';
import { RefDatasService } from '../ref-data/shared/ref-datas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RefData } from '../ref-data/shared/ref-data';
import {DocumentsService} from "../documents/shared/documents.service";

@Component({
 selector: 'app-expenses',
 templateUrl: './expenses.component.html',
 styleUrls: ['./expenses.component.css'],
 providers: []
})
export class ExpensesComponent extends FileComponent {

  private expenses: Expense[] = [];
  private expense: Expense = new Expense();

  expenseTypeTouched: boolean = false;
  stateCtrl: FormControl;
  form: FormGroup;
  title: string;
  expenseTypes: Array<RefData>;

  filteredExpenseTypes: any;
  type: string;
  data: any;
  options: any;

  constructor(private formBuilder: FormBuilder, 
    authenticateService: AuthenticateService, private expensesService: ExpensesService, 
    _cookieService:CookieService, documentsService: DocumentsService, router: Router,
    private refDatasService: RefDatasService,) { 
      super(authenticateService, _cookieService, documentsService, router);

      this.form = formBuilder.group({
      expenseType: ['', []],
      startDateString: ['', []],
      endDateString: ['', []],
      metaDataChunk: ['', []]
    });

    this.type = 'bar';
    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
      }
    };
  }

  ngOnInit() {
    super.ngOnInit();

    this.refDatasService.getTypes('expenseType')
       .subscribe(data => {
         this.expenseTypes = data;

        this.filteredExpenseTypes = this.stateCtrl.valueChanges
           .startWith(this.stateCtrl.value)
           .map(val => this.displayFn(val))
           .map(name => this.filterExpenseTypes(name));
        });

    this.expensesService.getExpenses()
      .subscribe(data => {
        this.expenses = data;
      });

    this.stateCtrl = new FormControl({code: 'CA', name: 'California'});
  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.description : value;
  }

  filterExpenseTypes(val: string) {
    if (val) {
      const filterValue = val.toLowerCase();
      return this.expenseTypes.filter(state => state.description.toLowerCase().indexOf(filterValue) != -1);
    }

    return this.expenseTypes;
  }

  deleteExpense(expense) {
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

  expenseTypeInvalid() {
    return this.expenseTypeTouched && !this.expense.transactionType; 
  }

  validateForm() {
    return !this.expense.transactionType && !this.expense.startDateString && !this.expense.endDateString && !this.expense.metaDataChunk;
  }

  search() {
    this.expensesService.findExpenses(this.expense)
    .subscribe(data => {
      this.expenses = data.expenseDtos;
      this.data = data.expenseGraphDto;
    });
  }

}