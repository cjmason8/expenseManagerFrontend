import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {ExpensesService} from "./shared/expenses.service";
import { AuthenticateService } from '../shared/authenticate.service';
import { AuthenticateComponent } from '../shared/authenticate.component';
import { Expense } from "./shared/expense";
import {CookieService} from 'angular2-cookie/core';
import { RefDatasService } from '../ref-data/shared/ref-datas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RefData } from '../ref-data/shared/ref-data';

@Component({
 selector: 'app-expenses',
 templateUrl: './expenses.component.html',
 styleUrls: ['./expenses.component.css'],
 providers: []
})
export class ExpensesComponent extends AuthenticateComponent {

  private expenses: Expense[] = [];

  expenseTypeTouched: boolean = false;
  expenseType: RefData;
  stateCtrl: FormControl;
  form: FormGroup;
  title: string;
  expenseTypes: Array<RefData>;

  filteredExpenseTypes: any;

  constructor(private formBuilder: FormBuilder, 
    authenticateService: AuthenticateService, private expensesService: ExpensesService, 
    _cookieService:CookieService,
    private refDatasService: RefDatasService,) { 
      super(authenticateService, _cookieService);

      this.form = formBuilder.group({
      expenseType: ['', [
        Validators.required
      ]]
    });
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
    return this.expenseTypeTouched && !this.expenseType; 
  }

  validateForm() {
    return !this.form.valid;
  }

  search() {
    var result = this.expensesService.findExpenses(this.expenseType);

    result.subscribe(data => {
      this.expenses = data;
    });
  }

}