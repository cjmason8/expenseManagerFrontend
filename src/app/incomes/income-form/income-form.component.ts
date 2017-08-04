import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

import { Income } from '../shared/income';
import { IncomesService } from '../shared/incomes.service';
import { AuthenticateService } from '../../shared/authenticate.service';
import { RefDatasService } from '../../ref-data/shared/ref-datas.service';
import { BasicValidators } from '../../shared/basic-validators';

import { TransactionFormComponent } from '../../shared/transaction-form.component';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-income-form',
  templateUrl: '../../shared/transaction-form.component.html',
  styleUrls: ['../../shared/transaction-form.component.css'],
  providers: [CookieService]
})
export class IncomeFormComponent extends TransactionFormComponent implements OnInit {
  transaction: Income = new Income();

  constructor(
    formBuilder: FormBuilder,
    router: Router,
    route: ActivatedRoute,
    private incomesService: IncomesService,
    authenticateService: AuthenticateService,
    refDatasService: RefDatasService,
    _cookieService:CookieService
  ) {
    super(formBuilder, router, route, authenticateService, refDatasService, _cookieService);

    this.transactionType = 'Income';
    this.transactionTypeName = 'incomeType';
  }

  ngOnInit() {
    var id = super.init();

    if (id != -1) {  
      this.incomesService.getIncome(id)
        .subscribe(
          income => {
            this.transaction = income;
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
  }

  save() {
    var result;

    if (this.transaction.id){
      result = this.incomesService.updateIncome(this.transaction);
    } else {
      result = this.incomesService.addIncome(this.transaction);
    }

    result.subscribe(data => {
      this.router.navigate(['' + data.week]);
    });
  }

}
