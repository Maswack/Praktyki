import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './fun-room.page';

import { Tab2PageRoutingModule } from './fun-room-routing.module';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { GameModule } from '../fun-room-components/game-dynamic-component/game.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    NgxChessBoardModule.forRoot(),
    GameModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
