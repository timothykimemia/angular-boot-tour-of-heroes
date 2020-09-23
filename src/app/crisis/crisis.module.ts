import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CrisisRoutingModule } from './crisis-routing.module';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { CrisisHomeComponent } from './crisis-home/crisis-home.component';
import { CrisisCenterComponent } from './crisis-center/crisis-center.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CrisisMessageComponent } from './crisis-message/crisis-message.component';

@NgModule({
  declarations: [
    CrisisListComponent,
    CrisisHomeComponent,
    CrisisCenterComponent,
    CrisisDetailComponent,
    CrisisMessageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CrisisRoutingModule
  ]
})
export class CrisisModule { }
