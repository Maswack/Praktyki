import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LineSelectorPageRoutingModule } from './line-selector-routing.module';

import { LineSelectorPage } from './line-selector.page';

import { ChessboardComponent } from '../chessboard/chessboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LineSelectorPageRoutingModule,
  ],
  declarations: [LineSelectorPage, ChessboardComponent]
})
export class LineSelectorPageModule {}
