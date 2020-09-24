import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrisisMessageComponent } from './crisis/crisis-message/crisis-message.component';
import { PageNotFoundComponent } from './dashboard/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'compose', component: CrisisMessageComponent, outlet: 'popup' },

  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'crisis',
    loadChildren: () => import('./crisis/crisis.module').then(m => m.CrisisModule),
    data: { preload: true }
  },

  // Always placed last position on any route collection | including in AppModule
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false,   // <-- debugging purposes only
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
