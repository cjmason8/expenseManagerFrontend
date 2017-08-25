import { Component, OnInit } from '@angular/core';
import {DonationsService} from "./shared/donations.service";
import { AuthenticateService } from '../shared/authenticate.service';
import { AuthenticateComponent } from '../shared/authenticate.component';
import { DonationSearch } from "./shared/donation-search";
import { Donation } from "./shared/donation";
import {CookieService} from 'angular2-cookie/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RefData } from '../ref-data/shared/ref-data';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RefDatasService } from '../ref-data/shared/ref-datas.service';

@Component({
 selector: 'app-donations',
 templateUrl: './donations.component.html',
 styleUrls: ['./donations.component.css'],
 providers: []
})
export class DonationsComponent extends AuthenticateComponent {
  causeTouched: boolean = false;
  form: FormGroup;

  private donations: Donation[] = [];
  private donationSearch: DonationSearch = new DonationSearch();

  causes: Array<RefData>;

  filteredCauses: any;
  stateCtrl: FormControl;

  constructor(formBuilder: FormBuilder, authenticateService: AuthenticateService, private donationsService: DonationsService, 
  private route: ActivatedRoute, _cookieService:CookieService,
  private refDatasService:RefDatasService) { 
      super(authenticateService, _cookieService);

      this.form = formBuilder.group({
      cause: ['', []],
      startDate: ['', []],
      endDate: ['', []],
      metaDataChunk: ['', []]
    });

    this.stateCtrl = new FormControl({code: 'CA', name: 'California'});
    }

 ngOnInit() {
    super.ngOnInit();

    this.refDatasService.getTypes('cause')
       .subscribe(data => {
         this.causes = data;

        this.filteredCauses = this.stateCtrl.valueChanges
           .startWith(this.stateCtrl.value)
           .map(val => this.displayFn(val))
           .map(name => this.filterCauses(name));
        });

    this.route.params.subscribe(params => {
      this.donationsService.getDonations()
        .subscribe(data => {
          this.donations = data;
        });
    });
 }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.description : value;
  }

  filterCauses(val: string) {
    if (val) {
      const filterValue = val.toLowerCase();
      return this.causes.filter(state => state.description.toLowerCase().indexOf(filterValue) != -1);
    }

    return this.causes;
  }

  deleteDonation(donation){
    if (confirm("Are you sure you want to delete " + donation.causeDescription + "?")) {
      var index = this.donations.indexOf(donation);
      this.donations.splice(index, 1);
      this.donationsService.deleteDonation(donation.id)
        .subscribe(null,
          err => {
            alert("Could not delete donation.");
            // Revert the view back to its original state
            this.donations.splice(index, 0, donation);
          });
    }
  }

  causeInvalid() {
    return this.causeTouched && !this.donationSearch.cause; 
  }

  validateForm() {
    return !this.donationSearch.cause && !this.donationSearch.startDate && !this.donationSearch.endDate;
  }

  search() {
    var result = this.donationsService.findDonations(this.donationSearch);

    result.subscribe(data => {
      this.donations = data;
    });
  }

}