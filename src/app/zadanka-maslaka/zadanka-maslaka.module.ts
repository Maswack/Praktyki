import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZadankaMaslakaPageRoutingModule } from './zadanka-maslaka-routing.module';

import { ZadankaMaslakaPage } from './zadanka-maslaka.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZadankaMaslakaPageRoutingModule
  ],
  declarations: [ZadankaMaslakaPage]
})
export class ZadankaMaslakaPageModule {}
