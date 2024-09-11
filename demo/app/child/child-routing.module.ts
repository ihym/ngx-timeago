import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChildComponent } from './child.component';

const childRoutes: Routes = [
  {
    path: '',
    component: ChildComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChildRoutingModule {}
