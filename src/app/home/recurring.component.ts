import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../shared/authenticate.service';
import { AuthenticateComponent } from '../shared/authenticate.component';
import { HomeService } from './shared/home.service';
import {Expense} from "../expenses/shared/expense";
import {Income} from "../incomes/shared/income";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recurring',
  templateUrl: './recurring.component.html',
  styleUrls: ['./recurring.component.css'],
  providers: []
})
export class RecurringComponent extends AuthenticateComponent {

  public expenses: Expense[] = [];
  public incomes: Income[] = [];
  public includeAll: boolean = false;

  constructor(private route: ActivatedRoute,
    authenticateService: AuthenticateService, private homeService: HomeService) {
      super(authenticateService);
     }

  ngOnInit() {
    super.ngOnInit();

    this.route.params.subscribe(params => {
      this.homeService.getRecurring(this.includeAll)
        .subscribe(data => {
          this.expenses = data.expenses;
          this.incomes = data.incomes;
        });
    });
  }

  deleteExpense(expense) {
    this.homeService.deleteExpense(expense, this.expenses);
  }

  deleteIncome(income) {
    this.homeService.deleteIncome(income, this.incomes);
  }
}
