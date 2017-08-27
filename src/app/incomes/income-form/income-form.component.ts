import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import { DocumentService } from '../../shared/document.service';
import {Headers, RequestOptions} from '@angular/http';

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
  providers: []
})
export class IncomeFormComponent extends TransactionFormComponent implements OnInit {
  constructor(
    formBuilder: FormBuilder,
    router: Router,
    route: ActivatedRoute,
    private incomesService: IncomesService,
    authenticateService: AuthenticateService,
    refDatasService: RefDatasService,
    _cookieService:CookieService,
    documentService: DocumentService,    
  ) {
    super(formBuilder, router, route, authenticateService, refDatasService, _cookieService, documentService);

    this.transactionType = 'Income';
    this.transactionTypeName = 'incomeType';
    this.transaction = new Income();
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.id) {  
      this.incomesService.getIncome(this.id)
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
