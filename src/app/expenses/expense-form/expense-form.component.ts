import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

import { Expense } from '../shared/expense';
import { RefData } from '../../shared/refData';
import { ExpensesService } from '../shared/expenses.service';
import { BasicValidators } from '../../shared/basic-validators';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'],
  providers: [CookieService]
})
export class ExpenseFormComponent implements OnInit {

  form: FormGroup;
  title: string;
  expense: Expense = new Expense();
  expenseTypes: Array<RefData>;
  recurringTypes: Array<RefData>;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private expensesService: ExpensesService,
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
      dueDateString: ['', [
        Validators.required
      ]],
      paid: ['', []],
      recurring: ['', []],      
      recurringTypeId: ['', []],
      startDateString: ['', []],
      endDateString: ['', []],
      notes: ['', []]
    });
  }

  ngOnInit() {
    this.expensesService.authenticate(this._cookieService.get('token'));

    this.expensesService.getExpenseTypes()
       .subscribe(data => this.expenseTypes = data);

    this.expensesService.getRecurringTypes()
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
            if (this.expense.recurringTypeId) {
              document.forms[0]['recurring'].checked = true;
              document.getElementById('recurringTable').style.display = 'block';
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
      console.log(data);
      this.router.navigate(['' + data.week]);
    });
  }

  showHideRecurring() {
    if (document.forms[0]['recurring'].checked) {
      document.getElementById('recurringTable').style.display = 'block';
    }
    else {
      document.getElementById('recurringTable').style.display = 'none';
    }
  }
}
