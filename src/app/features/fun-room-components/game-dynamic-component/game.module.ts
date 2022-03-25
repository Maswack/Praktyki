import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { GameService } from './game.service';
import { GameContainerComponent } from './game-container';
import { GameDirective } from './game.directive';
import { EaterComponent } from '../eater/eater.component';
import { NgxChessBoardModule } from 'ngx-chess-board';

@NgModule({
  imports: [
    IonicModule,
    NgxChessBoardModule.forRoot()
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