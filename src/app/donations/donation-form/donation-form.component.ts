import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

import { RefData } from '../../ref-data/shared/ref-data';
import { Donation } from '../shared/donation';
import { DonationsService } from '../shared/donations.service';
import { AuthenticateService } from '../../shared/authenticate.service';
import { AuthenticateComponent } from '../../shared/authenticate.component';
import { RefDatasService } from '../../ref-data/shared/ref-datas.service';
import { BasicValidators } from '../../shared/basic-validators';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css'],
  providers: []
})
export class DonationFormComponent extends AuthenticateComponent {
  causeTouched: boolean = false;
  form: FormGroup;
  title: string;
  donation: Donation = new Donation();
  causes: Array<RefData>;

  showSelect = false;
  floatPlaceholder: string = 'auto';
  topHeightCtrl = new FormControl(0);

  filteredCauses: any;
  stateCtrl: FormControl;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private refDatasService: RefDatasService,
    private donationsService: DonationsService,
    authenticateService: AuthenticateService,
    _cookieService:CookieService
  ) {
    super(authenticateService, _cookieService);
    this.form = formBuilder.group({
      cause: ['', [
        Validators.required
      ]]
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

    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = id ? 'Edit Cause' : 'New Cause';

      if (!id)
        return;

      this.donationsService.getDonation(id)
        .subscribe(
          donation => this.donation = donation,
          response => {
            if (response.status == 404) {
              this.router.navigate(['NotFound']);
            }
          });
    });
  }

  save() {
    var result;

    if (this.donation.id){
      result = this.donationsService.updateDonation(this.donation);
    } else {
      result = this.donationsService.addDonation(this.donation);
    }

    result.subscribe(data => {
      this.router.navigate(['donations/all']);
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

  causeInvalid() {
    return this.causeTouched && !this.donation.cause; 
  }
}
