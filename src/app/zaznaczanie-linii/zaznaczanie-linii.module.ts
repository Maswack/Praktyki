import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZaznaczanieLiniiPageRoutingModule } from './zaznaczanie-linii-routing.module';

import { ZaznaczanieLiniiPage } from './zaznaczanie-linii.page';
import { NgxChessBoardModule } from 'ngx-chess-board';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZaznaczanieLiniiPageRoutingModule,
    NgxChessBoardModule.forRoot()
  ],
  declarations: [ZaznaczanieLiniiPage]
})
export class ZaznaczanieLiniiPageModule {}
