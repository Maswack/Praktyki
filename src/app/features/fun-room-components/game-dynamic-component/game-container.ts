import { Component, Input, OnInit, ViewChild} from '@angular/core';

import { GameDirective } from './game.directive';
import { GameItem } from './game-item';
import { GameComponent } from './game.component';

@Component({
  selector: 'app-game',
  template: `<div>
      <ng-template gameHost></ng-template>
    </div>
  `
})
export class GameContainerComponent implements OnInit{

  constructor()
  {}

  @Input() games: GameItem[] = [];

  @ViewChild(GameDirective, {static: true}) gameHost!: GameDirective;

  ngOnInit(): void {
    
  }

  loadComponent(gameIndex) {
    const GameItem = this.games[gameIndex];

    const viewContainerRef = this.gameHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<GameComponent>(GameItem.component);
    componentRef.instance.data = GameItem.data;
  }
}