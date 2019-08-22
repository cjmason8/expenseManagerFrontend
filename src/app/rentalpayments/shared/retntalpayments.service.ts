import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'

import { HttpInterceptor } from "../../shared/http.interceptor"

@Injectable()
export class RentalPaymentsService {

  private rentalPaymentsUrl: string = environment.backendEndPoint + "/rentalPayments";

  constructor(private http: HttpInterceptor,
      private router: Router,
      private route: ActivatedRoute) { }

  addRentalPayment(rentalpayment){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.post(this.rentalPaymentsUrl, JSON.stringify(rentalpayment), options)
      .map(res => res.json());
  }

  updateRentalPayment(rentalpayment){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.put(this.getRentalPaymentUrl(rentalpayment.id), JSON.stringify(rentalpayment), options)
      .map(res => res.json());
  }

  deleteRentalPayment(id){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.delete(this.getRentalPaymentUrl(id), options)
      .map(res => res.json());
  }

  getRentalPayment(id){
    return this.http.get(this.getRentalPaymentUrl(id))
      .map(res => res.json());
  }

  getRentalPayments(property){
    return this.http.get(this.rentalPaymentsUrl + "/getByProperty/" + property)
      .map(res => res.json());
  } 

  private getRentalPaymentUrl(id){
    return this.rentalPaymentsUrl + "/" + id;
  }

  getTypes(type){
    return this.http.get(this.rentalPaymentsUrl + '/type/' + type)
      .map(res => res.json());
  }

}
