import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'

@Injectable()
export class HomeService {

  private url: string = environment.backendEndPoint;

  constructor(private http: Http,
      private router: Router,
      private route: ActivatedRoute) { }

  getTransactionsForWeek(weekString){
    var suffix = weekString ? "/" + weekString : "";
    return this.http.get(this.url + "/week" + suffix)
      .map(res => res.json());
  }

  getRecurring() {
    return this.http.get(this.url + "/recurring")
      .map(res => res.json());
  }

}
