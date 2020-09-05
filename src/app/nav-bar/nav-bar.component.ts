import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../shared/authenticate.service';

import { HttpClient } from "@angular/common/http"

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: []
})
export class NavBarComponent implements OnInit {
  loggedIn: boolean = false;
  isAdmin: boolean = false;
  
  constructor(private authenticateService:AuthenticateService,
    private httpInterceptor: HttpClient) { }

  ngOnInit() {
     var roles = this.authenticateService.roles;
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
  
  hasNotifications() {
    return this.authenticateService.hasNotifications === true;
  }

  getUserGreeting() {
    if (this.authenticateService.user) {
      return "Yo " + this.authenticateService.user[0].toLocaleUpperCase() + this.authenticateService.user.substring(1);
    }

    return "";
  }

  getErrorMessage() {
    // if (this.httpInterceptor.console.error();
    // ) {
    //   window.scrollTo(0, 0);
    //   return "There was an Error!!! Contact Chris(Muscles)";
    // }
  }  

}
