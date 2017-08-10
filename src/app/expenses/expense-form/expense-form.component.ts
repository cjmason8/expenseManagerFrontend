import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

import { Expense } from '../shared/expense';
import { RefData } from '../../ref-data/shared/ref-data';
import { ExpensesService } from '../shared/expenses.service';
import { AuthenticateService } from '../../shared/authenticate.service';
import { RefDatasService } from '../../ref-data/shared/ref-datas.service';
import { BasicValidators } from '../../shared/basic-validators';

import { TransactionFormComponent } from '../../shared/transaction-form.component';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-expense-form',
  templateUrl: '../../shared/transaction-form.component.html',
  styleUrls: ['../../shared/transaction-form.component.css'],
  providers: []
})
export class ExpenseFormComponent extends TransactionFormComponent implements OnInit {
  constructor(
    formBuilder: FormBuilder,
    router: Router,
    route: ActivatedRoute,
    private expensesService: ExpensesService,
    authenticateService: AuthenticateService,
    refDatasService: RefDatasService,
    _cookieService:CookieService
  ) {
    super(formBuilder, router, route, authenticateService, refDatasService, _cookieService);

    this.transactionType = 'Expense';
    this.transactionTypeName = 'expenseType';
    this.transaction = new Expense();

  }

  ngOnInit() {
    super.ngOnInit();

    if (this.id) {  
      this.expensesService.getExpense(this.id)
        .subscribe(
          expense => {
            this.transaction = expense;
            if (this.transaction.recurringType) {
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
    }

    document.getElementById("paidDiv").style.display = "block";
  }

  save() {
    var result;

    if (this.transaction.id){
      result = this.expensesService.updateExpense(this.transaction);
    } else {
      result = this.expensesService.addExpense(this.transaction);
    }

    result.subscribe(data => {
      this.router.navigate(['' + data.week]);
    });
  }

}

