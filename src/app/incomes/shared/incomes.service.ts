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
  private usersUrl: string = environment.backendEndPoint + "/users";
  private refDataUrl: string = environment.backendEndPoint + "/refData";

  constructor(private http: Http,
      private router: Router,
      private route: ActivatedRoute) { }

  getIncomesForWeek(weekString){
    var suffix = weekString ? "/" + weekString : "";
    return this.http.get(this.url + "/week" + suffix)
      .map(res => res.json());
  }

  getIncome(id){
    return this.http.get(this.getIncomeUrl(id))
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

  getIncomeTypes(){
    return this.http.get(this.refDataUrl + '/incomeType')
      .map(res => res.json());
  }

  private getIncomeUrl(id){
    return this.url + "/" + id;
  }

  private getAuthenticateUrl(token){
    return this.usersUrl + "/" + token + "/authenticate";
  }
}
