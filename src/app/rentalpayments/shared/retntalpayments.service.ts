import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'

import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http"
import { RentalPayment } from './rentalpayment';
import { RefData } from '../../ref-data/shared/ref-data';

@Injectable()
export class RentalPaymentsService {

  private rentalPaymentsUrl: string = environment.backendEndPoint + "/rentalPayments";

  constructor(private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute) { }

  addRentalPayment(rentalpayment): Observable<RentalPayment> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.post<RentalPayment>(this.rentalPaymentsUrl, JSON.stringify(rentalpayment), { responseType: 'json', headers: headers });
  }

  updateRentalPayment(rentalpayment): Observable<RentalPayment> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.put<RentalPayment>(this.getRentalPaymentUrl(rentalpayment.id), JSON.stringify(rentalpayment), { responseType: 'json', headers: headers });
  }

  deleteRentalPayment(id): Observable<RentalPayment> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.delete<RentalPayment>(this.getRentalPaymentUrl(id), { responseType: 'json', headers: headers });
  }

  getRentalPayment(id): Observable<RentalPayment> {
    return this.http.get<RentalPayment>(this.getRentalPaymentUrl(id));
  }

  getRentalPayments(property): Observable<RentalPayment[]> {
    return this.http.get<RentalPayment[]>(this.rentalPaymentsUrl + "/getByProperty/" + property);
  } 

  private getRentalPaymentUrl(id){
    return this.rentalPaymentsUrl + "/" + id;
  }

  getTypes(type): Observable<RefData[]>{
    return this.http.get<RefData[]>(this.rentalPaymentsUrl + '/type/' + type);
  }

}
