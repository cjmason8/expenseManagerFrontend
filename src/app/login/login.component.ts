import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { AuthenticateService } from '../shared/authenticate.service';

import { Login } from './shared/login';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;
  title: string;
  login: Login = new Login();

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _cookieService:CookieService,
    private authenticateService:AuthenticateService
  ) {
    this.form = formBuilder.group({
      userName: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit() {
    this._cookieService.put('token', null);
    this._cookieService.put('roles', null);
    this.authenticateService.authenticated = false;
  }

  loginUser() {
    this.authenticateService.loginUser(this.login)
    .subscribe(data => {
      if (data.loginStatus === 'success') {
        this._cookieService.put('token', data.token);
        this._cookieService.put('roles', data.roles);
        this.router.navigate(['']);
      }
    });
  }
}
