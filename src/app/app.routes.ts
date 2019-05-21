import {RouterModule, Routes} from '@angular/router';
import {ListDataComponent} from './components/list-data/list-data.component';
import {NewObjectComponent} from './components/new-object/new-object.component';

const AppRoutes: Routes = [
  { path: 'objetos', component: ListDataComponent},
  { path: 'objeto/:id', component:  NewObjectComponent},
  { path: '**', pathMatch: 'full', redirectTo: '/objetos' }
];

export const AppRouting = RouterModule.forRoot(AppRoutes);
