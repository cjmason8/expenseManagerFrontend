import { Routes, RouterModule } from '@angular/router';

import {LoginFormComponent} from "./login.component";

const loginRoutes: Routes = [
  { path: 'login', component: LoginFormComponent, pathMatch: 'full' }
];

export const loginRouting = RouterModule.forChild(loginRoutes);
