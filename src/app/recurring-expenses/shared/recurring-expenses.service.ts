import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'

@Injectable()
export class RecurringExpensesService {

  private url: string = environment.backendEndPoint + "/recurringExpenses";
  private usersUrl: string = environment.backendEndPoint + "/users";
  private refDataUrl: string = environment.backendEndPoint + "/refData";

  constructor(private http: Http,
      private router: Router,
      private route: ActivatedRoute) { }

  getRecurringExpenses(){
    return this.http.get(this.url)
      .map(res => res.json());
  }

  getRecurringExpense(id){
    return this.http.get(this.getRecurringExpenseUrl(id))
      .map(res => res.json());
  }

  authenticate(token){
    if (!token) {
      this.router.navigate(['login']);
    }

    return this.http.get(this.getAuthenticateUrl(token))
      .map(res => res.json())
      .subscribe(result => {
        if (result.status === 'failed') {
          this.router.navigate(['login']);
        }
      });;
  }

  addRecurringExpense(recurringExpense){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, JSON.stringify(recurringExpense), options)
      .map(res => res.json());
  }

  updateRecurringExpense(recurringExpense){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.put(this.getRecurringExpenseUrl(recurringExpense.id), JSON.stringify(recurringExpense), options)
      .map(res => res.json());
  }

  deleteRecurringExpense(id){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.delete(this.getRecurringExpenseUrl(id), options)
      .map(res => res.json());
  }

  getRecurringTypes(){
    return this.http.get(this.refDataUrl + '/recurringType')
      .map(res => res.json());
  }

  private getRecurringExpenseUrl(id){
    return this.url + "/" + id;
  }

  private getAuthenticateUrl(token){
    return this.usersUrl + "/" + token + "/authenticate";
  }
}
