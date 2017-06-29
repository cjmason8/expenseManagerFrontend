import { Routes, RouterModule } from '@angular/router';

import {LogoutComponent} from "./logout.component";

const logoutRoutes: Routes = [
  { path: 'logout', component: LogoutComponent, pathMatch: 'full' }
];

export const logoutRouting = RouterModule.forChild(logoutRoutes);
