import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import { DocumentsService } from '../documents/shared/documents.service';
import {Headers, RequestOptions} from '@angular/http';

import { RefData } from '../ref-data/shared/ref-data';
import { AuthenticateService } from '../shared/authenticate.service';
import { AuthenticateComponent } from '../shared/authenticate.component';
import { RefDatasService } from '../ref-data/shared/ref-datas.service';
import { BasicValidators } from '../shared/basic-validators';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
  providers: []
})
export class TransactionFormComponent extends AuthenticateComponent {
  transactionTypeTouched: boolean = false;
  recurringTypeTouched: boolean = false;
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
    _cookieService: CookieService,
    private documentsService: DocumentsService
  ) {
    super(authenticateService, _cookieService);
    this.route = routeParam;
    this.router = routerParam;

    this.form = formBuilder.group({
      transactionType: ['', [
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
      notes: ['', []],
      metaDataChunk: ['', []]
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
    this.transaction.metaDataChunk = selectedItem.metaDataChunk;
  }

  transactionTypeInvalid() {
    return this.transactionTypeTouched && !this.transaction.transactionType; 
  }

  recurringTypeInvalid() {
    return this.recurringTypeTouched && !this.transaction.recurringType; 
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      let formData:FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      let headers = new Headers();
      let options = new RequestOptions({ headers: headers });
      let type = this.transactionType.toLowerCase() + 's';
      this.documentsService.uploadFile(formData, options, type)
        .subscribe(
          filePath => this.transaction.documentationFilePath = filePath.filePath,
          response => {
            if (response.status == 404) {
              this.router.navigate(['NotFound']);
            }
          });
    }
  }

  viewDocumentation() {
      let type = this.transactionType.toLowerCase() + 's';
      this.documentsService.getFile(this.transaction.id, type)
        .subscribe((res) => {
          var fileURL = URL.createObjectURL(res);
          window.open(fileURL);
        });
  }

}

