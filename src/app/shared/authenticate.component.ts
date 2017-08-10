import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../shared/authenticate.service';


@Component({
  selector: 'authenticate',
  template: '',
  providers: []
})
export class AuthenticateComponent implements OnInit {

  constructor(
    private authenticateService:AuthenticateService,
    private _cookieService:CookieService
  ) {}

  ngOnInit() {
    this.authenticateService.authenticate(this._cookieService.get('token'));
  }

}