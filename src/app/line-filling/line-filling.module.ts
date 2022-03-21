import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LineFillingPageRoutingModule } from './line-filling-routing.module';

import { LineFillingPage } from './line-filling.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LineFillingPageRoutingModule
  ],
  declarations: [LineFillingPage]
})
export class LineFillingPageModule {}
