import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

import { RefData } from '../shared/ref-data';
import { RefDatasService } from '../shared/ref-datas.service';
import { AuthenticateService } from '../../shared/authenticate.service';
import { AuthenticateComponent } from '../../shared/authenticate.component';
import { BasicValidators } from '../../shared/basic-validators';

import {MdSelectChange} from '@angular/material';

@Component({
  selector: 'app-ref-data-form',
  templateUrl: './ref-data-form.component.html',
  styleUrls: ['./ref-data-form.component.css'],
  providers: []
})
export class RefDataFormComponent extends AuthenticateComponent {

  form: FormGroup;
  title: string;
  refData: RefData = new RefData();

  types = [
      {value: 'CAUSE', viewValue: 'Cause'},
      {value: 'EXPENSE_TYPE', viewValue: 'Expense Type'},
      {value: 'INCOME_TYPE', viewValue: 'Income Type'},
      {value: 'RECURRING_TYPE', viewValue: 'Recurring Type'}
  ];

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private refDatasService: RefDatasService,
    authenticateService: AuthenticateService,
    _cookieService:CookieService
  ) {
    super(authenticateService, _cookieService);
    this.form = formBuilder.group({
      type: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]],
      metaDataChunk: ['', []]
    });

  }

  ngOnInit() {
    super.ngOnInit();

    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = id ? 'Edit Ref Data' : 'New Ref Data';

      if (!id)
        return;

      this.refDatasService.getRefData(id)
        .subscribe(
          refData => this.refData = refData,
          response => {
            if (response.status == 404) {
              this.router.navigate(['NotFound']);
            }
          });
    });
  }

  save() {
    var result;

    if (this.refData.id){
      result = this.refDatasService.updateRefData(this.refData);
    } else {
      result = this.refDatasService.addRefData(this.refData);
    }

    result.subscribe(data => {
      this.router.navigate(['refdatas/all']);
    });
  }
}
