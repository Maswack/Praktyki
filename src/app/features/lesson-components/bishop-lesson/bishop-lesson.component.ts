import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgxChessBoardService, NgxChessBoardView } from 'ngx-chess-board';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bishop-lesson',
  template: `
    <ngx-chess-board #board 
    [size] = "screenWidth"
    [freeMode] = "true"
    [showLegalMoves] = "false"
    (moveChange) = "moveChange()"
    ></ngx-chess-board>
  `,
  styleUrls: ['./bishop-lesson.component.scss'],
})
export class BishopLessonComponent {

  positions = "1r6/r7/3B4/8/8/8/8/6r1 w - - 0 1,3r4/4B3/5r2/8/3r4/8/8/6r1 w - - 0 1,1r3r2/r7/7r/8/1B6/r3r3/8/6r1 w - - 0 1,3r3r/8/1r3r2/4P3/3B4/8/8/8 w - - 0 1,4r3/5P2/6r1/7r/r7/3B4/8/3r4 w - - 0 1"
  anwsers = "d6b8,b8a7,a7g1/e7d8,d8f6,f6d4,d4g1/b4a3,a3f8,f8h6,h6e3,e3g1,g1a7,a7b8/d4b6,b6d8,d8f6,f6h8/d3g6,g6h5,h5d1,d1a4,a4e8";
  animationMoves = "1B6/r7/8/8/8/8/8/6r1 w - - 0 1,8/B7/8/8/8/8/8/6r1 w - - 0 1,8/8/8/8/8/8/8/6B1 w - - 0 1";
  screenWidth: number;
  fen: string;
  isNotAnimation = false;
  lesson = 0;
  moveIndex = 0;

  constructor(
      private element: ElementRef,
      private platform: Platform, 
      private ngxChessBoardService: NgxChessBoardService,
      public renderer: Renderer2,
      private alertController: AlertController,
    ) 
  { 
    platform.ready().then( () => {
      this.screenWidth = platform.width();
      
      setTimeout(() => {
        this.setUpThePosition();
      }, 10)

      setTimeout(() => {
        this.playAnimation();
      }, 250)

    })
  }

  @ViewChild('board') board: NgxChessBoardView;

  reset() {
    this.board.reset();
  }
  setFen() {
    this.fen = this.positions.split(',')[this.lesson];
  }
  thisIsTheEnd() {
    return (this.positions.split(',').length == this.lesson);
  }
  undoMove() {
    setTimeout( () => {
      this.board.undo();
    }, 200)
  }



  setUpThePosition() {
    if(!this.thisIsTheEnd()) {
      this.setFen();
      this.moveIndex = 0;

      this.board.setFEN(this.fen);
    } else {
      this.endChapter();
    }
  }

  moveChange() {
    const correctMove =  this.anwsers.split('/')[this.lesson].split(',')[this.moveIndex];
    const madeMove = this.board.getMoveHistory()[this.board.getMoveHistory().length - 1].move;
    const length = this.anwsers.split('/')[this.lesson].split(',').length;

    if(this.isNotAnimation){

      if(correctMove == madeMove){
      this.moveIndex += 1;

      if(this.moveIndex == length){
       
        this.lesson += 1;
        this.setUpThePosition();
      }

    } else {
      this.undoMove();
    }
    }
    
  }

  async endChapter() {
    const alert = await this.alertController.create({
      header:"Gratulacje Mistrzuniu !!!",
      message: "Ukończyłeś cały rozdział"
    })

    await alert.present();
  }


  playAnimation() {
    const length = this.animationMoves.split(',').length;
    const time = 400 * (length + 1);

    const x = setInterval(() => {
      const move = this.animationMoves.split(',')[this.moveIndex];
      this.board.setFEN(move);
      this.moveIndex += 1;
      
      if(this.moveIndex == length){
        clearInterval(x);
      }
    }, 400);

    setTimeout(() => {
      this.isNotAnimation = true;
      this.setUpThePosition();
    }, time)
    
  }

}
