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

  private url: string = environment.backendEndPoint + "/expenses";
  private usersUrl: string = environment.backendEndPoint + "/users";
  private refDataUrl: string = environment.backendEndPoint + "/refData";

  constructor(private http: Http,
      private router: Router,
      private route: ActivatedRoute) { }

  getExpensesForWeek(weekString){
    var suffix = weekString ? "/" + weekString : "";
    return this.http.get(this.url + "/week" + suffix)
      .map(res => res.json());
  }

  getExpense(id){
    return this.http.get(this.getExpenseUrl(id))
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

  addExpense(expense){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, JSON.stringify(expense), options)
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

  getExpenseTypes(){
    return this.http.get(this.refDataUrl + '/expenseType')
      .map(res => res.json());
  }

  private getExpenseUrl(id){
    return this.url + "/" + id;
  }

  private getAuthenticateUrl(token){
    return this.usersUrl + "/" + token + "/authenticate";
  }
}
