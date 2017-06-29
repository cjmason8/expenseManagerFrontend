import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { ExpensesService } from '../expenses/shared/expenses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CookieService]
})
export class HomeComponent implements OnInit {
  constructor(private _cookieService:CookieService,
    private expensesService: ExpensesService) { }

  ngOnInit() {
    this.expensesService.authenticate(this._cookieService.get('token'));
  }
}
