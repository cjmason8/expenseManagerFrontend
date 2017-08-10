import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

import { RefData } from '../ref-data/shared/ref-data';
import { AuthenticateService } from '../shared/authenticate.service';
import { AuthenticateComponent } from '../shared/authenticate.component';
import { RefDatasService } from '../ref-data/shared/ref-datas.service';
import { BasicValidators } from '../shared/basic-validators';
import { customValidator } from './custom.validator';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
  providers: []
})
export class TransactionFormComponent extends AuthenticateComponent {
  transaction: any;
  id: any;
  transactionType: string;
  transactionTypeName: string;
  stateCtrl: FormControl;
  stateCtrl2: FormControl;
  form: FormGroup;
  title: string;
  transactionTypes: Array<RefData>;
  recurringTypes: Array<RefData>;

  filteredTransactionTypes: any;
  filteredRecurringTypes: any;
  router: Router;
  route: ActivatedRoute;

  constructor(
    private formBuilder: FormBuilder,
    private routerParam: Router,
    private routeParam: ActivatedRoute,
    authenticateService: AuthenticateService,
    private refDatasService: RefDatasService,
    _cookieService: CookieService
  ) {
    super(authenticateService, _cookieService);
    this.route = routeParam;
    this.router = routerParam;

    this.form = formBuilder.group({
      transactionType: ['', [
        Validators.required, customValidator(this.transaction)
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
      notes: ['', []],
      metaDataChunk: ['', [
        Validators.required
      ]]
    });

    this.stateCtrl = new FormControl({code: 'CA', name: 'California'});
    this.stateCtrl2 = new FormControl({code: 'CA', name: 'California'});
  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.description : value;
  }

  filterTransactionTypes(val: string) {
    if (val) {
      const filterValue = val.toLowerCase();
      return this.transactionTypes.filter(state => state.description.toLowerCase().indexOf(filterValue) != -1);
    }

    return this.transactionTypes;
  }

  filterRecurringTypes(val: string) {
    if (val) {
      const filterValue = val.toLowerCase();
      return this.recurringTypes.filter(state => state.description.toLowerCase().indexOf(filterValue) != -1);
    }

    return this.recurringTypes;
  }

  validateForm() {
    return !this.form.valid || (!this.form.controls['dueDateString'].value && !this.form.controls['recurring'] && !this.form.controls['recurring'].value);
  }

  ngOnInit() {
    super.ngOnInit();

    this.refDatasService.getTypes(this.transactionTypeName)
       .subscribe(data => {
         this.transactionTypes = data;

        this.filteredTransactionTypes = this.stateCtrl.valueChanges
           .startWith(this.stateCtrl.value)
           .map(val => this.displayFn(val))
           .map(name => this.filterTransactionTypes(name));
        });

    this.refDatasService.getTypes('recurringType')
       .subscribe(data => {
         this.recurringTypes = data;

        this.filteredRecurringTypes = this.stateCtrl2.valueChanges
           .startWith(this.stateCtrl2.value)
           .map(val => this.displayFn(val))
           .map(name => this.filterRecurringTypes(name));
       });

    var id = this.route.params.subscribe(params => {
      var id = params['id'];
      this.title = id ? 'Edit ' + this.transactionType : 'New ' + this.transactionType;

      if (id)
        this.id = id;
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

  selectTransactionType(selectedItem) {
    console.log('in here');
    this.transaction.metaDataChunk = selectedItem.metaDataChunk;
  }

  validateTransactionType() {
    console.log('in here333333');
    if (this.transaction.transactionType) {
      console.log('in here44444444');
      this.form.controls['transactionType'].setErrors({"incorrectValue":"true"});
    }
  }

}

