import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [CookieService]
})
export class NavBarComponent implements OnInit {
  loggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private _cookieService:CookieService) { }

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

}
