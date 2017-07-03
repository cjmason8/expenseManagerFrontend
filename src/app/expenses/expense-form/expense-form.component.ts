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
      paid: ['', []]      
    });
  }

  ngOnInit() {
    this.expensesService.authenticate(this._cookieService.get('token'));

    this.expensesService.getExpenseTypes()
       .subscribe(data => this.expenseTypes = data);

    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = id ? 'Edit Expense' : 'New Expense';

      if (!id)
        return;

      this.expensesService.getExpense(id)
        .subscribe(
          expense => this.expense = expense,
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

    result.subscribe(data => this.router.navigate(['expenses']));
  }
}
