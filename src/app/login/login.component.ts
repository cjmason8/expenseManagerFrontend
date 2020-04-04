import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
    this.authenticateService.token = null;
    this.authenticateService.roles = null;
    this.authenticateService.authenticated = false;
  }

  loginUser() {
    this.authenticateService.loginUser(this.login)
    .subscribe(data => {
      if (data.loginStatus === 'success') {
        this.authenticateService.token = data.token;
        this.authenticateService.roles = data.roles;
        this.router.navigate(['']);
      }
    });
  }
}
