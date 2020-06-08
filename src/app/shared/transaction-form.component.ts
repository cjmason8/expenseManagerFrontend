import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentsService } from '../documents/shared/documents.service';
import { RefData } from '../ref-data/shared/ref-data';
import { AuthenticateService } from '../shared/authenticate.service';
import { FileComponent } from '../shared/file.component';
import { RefDatasService } from '../ref-data/shared/ref-datas.service';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
  providers: []
})
export class TransactionFormComponent extends FileComponent {
  transactionTypeTouched: boolean = false;
  recurringTypeTouched: boolean = false;
  transaction: any;
  uploading: string;
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

  dueDate: Date;
  startDate: Date;
  endDate: Date;

  constructor(
    private formBuilder: FormBuilder,
    router: Router,
    private route: ActivatedRoute,
    authenticateService: AuthenticateService,
    private refDatasService: RefDatasService,
    documentsService: DocumentsService
  ) {
    super(authenticateService, documentsService, router);
    this.form = formBuilder.group({
      transactionType: ['', [
        Validators.required
      ]],
      amount: ['', [
        Validators.required,
        Validators.pattern('[0-9]+(\.[0-9][0-9])?')
      ]],
      dueDateField: ['', []],
      paid: ['', []],
      recurring: ['', []],      
      recurringType: ['', []],
      startDateField: ['', []],
      endDateField: ['', []],
      notes: ['', []],
      fileName: ['', []],
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
    return !this.form.controls['transactionType'].valid || !this.form.controls['amount'].valid;
  }

  ngOnInit() {
    super.ngOnInit();
    this.fileType = this.transactionType.toLowerCase() + 's';

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

  postFileChange(document) {
    this.transaction.documentDto = document;
  }

  save() {}

}

