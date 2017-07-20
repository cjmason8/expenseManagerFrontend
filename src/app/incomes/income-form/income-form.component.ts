import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

import { Income } from '../shared/income';
import { RefData } from '../../shared/refData';
import { IncomesService } from '../shared/incomes.service';
import { ExpensesService } from '../../expenses/shared/expenses.service';
import { BasicValidators } from '../../shared/basic-validators';

@Component({
  selector: 'app-expense-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css'],
  providers: [CookieService]
})
export class IncomeFormComponent implements OnInit {

  form: FormGroup;
  title: string;
  income: Income = new Income();
  incomeTypes: Array<RefData>;
  recurringTypes: Array<RefData>;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private incomesService: IncomesService,
    private expensesService: ExpensesService,
    private _cookieService:CookieService
  ) {
    this.form = formBuilder.group({
      incomeType: ['', [
        Validators.required
      ]],
      amount: ['', [
        Validators.required,
        Validators.pattern('[0-9]+(\.[0-9][0-9])?')
      ]],
      dueDateString: ['', [
        Validators.required
      ]],
      recurring: ['', []],      
      recurringTypeId: ['', []],
      startDateString: ['', []],
      endDateString: ['', []],
      notes: ['', []]
    });
  }

  ngOnInit() {
    this.incomesService.authenticate(this._cookieService.get('token'));

    this.incomesService.getIncomeTypes()
       .subscribe(data => this.incomeTypes = data);

    this.expensesService.getRecurringTypes()
       .subscribe(data => this.recurringTypes = data);

    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = id ? 'Edit Income' : 'New Income';

      if (!id)
        return;

      this.incomesService.getIncome(id)
        .subscribe(
          income => {
            this.income = income;
            if (this.income.recurringTypeId) {
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

    if (this.income.id){
      result = this.incomesService.updateIncome(this.income);
    } else {
      result = this.incomesService.addIncome(this.income);
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
