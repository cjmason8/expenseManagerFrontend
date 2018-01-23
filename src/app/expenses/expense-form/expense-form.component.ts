import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import { DocumentsService } from '../../documents/shared/documents.service';

import { Expense } from '../shared/expense';
import { RefData } from '../../ref-data/shared/ref-data';
import { ExpensesService } from '../shared/expenses.service';
import { AuthenticateService } from '../../shared/authenticate.service';
import { RefDatasService } from '../../ref-data/shared/ref-datas.service';
import { BasicValidators } from '../../shared/basic-validators';
import * as moment from 'moment';

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
    documentsService: DocumentsService,
    authenticateService: AuthenticateService,
    refDatasService: RefDatasService,
    _cookieService:CookieService
  ) {
    super(formBuilder, router, route, authenticateService, refDatasService, _cookieService, documentsService);
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

            console.log('this.transaction.dueDateString - ' + this.transaction.dueDateString);
            this.dueDate = moment(this.transaction.dueDateString, 'DD-MM-YYYY').toDate();
            console.log('dueDate - ' + this.dueDate);
            this.startDate = moment(this.transaction.startDateString, 'DD-MM-YYYY').toDate();
            this.endDate = moment(this.transaction.endDateString, 'DD-MM-YYYY').toDate();

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
    this.transaction.dueDateString = moment(this.dueDate).format('DD-MM-YYYY');
    this.transaction.startDateString = moment(this.startDate).format('DD-MM-YYYY');
    this.transaction.endDateString = moment(this.endDate).format('DD-MM-YYYY');

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

