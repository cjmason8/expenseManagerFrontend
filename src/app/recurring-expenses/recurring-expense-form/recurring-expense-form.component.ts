import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

import { RecurringExpense } from '../shared/recurring-expense';
import { RefData } from '../../shared/refData';
import { RecurringExpensesService } from '../shared/recurring-expenses.service';
import { ExpensesService } from '../../expenses/shared/expenses.service';
import { BasicValidators } from '../../shared/basic-validators';

@Component({
  selector: 'app-recurring-expense-form',
  templateUrl: './recurring-expense-form.component.html',
  styleUrls: ['./recurring-expense-form.component.css'],
  providers: [CookieService]
})
export class RecurringExpenseFormComponent implements OnInit {

  form: FormGroup;
  title: string;
  recurringExpense: RecurringExpense = new RecurringExpense();
  recurringTypes: Array<RefData>;
  expenseTypes: Array<RefData>;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private recurringExpensesService: RecurringExpensesService,
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
      startDateString: ['', [
        Validators.required
      ]],
      endDateString: ['', []],
      recurringType: ['', [
        Validators.required
      ]],
    });
  }

  ngOnInit() {
    this.recurringExpensesService.authenticate(this._cookieService.get('token'));

    this.recurringExpensesService.getRecurringTypes()
       .subscribe(data => this.recurringTypes = data);

    this.expensesService.getExpenseTypes()
       .subscribe(data => this.expenseTypes = data);

    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = id ? 'Edit Recurring Expense' : 'New Recurring Expense';

      if (!id)
        return;

      this.recurringExpensesService.getRecurringExpense(id)
        .subscribe(
          recurringExpense => this.recurringExpense = recurringExpense,
          response => {
            if (response.status == 404) {
              this.router.navigate(['NotFound']);
            }
          });
    });
  }

  save() {
    var result;

    if (this.recurringExpense.id){
      result = this.recurringExpensesService.updateRecurringExpense(this.recurringExpense);
    } else {
      result = this.recurringExpensesService.addRecurringExpense(this.recurringExpense);
    }

    result.subscribe(data => this.router.navigate(['recurringExpenses']));
  }
}
