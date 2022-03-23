import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './fun-room.page';

import { Tab2PageRoutingModule } from './fun-room-routing.module';
import { NgxChessBoardModule } from 'ngx-chess-board';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    NgxChessBoardModule.forRoot()
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
