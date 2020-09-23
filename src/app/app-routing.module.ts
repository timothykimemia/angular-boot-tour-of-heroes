import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { PageNotFoundComponent } from './dashboard/page-not-found/page-not-found.component';
import {CrisisMessageComponent} from './crisis/crisis-message/crisis-message.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'compose', component: CrisisMessageComponent, outlet: 'popup' },

  // Always placed last position on any route collection | including in AppModule
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: false } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
