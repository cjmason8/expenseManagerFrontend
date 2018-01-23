import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Headers, RequestOptions} from '@angular/http';
import * as moment from 'moment';

import { RefData } from '../../ref-data/shared/ref-data';
import { Donation } from '../shared/donation';
import { DonationsService } from '../shared/donations.service';
import { DocumentsService } from '../../documents/shared/documents.service';
import { AuthenticateService } from '../../shared/authenticate.service';
import { FileComponent } from '../../shared/file.component';
import { RefDatasService } from '../../ref-data/shared/ref-datas.service';
import { BasicValidators } from '../../shared/basic-validators';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css'],
  providers: []
})
export class DonationFormComponent extends FileComponent {
  causeTouched: boolean = false;
  form: FormGroup;
  title: string;
  donation: Donation = new Donation();
  causes: Array<RefData>;

  filteredCauses: any;
  stateCtrl: FormControl;

  dueDate: Date;

  constructor(
    formBuilder: FormBuilder,
    router: Router,
    private route: ActivatedRoute,
    private refDatasService: RefDatasService,
    private donationsService: DonationsService,
    documentsService: DocumentsService,
    authenticateService: AuthenticateService,
    _cookieService:CookieService
  ) {
    super(authenticateService, _cookieService, documentsService, router);
    this.fileType = 'donations';
    this.form = formBuilder.group({
      cause: ['', [
        Validators.required
      ]],
      dueDateField: ['', [Validators.required]],
      description: ['', [Validators.required]],
      notes: ['', []],
      metaDataChunk: ['', []],
      documentation: ['', []],
      fileName: ['', []]
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
          donation => {
            this.donation = donation;
            this.dueDate = moment(this.donation.dueDateString, 'DD-MM-YYYY').toDate();
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
    this.donation.dueDateString = moment(this.dueDate).format('DD-MM-YYYY');

    if (this.donation.id){
      result = this.donationsService.updateDonation(this.donation);
    } else {
      result = this.donationsService.addDonation(this.donation);
    }

    result.subscribe(data => {
      this.goto('donations/all');
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

  postFileChange(document) {
    this.donation.documentDto = document;
  }

}
