import { Component, OnInit } from '@angular/core';
import {RentalPaymentsService} from "./shared/retntalpayments.service";
import { AuthenticateService } from '../shared/authenticate.service';
import { FileComponent } from '../shared/file.component';
import { RentalPayment } from "./shared/rentalpayment";
import {CookieService} from 'angular2-cookie/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RefData } from '../ref-data/shared/ref-data';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RefDatasService } from '../ref-data/shared/ref-datas.service';
import {DocumentsService} from "../documents/shared/documents.service";

@Component({
 selector: 'app-rentalpayments',
 templateUrl: './rentalpayments.component.html',
 styleUrls: ['./rentalpayments.component.css'],
 providers: []
})
export class RentalPaymentsComponent extends FileComponent {
  causeTouched: boolean = false;
  form: FormGroup;

  private rentalPaymentsWodonga: RentalPayment[] = [];
  private rentalPaymentsSthKingsville: RentalPayment[] = [];

  constructor(formBuilder: FormBuilder, authenticateService: AuthenticateService, private rentalPaymentsService: RentalPaymentsService, 
  private route: ActivatedRoute, router: Router, _cookieService:CookieService, documentsService: DocumentsService) { 
      super(authenticateService, _cookieService, documentsService, router);

      this.form = formBuilder.group({
      totalRent: ['', []],
      adminFee: ['', []],
      managementFee: ['', []],
      statementFrom: ['', []],
      statementTo: ['', []]
    });
  }

 ngOnInit() {
    super.ngOnInit();

    this.route.params.subscribe(params => {
      this.rentalPaymentsService.getRentalPayments("WODONGA")
        .subscribe(data => {
          this.rentalPaymentsWodonga = data;
        });
    });

    this.route.params.subscribe(params => {
      this.rentalPaymentsService.getRentalPayments("STH_KINGSVILLE")
        .subscribe(data => {
          this.rentalPaymentsSthKingsville = data;
        });
    });
 }

  deleteRentalPayment(rentalPayment, property){
    if (confirm("Are you sure you want to delete " + rentalPayment.statementTo + "?")) {
      if (property === 'WODONGA') {
        var index = this.rentalPaymentsWodonga.indexOf(rentalPayment);
        this.rentalPaymentsWodonga.splice(index, 1);
        this.rentalPaymentsService.deleteRentalPayment(rentalPayment.id)
          .subscribe(null,
            err => {
              alert("Could not delete rentalPayment.");
              // Revert the view back to its original state
              this.rentalPaymentsWodonga.splice(index, 0, rentalPayment);
            });
          }
          else {
            var index = this.rentalPaymentsSthKingsville.indexOf(rentalPayment);
            this.rentalPaymentsSthKingsville.splice(index, 1);
            this.rentalPaymentsService.deleteRentalPayment(rentalPayment.id)
              .subscribe(null,
                err => {
                  alert("Could not delete rentalPayment.");
                  // Revert the view back to its original state
                  this.rentalPaymentsSthKingsville.splice(index, 0, rentalPayment);
                });
          }
    }
  }

  validateForm() {
    return true;
  }

}