import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'

@Injectable()
export class ExpensesService {

  private url: string = environment.backendEndPoint;
  private expensesUrl: string = environment.backendEndPoint + "/expenses";

  constructor(private http: Http,
      private router: Router,
      private route: ActivatedRoute) { }

  getExpense(id){
    return this.http.get(this.getExpenseUrl(id))
      .map(res => res.json());
  }

  payExpense(id){
    let reqUrl = this.expensesUrl + "/pay/" + id;
    return this.http.get(reqUrl)
      .map(res => res.json());
  }

  unPayExpense(id){
    let reqUrl = this.expensesUrl + "/unpay/" + id;
    return this.http.get(reqUrl)
      .map(res => res.json());
  }  

  addExpense(expense){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.post(this.expensesUrl, JSON.stringify(expense), options)
      .map(res => res.json());
  }

  updateExpense(expense){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.put(this.getExpenseUrl(expense.id), JSON.stringify(expense), options)
      .map(res => res.json());
  }

  deleteExpense(id){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.delete(this.getExpenseUrl(id), options)
      .map(res => res.json());
  }

  findExpenses(expense) {
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.post(this.expensesUrl + '/search', JSON.stringify(expense), options)
      .map(res => res.json());
  } 

  private getExpenseUrl(id){
    return this.expensesUrl + "/" + id;
  }

}
