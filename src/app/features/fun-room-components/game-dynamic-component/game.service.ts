import { Injectable } from '@angular/core';
import { EaterComponent } from '../eater/eater.component';

import { GameItem } from './game-item';

@Injectable()
export class GameService {
  getGames() {
    return [
      new GameItem(
        EaterComponent,
        {}
      ),
      new GameItem(
        EaterComponent,
        {}
      )
    ];
  }
}