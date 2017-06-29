import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { Router } from '@angular/router';


@Component({
  selector: 'logout',
  template: '',
  providers: [CookieService]
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private _cookieService:CookieService
  ) {}

  ngOnInit() {
    this._cookieService.put('token', null);
    this._cookieService.put('roles', null);

    this.router.navigate(['']);
  }

}
