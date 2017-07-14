import { Routes, RouterModule } from '@angular/router';

import {IncomeFormComponent} from "./income-form/income-form.component";

const incomesRoutes: Routes = [
  { path: 'incomes/new', component: IncomeFormComponent},
  { path: 'incomes/:id', component: IncomeFormComponent}
];

export const incomesRouting = RouterModule.forChild(incomesRoutes);
