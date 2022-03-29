import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { NgxChessBoardService } from 'ngx-chess-board';
import { NgxChessBoardView } from 'ngx-chess-board';
import { StorageService } from '../../../shared/storage.service/storage.service';

@Component({
  selector: 'app-Eater',
  templateUrl: 'eater.component.html',
  styleUrls: ['./eater.component.scss'],
})
export class EaterComponent{

    screenWidth: number;
  stats = {
    clickedRight: 0,
    clickedWrong: 0,
    completed: 0,
    highScore: 0
  }
  fen = [
    "1r1q1rk1/pb2ppbp/2B2np1/8/4p2P/2N1B3/PPPQ1PP1/2KR3R w - - 1 13",
    "r1bqkbr1/pp3p1p/2p5/4n3/5B2/8/PPPQ1PPP/R3KB1R w KQq - 0 11",
    "r2k2r1/1p1b1p1p/2p4b/4B3/5P2/p5P1/PPP3BP/1K1R3R b - - 1 17",
    "8/1p3pRp/2p1k3/2r5/5P2/8/P1P4P/1K6 w - - 4 27",
    "1k1rr3/pp4p1/1bpNn2p/5b2/1PB5/2P2PB1/P5PP/3RK2R w K - 2 19",
    "r2k1r2/pppbb3/2n2n1p/3N2p1/5B2/5P1B/PPP2P1P/2KR3R w - - 0 14",
    "r1bqr1k1/pp1n1ppp/5n2/1Bp3N1/1b1PpB2/2N1P3/PPPQ2PP/2KR3R w - - 4 12",
    "r3k2r/p1p3p1/1pnbq2p/3N2Bb/2P1n1P1/3B1N1P/PP2QP2/R3K2R w KQkq - 0 14",
    "r4r2/pp2ppkp/6p1/3q1b2/6P1/5P2/PPPQ3P/2KR1B1R b - - 0 14",
    "2r3k1/pp1R3p/5qpQ/8/6b1/5P2/PPP4P/2K2BR1 b - - 1 19",
    "2q1k3/N1P1p3/B2p1pp1/6B1/8/1p6/P1P2PPK/4R3 b - - 0 23",
    "2Q1k3/N3p3/q2p1pp1/6B1/8/1p6/P1P2PPK/4R3 b - - 0 24",
    "8/8/2kpR1p1/4B3/8/P5K1/q4PP1/8 b - - 6 33",
    "2r2rk1/3p1p1p/6p1/3N4/6Q1/PP6/3KB1q1/2R5 b - - 3 25",
    "3r4/2RB2kN/1P6/6p1/8/1r6/3K4/8 b - - 0 33"
];
  correctPieces = [
    [1, 4, 5, 13],
    [2, 11],
    [10, 12, 14],
    [1, 3],
    [2, 4, 9, 11],
    [5, 6, 7, 9, 12],
    [7, 8, 10, 13, 17],
    [4, 6, 10, 13, 15],
    [11, 12, 13, 15, 16],
    [4, 10, 12, 13],
    [3, 5, 9, 11, 12],
    [0],
    [2, 5, 8],
    [7, 8, 12, 14],
    [2, 4, 5]]
  level = Math.floor(Math.random()*this.fen.length);
  completedLevels = [];
  goodAnswers = 0;
  minutesRemaining = 1;
  secondsRemaining = "00";
  interval : any;
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
      }
    
  @ViewChild('board') board: NgxChessBoardView;
  @ViewChild('board', {read: ElementRef}) chessboard: ElementRef;
  @ViewChild('howToPlay', {read: ElementRef}) howToPlay: ElementRef;
  @ViewChild('timer', {read: ElementRef}) timer: ElementRef;
  @ViewChild('endScreenScoreboard', {read: ElementRef}) endScreenScoreboard: ElementRef;

  reset() {
    this.board.reset();
  }

  async startEater()
  {
    this.howToPlay.nativeElement.style.display = "none";
    this.board.setFEN(this.fen[this.level]);
    let colorMove = '';
    for(let i=0; !colorMove; i++)
    {
      if(this.fen[this.level][this.fen[this.level].length-1-i] == 'w') colorMove = 'w'
      if(this.fen[this.level][this.fen[this.level].length-1-i] == 'b') colorMove = 'b'
      if(i == 20) break;
    }
    if(colorMove == 'b') this.board.reverse();
    if(!this.interval) this.interval = setInterval(() => {
      if(!parseInt(this.secondsRemaining) && !this.minutesRemaining) {clearInterval(this.interval); this.outOfTime();}
      else if(parseInt(this.secondsRemaining)) {
        const secondsRemainingInt = parseInt(this.secondsRemaining)-1
        this.secondsRemaining = (secondsRemainingInt > 9)? secondsRemainingInt.toString() : "0"+secondsRemainingInt.toString();}
      else {this.minutesRemaining--; this.secondsRemaining="59"}
    }, 1000)

    setTimeout(() => {
    const chessboardChildren = this.chessboard.nativeElement.children[0].children[0].children;
    let pieces = [];
    for(let i=0; i<chessboardChildren.length; i++)
    {
      if(chessboardChildren[i].className == "cdk-drag single-piece") pieces.push(chessboardChildren[i])
    }
    for(let i=0; i<pieces.length; i++)
    {
      this.renderer.setAttribute(pieces[i], "id", i.toString());
      this.renderer.listen(pieces[i],"click", ()=>{this.pieceClicked(pieces[i])})
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
      this.renderer.setAttribute(pieceNode, "style", "font-family: 'FreeSerif'; background-color: rgba(0, 255, 0, 0.7); transform: "+clickedPiecePosition+"; max-height: 34.375px; font-size: 27.5px; width: 34.375px; height: 34.375px; pointerevents: none;")
      this.goodAnswers++;
      this.stats.clickedRight++;

      if(this.goodAnswers == this.correctPieces[this.level].length && this.completedLevels.length < this.fen.length-1)
      {
        this.stats.completed++;

        this.completedLevels.push(this.level)
        while(true)
        {
          this.level = Math.floor(Math.random()*this.fen.length);
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
      this.renderer.setAttribute(pieceNode, "style", "font-family: 'FreeSerif'; background-color: rgba(255, 0, 0, 0.7); transform: "+clickedPiecePosition+"; max-height: 34.375px; font-size: 27.5px; width: 34.375px; height: 34.375px; pointerevents: none;")
    }
  }
  outOfTime()
  {
    this.updateDatabase();
    this.endScreenScoreboard.nativeElement.style.display = "block";
  }
  async updateDatabase()
  {
    const data = await this.storageService.getData();
    const funRoomData = data[0];
    funRoomData.eater.clickedRight+= this.stats.clickedRight;
    funRoomData.eater.clickedWrong+= this.stats.clickedWrong;
    funRoomData.eater.completed+= this.stats.completed;
    if(this.stats.clickedRight > funRoomData.eater.highScore) funRoomData.eater.highScore= this.stats.clickedRight;
    this.stats.highScore = funRoomData.eater.highScore;
    this.storageService.updateData(funRoomData, 0)
  }
}