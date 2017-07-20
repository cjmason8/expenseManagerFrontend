import { Component, OnInit } from '@angular/core';
import {RefDatasService} from "./shared/ref-datas.service";
import {ExpensesService} from "../expenses/shared/expenses.service";
import {RefData} from "./shared/ref-data";
import {CookieService} from 'angular2-cookie/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
 selector: 'app-ref-datas',
 templateUrl: './ref-datas.component.html',
 styleUrls: ['./ref-datas.component.css'],
 providers: [CookieService]
})
export class RefDatasComponent implements OnInit {

  private refDatas: RefData[] = [];

  constructor(private expensesService: ExpensesService, private refDatasService: RefDatasService, 
  private route: ActivatedRoute,
    private _cookieService:CookieService) { }

 ngOnInit() {
    this.expensesService.authenticate(this._cookieService.get('token'));

    this.route.params.subscribe(params => {
      this.refDatasService.getRefDatas()
        .subscribe(data => {
          this.refDatas = data;
        });
    });
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

}