import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { GameService } from './game.service';
import { GameContainerComponent } from './game-container';
import { GameDirective } from './game.directive';
import { EaterComponent } from '../eater/eater.component';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    IonicModule,
    NgxChessBoardModule.forRoot(),
    HttpClientModule
  ],
  exports: [
    GameContainerComponent
  ],
  providers: [ GameService ],
  declarations: [
    GameContainerComponent,
    EaterComponent,
    GameDirective
  ],
})

export class GameModule { }