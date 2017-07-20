import { Routes, RouterModule } from '@angular/router';

import { RefDatasComponent } from './ref-datas.component';
import {RefDataFormComponent} from "./ref-data-form/ref-data-form.component";

const refDatasRoutes: Routes = [
  { path: 'refdatas/all', component: RefDatasComponent},
  { path: 'refdatas/new', component: RefDataFormComponent},
  { path: 'refdatas/:id', component: RefDataFormComponent}
];

export const refDatasRouting = RouterModule.forChild(refDatasRoutes);
