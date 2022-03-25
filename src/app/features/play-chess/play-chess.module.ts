import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './play-chess.page';

import { Tab1PageRoutingModule } from './play-chess-routing.module';

import { NgxChessBoardModule } from 'ngx-chess-board';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    NgxChessBoardModule.forRoot()
  ],
  declarations: [Tab1Page]
})


export class Tab1PageModule {}
