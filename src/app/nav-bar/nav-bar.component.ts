import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { AuthenticateService } from '../shared/authenticate.service';

import { HttpInterceptor } from "../shared/http.interceptor"

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: []
})
export class NavBarComponent implements OnInit {
  loggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private _cookieService:CookieService, private authenticateService:AuthenticateService,
    private httpInterceptor: HttpInterceptor) { }

  ngOnInit() {
     var roles = this._cookieService.get('roles');
     if (roles) {
       if (roles.length > 0) {
         this.loggedIn = true;
       }
       if (roles.indexOf('ADMIN') != -1) {
         this.isAdmin = true;
       }
     }
     else {
       console.log('NO ROLES!!!!');
     }
  }

  isAuthenticated() {
    return this.authenticateService.authenticated === true;
  }

  getUserGreeting() {
    if (this.authenticateService.user) {
      return "Hi " + this.authenticateService.user[0].toLocaleUpperCase() + this.authenticateService.user.substring(1);
    }

    return "";
  }

  getErrorMessage() {
    if (this.httpInterceptor.errorMessage) {
      window.scrollTo(0, 0);
      return "There was an Error!!! Contact Chris(Muscles)";
    }
  }  

}
