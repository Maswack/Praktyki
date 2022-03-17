import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StronaPage } from './strona.page';

const routes: Routes = [
  {
    path: '',
    component: StronaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StronaPageRoutingModule {}
