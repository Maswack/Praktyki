import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { NgxChessBoardService } from 'ngx-chess-board';
import { NgxChessBoardView } from 'ngx-chess-board';
import { StorageService } from '../../../shared/storage.service/storage.service';

@Component({
  selector: 'app-Eater',
  template: `
  <div id="howToPlay" #howToPlay>Znajdź wszystkie legalne bicia w pozycji, przejdź do następnych przykładów i zdobądź jak najwięcej punktów. Udanej zabawy!</div>
  <ngx-chess-board #board id="chessboardEater"
  [darkDisabled] = "true"
  [lightDisabled] = "true"
  [size] = "screenWidth"
></ngx-chess-board>
<ion-button (click)='startEater()'>Start!</ion-button>`,
  styleUrls: ['./eater.component.scss'],
})
export class EaterComponent{

    screenWidth: number;
  stats = {
    clickedRight: 0,
    clickedWrong: 0,
    timeSpent: 0,
    completed: 0
  }
  fen = [
    "1r1q1rk1/pb2ppbp/2B2np1/8/4p2P/2N1B3/PPPQ1PP1/2KR3R w - - 1 13",
    "r1bqkbr1/pp3p1p/2p5/4n3/5B2/8/PPPQ1PPP/R3KB1R w KQq - 0 11",
    "r2k2r1/1p1b1p1p/2p4b/4B3/5P2/p5P1/PPP3BP/1K1R3R b - - 1 17",
    "8/1p3pRp/2p1k3/2r5/5P2/8/P1P4P/1K6 w - - 4 27"
];
  correctPieces = [
    [1, 4, 5, 13],
    [2, 11],
    [4, 7, 11],
    [1, 3]]
  level = Math.floor(Math.random()*4);
  completedLevels = [];
  goodAnswers = 0;
  constructor(
      private storageService: StorageService,
      private renderer: Renderer2, 
      private element: ElementRef, 
      public alertController: AlertController,
      private ngxChessBoardService: NgxChessBoardService,
      platform: Platform) {
        platform.ready().then(() => {
          this.screenWidth = platform.width();
        });
      this.getStatistics();
      }
    async getStatistics()
    {
      const data = await this.storageService.getData();
      this.stats = data[0].eater;
    }
    
  @ViewChild('board') board: NgxChessBoardView;
  @ViewChild('board', {read: ElementRef}) chessboard: ElementRef;
  @ViewChild('howToPlay', {read: ElementRef}) howToPlay: ElementRef;

  reset() {
    this.board.reset();
  }

  async updateDatabase()
  {
    const data = await this.storageService.getData();
    const funRoomData = data[0];
    funRoomData.eater = this.stats;
    this.storageService.updateData(funRoomData, 0)
  }

  async startEater()
  {
    this.howToPlay.nativeElement.style.display = "none";
    this.board.setFEN(this.fen[this.level]);
    setTimeout(() => {
    const chessboardChildren = this.chessboard.nativeElement.children[0].children[0].children;
    let pieces = [];
    for(let i=0; i<chessboardChildren.length; i++)
    {
      if(chessboardChildren[i].className == "cdk-drag single-piece") pieces.push(chessboardChildren[i])
      this.renderer.setAttribute(chessboardChildren[i], "id", i.toString());
      this.renderer.listen(chessboardChildren[i],"click", ()=>{this.pieceClicked(chessboardChildren[i])})
    }}, 100)
  }

  async pieceClicked(pieceNode){
    let mistake = true;
    for(let i=0; i<this.correctPieces[this.level].length; i++)
    {
      if(pieceNode.id == this.correctPieces[this.level][i]) mistake = false;
    }
    if(!mistake)
    {
      const clickedPiecePosition = pieceNode.style.transform;
      this.renderer.setAttribute(pieceNode, "style", "background-color: rgba(0, 255, 0, 0.7); transform: "+clickedPiecePosition+"; max-height: 34.375px; font-size: 27.5px; width: 34.375px; height: 34.375px; pointerevents: none;")
      this.goodAnswers++;
      this.stats.clickedRight++;

      if(this.goodAnswers == this.correctPieces[this.level].length && this.completedLevels.length < this.fen.length-1)
      {
        this.stats.completed++;
        this.updateDatabase();

        this.completedLevels.push(this.level)
        while(true)
        {
          this.level = Math.floor(Math.random()*4);
          let good = true;
          for(let i = 0; i < this.completedLevels.length; i++)
          {
            if(this.completedLevels[i] == this.level) good = false;
          }
          if(good) break;
        }
        this.startEater();
        this.goodAnswers = 0;
      }
    }
    else
    {
      this.stats.clickedWrong++;
      const clickedPiecePosition = pieceNode.style.transform;
      this.renderer.setAttribute(pieceNode, "style", "background-color: rgba(255, 0, 0, 0.7); transform: "+clickedPiecePosition+"; max-height: 34.375px; font-size: 27.5px; width: 34.375px; height: 34.375px; pointerevents: none;")
    }
  }
}
//TODO: optymalizacja kodu, porobić wszędzie ngOnDestroy, pousuwać event listenery.
//https://medium.com/claritydesignsystem/four-ways-of-listening-to-dom-events-in-angular-part-3-renderer2-listen-14c6fe052b59