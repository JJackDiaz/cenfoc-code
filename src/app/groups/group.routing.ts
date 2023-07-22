import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowComponent } from './show/show.component';
import { JoinComponent } from './join/join.component';


export const GroupRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'show',
    component: ShowComponent
  },
  {
    path: 'join',
    component: JoinComponent
  },
  
];
