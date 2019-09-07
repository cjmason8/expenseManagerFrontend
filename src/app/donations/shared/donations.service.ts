import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'
import { Donation } from './donation'
import { RefData } from '../../ref-data/shared/ref-data'

import { HttpClient, HttpHeaders } from "@angular/common/http"

@Injectable()
export class DonationsService {

  private donationsUrl: string = environment.backendEndPoint + "/donations";

  constructor(private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute) { }

  addDonation(donation): Observable<Donation> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.post<Donation>(this.donationsUrl, JSON.stringify(donation), { responseType: 'json', headers: headers });
  }

  updateDonation(donation): Observable<Donation> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.put<Donation>(this.getDonationUrl(donation.id), JSON.stringify(donation), { responseType: 'json', headers: headers });
  }

  deleteDonation(id): Observable<Donation> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.delete<Donation>(this.getDonationUrl(id), { responseType: 'json', headers: headers });
  }

  getDonation(id): Observable<Donation> {
    return this.http.get<Donation>(this.getDonationUrl(id));
  }

  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(this.donationsUrl);
  } 

  private getDonationUrl(id){
    return this.donationsUrl + "/" + id;
  }

  getTypes(type): Observable<RefData[]> {
    return this.http.get<RefData[]>(this.donationsUrl + '/type/' + type);
  }

  findDonations(donationSearch): Observable<Donation[]> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.post<Donation[]>(this.donationsUrl + '/search', JSON.stringify(donationSearch), { responseType: 'json', headers: headers });
  } 
}
