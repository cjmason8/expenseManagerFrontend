import { Component, OnInit } from '@angular/core';
import {RentalPaymentsService} from "./shared/retntalpayments.service";
import { AuthenticateService } from '../shared/authenticate.service';
import { FileComponent } from '../shared/file.component';
import { RentalPayment } from "./shared/rentalpayment";
import { RentalPaymentInfo } from "./shared/rentalpaymentinfo";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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

  public rentalPaymentsWodonga: RentalPayment[] = [];
  public rentalPaymentsSthKingsville: RentalPayment[] = [];
  public previousYear: number = null;
  public nextYear: number = null;

  constructor(formBuilder: FormBuilder, authenticateService: AuthenticateService, private rentalPaymentsService: RentalPaymentsService, 
  private route: ActivatedRoute, router: Router, documentsService: DocumentsService) { 
      super(authenticateService, documentsService, router);

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
      this.rentalPaymentsService.getRentalPayments("WODONGA", null)
        .subscribe(data => {
          this.rentalPaymentsWodonga = data.rentalPayments;
        });
    });

    this.route.params.subscribe(params => {
      this.rentalPaymentsService.getRentalPayments("STH_KINGSVILLE", null)
        .subscribe(data => {
          this.rentalPaymentsSthKingsville = data.rentalPayments;
          this.previousYear = data.previousYear;
          this.nextYear = data.nextYear;
        });
    });
 }

 moveFinancialYears(year) {
  this.previousYear = null;
  this.nextYear = null;

  this.route.params.subscribe(params => {
    this.rentalPaymentsService.getRentalPayments("WODONGA", year)
      .subscribe(data => {
        this.rentalPaymentsWodonga = data.rentalPayments;
      });
  });

  this.route.params.subscribe(params => {
    this.rentalPaymentsService.getRentalPayments("STH_KINGSVILLE", year)
      .subscribe(data => {
        this.rentalPaymentsSthKingsville = data.rentalPayments;
        if (data.previousYear != null) {
          this.previousYear = data.previousYear;
        }
        if (data.nextYear != null) {
          this.nextYear = data.nextYear;
        }
      });
  });
 }

  deleteRentalPayment(rentalPayment, property){
    if (confirm("Are you sure you want to delete entry " + rentalPayment.statementFromString + " to " + rentalPayment.statementFromString + "?")) {
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