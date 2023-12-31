import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/groups',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./groups/group.module').then(m => m.GroupComponentsModule)
      },
    ]
  }
];
