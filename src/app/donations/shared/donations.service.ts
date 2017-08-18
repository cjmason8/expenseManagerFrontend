import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'

@Injectable()
export class DonationsService {

  private donationsUrl: string = environment.backendEndPoint + "/donations";

  constructor(private http: Http,
      private router: Router,
      private route: ActivatedRoute) { }

  addDonation(donation){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.post(this.donationsUrl, JSON.stringify(donation), options)
      .map(res => res.json());
  }

  updateDonation(donation){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.put(this.getDonationUrl(donation.id), JSON.stringify(donation), options)
      .map(res => res.json());
  }

  deleteDonation(id){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.delete(this.getDonationUrl(id), options)
      .map(res => res.json());
  }

  getDonation(id){
    return this.http.get(this.getDonationUrl(id))
      .map(res => res.json());
  }

  getDonations(){
    return this.http.get(this.donationsUrl)
      .map(res => res.json());
  } 

  uploadFile(formData, options) {
    return this.http.post(this.donationsUrl + '/uploadFile', formData, options)
          .map(res => res.json());
  } 

  private getDonationUrl(id){
    return this.donationsUrl + "/" + id;
  }

  getTypes(type){
    return this.http.get(this.donationsUrl + '/type/' + type)
      .map(res => res.json());
  }
}
