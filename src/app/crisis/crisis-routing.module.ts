import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from '../can-deactivate.guard';
import { CrisisDetailResolverService } from './crisis-detail-resolver.service';

import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { CrisisHomeComponent } from './crisis-home/crisis-home.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CrisisCenterComponent } from './crisis-center/crisis-center.component';

const routes: Routes = [
  {
    path: 'crisis',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [ CanDeactivateGuard ],
            resolve: {
              crisis: CrisisDetailResolverService
            }
          },
          /*{
            path: '',
            component: CrisisHomeComponent
          }*/
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrisisRoutingModule { }
