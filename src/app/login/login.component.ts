import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

import { Login } from './shared/login';
import { LoginService } from './shared/login.service';
import { BasicValidators } from '../shared/basic-validators';
import { HomeComponent } from '../home/home.component';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CookieService]
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;
  title: string;
  login: Login = new Login();

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private _cookieService:CookieService
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
  }

  loginUser() {
    var result;

    result = this.loginService.loginUser(this.login);

    result.subscribe(data => {
      if (data.loginStatus === 'success') {
        this._cookieService.put('token', data.token);
        this._cookieService.put('roles', data.roles);
        this.router.navigate(['']);
      }
    });
  }
}
