import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StronaPageRoutingModule } from './strona-routing.module';

import { StronaPage } from './strona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StronaPageRoutingModule
  ],
  declarations: [StronaPage]
})
export class StronaPageModule {}
