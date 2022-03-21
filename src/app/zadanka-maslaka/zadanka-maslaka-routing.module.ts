import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZadankaMaslakaPage } from './zadanka-maslaka.page';

const routes: Routes = [
  {
    path: '',
    component: ZadankaMaslakaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZadankaMaslakaPageRoutingModule {}
