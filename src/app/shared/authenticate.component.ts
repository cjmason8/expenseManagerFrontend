import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../shared/authenticate.service';


@Component({
  selector: 'authenticate',
  template: '',
  providers: []
})
export class AuthenticateComponent implements OnInit {

  constructor(
    private authenticateService:AuthenticateService
  ) {}

  ngOnInit() {
    this.authenticateService.authenticate();
  }

}