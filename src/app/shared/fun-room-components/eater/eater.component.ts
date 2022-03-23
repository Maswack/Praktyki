import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { NgxChessBoardService } from 'ngx-chess-board';
import { NgxChessBoardView } from 'ngx-chess-board';

@Component({
  selector: 'app-Eater',
  template: `
  <ngx-chess-board #board
  [size] = "screenWidth"
></ngx-chess-board>
<ion-button (click)='startEater()'>Start!</ion-button>`,
  styleUrls: ['./eater.component.scss'],
})
export class EaterComponent{

    screenWidth: number;

  fen = "1r1q1rk1/pb2ppbp/2B2np1/8/4p2P/2N1B3/PPPQ1PP1/2KR3R w - - 1 13";

  constructor(
      private renderer: Renderer2, 
      private element: ElementRef, 
      public alertController: AlertController,
      private ngxChessBoardService: NgxChessBoardService,
      platform: Platform) {
        platform.ready().then(() => {
          this.screenWidth = platform.width();
        });}
    
  @ViewChild('board') board: NgxChessBoardView;

  reset() {
    this.board.reset();
  }
  ngAfterViewInit()
  {
  }
  startEater()
  {
    this.board.setFEN(this.fen);
  }
}
