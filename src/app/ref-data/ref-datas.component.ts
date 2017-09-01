import { Component, OnInit } from '@angular/core';
import {RefDatasService} from "./shared/ref-datas.service";
import { AuthenticateService } from '../shared/authenticate.service';
import { AuthenticateComponent } from '../shared/authenticate.component';
import {RefData} from "./shared/ref-data";
import {CookieService} from 'angular2-cookie/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
 selector: 'app-ref-datas',
 templateUrl: './ref-datas.component.html',
 styleUrls: ['./ref-datas.component.css'],
 providers: []
})
export class RefDatasComponent extends AuthenticateComponent {

  private refDatas: RefData[] = [];
  private refData: RefData = new RefData();

  form: FormGroup;
  title: string;
  types = [
      {value: null, viewValue: 'Please Select'},    
      {value: 'CAUSE', viewValue: 'Cause'},
      {value: 'EXPENSE_TYPE', viewValue: 'Expense Type'},
      {value: 'INCOME_TYPE', viewValue: 'Income Type'},
      {value: 'RECURRING_TYPE', viewValue: 'Recurring Type'}
  ];

  constructor(private formBuilder: FormBuilder, 
  authenticateService: AuthenticateService, private refDatasService: RefDatasService, 
  private route: ActivatedRoute, _cookieService:CookieService) { 
      super(authenticateService, _cookieService);

      this.form = formBuilder.group({
      type: ['', []],
      description: ['', []],
      metaDataChunk: ['', []]
    });
    }

 ngOnInit() {
    super.ngOnInit();

    this.refDatasService.getRefDatas()
      .subscribe(data => {
        this.refDatas = data;
      });
 }

validateForm() {
    return !this.refData.type && !this.refData.description && !this.refData.metaDataChunk;
}

deleteRefData(refData){
    if (confirm("Are you sure you want to delete " + refData.description + "?")) {
      var index = this.refDatas.indexOf(refData);
      this.refDatas.splice(index, 1);
      this.refDatasService.deleteRefData(refData.id)
        .subscribe(null,
          err => {
            alert("Could not delete refData.");
            // Revert the view back to its original state
            this.refDatas.splice(index, 0, refData);
          });
    }
  }

  search() {
    var result = this.refDatasService.findRefDatas(this.refData);

    result.subscribe(data => {
      this.refDatas = data;
    });
  }

}