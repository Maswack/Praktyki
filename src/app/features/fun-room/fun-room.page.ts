import { Component, Directive, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgxChessBoardView } from 'ngx-chess-board';
import { Platform } from '@ionic/angular';
import { GameContainerComponent } from '../fun-room-components/game-dynamic-component/game-container';
import { GameItem } from '../fun-room-components/game-dynamic-component/game-item';
import { GameService } from '../fun-room-components/game-dynamic-component/game.service';

@Directive({
  selector: '[fun-room-games]'
})
@Component({
  selector: 'app-tab2',
  templateUrl: 'fun-room.page.html',
  styleUrls: ['fun-room.page.scss']
})
export class Tab2Page implements OnInit{

  @Input() screenWidth: string;

  @ViewChild(GameContainerComponent) game: GameContainerComponent;
  @ViewChild('board', {static: false}) board!: NgxChessBoardView;
  @ViewChild('container') container: ElementRef;
  @ViewChild('return', {read: ElementRef}) returnButton: ElementRef;

  reset() {
    this.board.reset();
  }


  onPieceMove() {
    console.log("Moved Piece");
  }
  constructor(
    private platform: Platform, 
    public viewContainerRef: ViewContainerRef, 
    private gameService: GameService
    ) 
    {
    this.platform.ready().then(() => {
      this.screenWidth = "" + platform.width();
    })
  }
  games: GameItem[] = [];
  async playFunRoom(index) {
    this.returnButton.nativeElement.style.display = "inline-block";
    this.container.nativeElement.style.display = "none";
    this.game.loadComponent(index)
  }
  async returnToFunRoom()
  {
    this.container.nativeElement.style.display = "block";
    const viewContainerRef = this.game.gameHost.viewContainerRef;
    viewContainerRef.clear();
    this.returnButton.nativeElement.style.display = "none";
  }
  ngOnInit(): void {
    this.games = this.gameService.getGames();
  }
  
}
