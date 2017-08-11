import { Component, OnInit } from '@angular/core';
import {DonationsService} from "./shared/donations.service";
import { AuthenticateService } from '../shared/authenticate.service';
import { AuthenticateComponent } from '../shared/authenticate.component';
import { Donation } from "./shared/donation";
import {CookieService} from 'angular2-cookie/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
 selector: 'app-donations',
 templateUrl: './donations.component.html',
 styleUrls: ['./donations.component.css'],
 providers: []
})
export class DonationsComponent extends AuthenticateComponent {

  //private donations: Donation[] = [];

  constructor(authenticateService: AuthenticateService, private donationsService: DonationsService, 
  private route: ActivatedRoute, _cookieService:CookieService) { 
      super(authenticateService, _cookieService);
    }

 ngOnInit() {
    // super.ngOnInit();

    // this.route.params.subscribe(params => {
    //   this.donationsService.getDonations()
    //     .subscribe(data => {
    //       this.donations = data;
    //     });
    // });
 }

  deleteDonation(donation){
    // if (confirm("Are you sure you want to delete " + donation.causeDescription + "?")) {
    //   var index = this.donations.indexOf(donation);
    //   this.donations.splice(index, 1);
    //   this.donationsService.deleteDonation(donation.id)
    //     .subscribe(null,
    //       err => {
    //         alert("Could not delete donation.");
    //         // Revert the view back to its original state
    //         this.donations.splice(index, 0, donation);
    //       });
    // }
  }

}