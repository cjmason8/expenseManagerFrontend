import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import * as moment from 'moment';

import { RefData } from '../../ref-data/shared/ref-data';
import { Document } from '../../documents/shared/document';
import { RentalPayment } from '../shared/rentalpayment';
import { RentalPaymentsService } from '../shared/retntalpayments.service';
import { DocumentsService } from '../../documents/shared/documents.service';
import { AuthenticateService } from '../../shared/authenticate.service';
import { FileComponent } from '../../shared/file.component';
import { RefDatasService } from '../../ref-data/shared/ref-datas.service';

@Component({
  selector: 'app-rentalpayment-form',
  templateUrl: './rentalpayment-form.component.html',
  styleUrls: ['./rentalpayment-form.component.css'],
  providers: []
})
export class RentalPaymentFormComponent extends FileComponent {
  causeTouched: boolean = false;
  form: FormGroup;
  title: string;
  rentalPayment: RentalPayment = new RentalPayment();
  causes: Array<RefData>;

  filteredCauses: any;
  stateCtrl: FormControl;

  statementFrom: Date;
  statementTo: Date;

  constructor(
    formBuilder: FormBuilder,
    router: Router,
    private route: ActivatedRoute,
    private refDatasService: RefDatasService,
    private rentalPaymentsService: RentalPaymentsService,
    documentsService: DocumentsService,
    authenticateService: AuthenticateService,
    _cookieService:CookieService
  ) {
    super(authenticateService, _cookieService, documentsService, router);
    this.fileType = 'rentalpayments';
    this.form = formBuilder.group({
      property: ['', [Validators.required]],
      totalRent: ['', [Validators.required]],
      managementFee: ['', [Validators.required]],
      adminFee: ['', []],
      statementFrom: ['', []],
      statementTo: ['', []],
      fileName: ['', []]
    });

    this.stateCtrl = new FormControl({code: 'CA', name: 'California'});

  }

  ngOnInit() {
    super.ngOnInit();


     var id = this.route.params.subscribe(params => {
       var id = params['id'];

       this.title = id ? 'Edit Rental Payment' : 'New Rental Payment';

       if (!id)
         return;

       this.rentalPaymentsService.getRentalPayment(id)
         .subscribe(
           rentalPayment => {
             this.rentalPayment = rentalPayment;
             this.statementFrom = this.rentalPayment.statementFromString ? moment(this.rentalPayment.statementFromString, 'DD-MM-YYYY').toDate() : null;
             this.statementTo = this.rentalPayment.statementToString ? moment(this.rentalPayment.statementToString, 'DD-MM-YYYY').toDate() : null;
             if (!this.rentalPayment.documentDto) {
               this.rentalPayment.documentDto = new Document();
             }
           },
           response => {
             if (response.status == 404) {
               this.goto('NotFound');
             }
           });
    });
  }

  save() {
    var result;
    this.rentalPayment.statementFromString = this.statementFrom ? moment(this.statementFrom).format('DD-MM-YYYY') : null;
    this.rentalPayment.statementToString = this.statementTo ? moment(this.statementTo).format('DD-MM-YYYY') : null;

    if (this.rentalPayment.id){
      result = this.rentalPaymentsService.updateRentalPayment(this.rentalPayment);
    } else {
      result = this.rentalPaymentsService.addRentalPayment(this.rentalPayment);
    }

    result.subscribe(data => {
      this.goto('rentalpayments/all');
    });
  }

  postFileChange(document) {
    this.rentalPayment.documentDto = document;
  }

}
