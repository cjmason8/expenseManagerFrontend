import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

import { Expense } from '../shared/expense';
import { RefData } from '../../ref-data/shared/ref-data';
import { ExpensesService } from '../shared/expenses.service';
import { AuthenticateService } from '../../shared/authenticate.service';
import { RefDatasService } from '../../ref-data/shared/ref-datas.service';
import { BasicValidators } from '../../shared/basic-validators';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'],
  providers: [CookieService],
  encapsulation: ViewEncapsulation.None
})
export class ExpenseFormComponent implements OnInit {
  stateCtrl: FormControl;
  stateCtrl2: FormControl;
  form: FormGroup;
  title: string;
  expense: Expense = new Expense();
  expenseTypes: Array<RefData>;
  recurringTypes: Array<RefData>;

  reactiveExpenseTypes: any;
  reactiveRecurringTypes: any;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private expensesService: ExpensesService,
    private authenticateService: AuthenticateService,
    private refDatasService: RefDatasService,
    private _cookieService:CookieService
  ) {
    this.form = formBuilder.group({
      expenseType: ['', [
        Validators.required
      ]],
      amount: ['', [
        Validators.required,
        Validators.pattern('[0-9]+(\.[0-9][0-9])?')
      ]],
      dueDateString: ['', []],
      paid: ['', []],
      recurring: ['', []],      
      recurringType: ['', []],
      startDateString: ['', []],
      endDateString: ['', []],
      notes: ['', []]
    });

    this.stateCtrl = new FormControl({code: 'CA', name: 'California'});
    this.stateCtrl2 = new FormControl({code: 'CA', name: 'California'});
    this.reactiveExpenseTypes = this.stateCtrl.valueChanges
        .startWith(this.stateCtrl.value)
        .map(val => this.displayFn(val))
        .map(name => this.filterExpenseTypes(name));
    this.reactiveRecurringTypes = this.stateCtrl2.valueChanges
        .startWith(this.stateCtrl2.value)
        .map(val => this.displayFn(val))
        .map(name => this.filterRecurringTypes(name));        

  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.description : value;
  }

  filterExpenseTypes(val: string) {
    if (val) {
      const filterValue = val.toLowerCase();
      return this.expenseTypes.filter(state => state.description.toLowerCase().startsWith(filterValue));
    }

    return this.expenseTypes;
  }

  filterRecurringTypes(val: string) {
    if (val) {
      const filterValue = val.toLowerCase();
      return this.recurringTypes.filter(state => state.description.toLowerCase().startsWith(filterValue));
    }

    return this.recurringTypes;
  }

  validateForm() {
    return !this.form.valid || (!this.form.controls['dueDateString'].value && !this.form.controls['recurring'] && !this.form.controls['recurring'].value);
  }

  ngOnInit() {
    this.authenticateService.authenticate(this._cookieService.get('token'));

    this.refDatasService.getTypes('expenseType')
       .subscribe(data => this.expenseTypes = data);

    this.refDatasService.getTypes('recurringType')
       .subscribe(data => this.recurringTypes = data);

    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = id ? 'Edit Expense' : 'New Expense';

      if (!id)
        return;

      this.expensesService.getExpense(id)
        .subscribe(
          expense => {
            this.expense = expense;
            if (this.expense.recurringType) {
              document.forms[0]['recurring'].checked = true;
              document.getElementById('recurringTable').style.display = 'block';
              this.showHideRecurring();
            }
          },
          response => {
            if (response.status == 404) {
              this.router.navigate(['NotFound']);
            }
          });
    });
  }

  save() {
    var result;

    if (this.expense.id){
      result = this.expensesService.updateExpense(this.expense);
    } else {
      result = this.expensesService.addExpense(this.expense);
    }

    result.subscribe(data => {
      this.router.navigate(['' + data.week]);
    });
  }

  showHideRecurring() {
    if (document.forms[0]['recurring'].checked) {
      document.getElementById('recurringTable').style.display = 'block';
      document.getElementById('dueDateDiv').style.display = 'none';
    }
    else {
      document.getElementById('recurringTable').style.display = 'none';
      document.getElementById('dueDateDiv').style.display = 'block';
    }
  }
}
