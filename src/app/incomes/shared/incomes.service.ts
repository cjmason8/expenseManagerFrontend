import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'

@Injectable()
export class IncomesService {

  private url: string = environment.backendEndPoint + "/incomes";

  constructor(private http: Http,
      private router: Router,
      private route: ActivatedRoute) { }

  getIncome(id){
    return this.http.get(this.getIncomeUrl(id))
      .map(res => res.json());
  }

  addIncome(income){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, JSON.stringify(income), options)
      .map(res => res.json());
  }

  updateIncome(income){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.put(this.getIncomeUrl(income.id), JSON.stringify(income), options)
      .map(res => res.json());
  }

  deleteIncome(id){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.delete(this.getIncomeUrl(id), options)
      .map(res => res.json());
  }

  private getIncomeUrl(id){
    return this.url + "/" + id;
  }

}
