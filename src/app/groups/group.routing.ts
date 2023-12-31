import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowComponent } from './show/show.component';
import { JoinComponent } from './join/join.component';


export const GroupRoutes: Routes = [
  {
    path: 'groups',
    component: HomeComponent
  },
  {
    path: 'groups/:id',
    component: ShowComponent
  },
  {
    path: 'groups/:id/register',
    component: JoinComponent
  },
  
];
