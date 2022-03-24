import { Component, Renderer2, ViewChild, ElementRef} from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { NgxChessBoardService, NgxChessBoardView } from 'ngx-chess-board';

@Component({
  selector: 'app-rook-lesson',
  template: `
    <ngx-chess-board #board 
    [size] = "screenWidth"
    [freeMode] = "true"
    [showLegalMoves] = "false"
    (moveChange) = "moveChange()"
    ></ngx-chess-board>
  `,
  styleUrls: ['./rook-lesson.component.scss'],
})
export class RookLessonComponent {

  positions = "8/1p4p1/8/8/1p2R3/8/8/8 w - - 0 1,8/1p4p1/8/8/3p2p1/3R4/3p4/8 w - - 0 1,8/1p1p4/8/3p2pp/8/2p1R1p1/8/8 w - - 0 1,8/3p3p/p4p2/3p4/p6p/3R4/8/8 w - - 0 1,8/3p3p/1p2p3/8/1p5p/4R3/4p3/8 w - - 0 1";
  anwsers = "e4b4,b4b7,b7g7/d3d2,d2d4,d4g4,g4g7,g7b7/e3c3,c3g3,g3g5,g5h5,h5d5,d5d7,d7b7/d3d5,d5d7,d7h7,h7h4,h4a4,a4a6,a6f6/e3e2,e2e6,e6b6,b6b4,b4h4,h4h7,h7d7";
  animationMoves = "8/1p4p1/8/8/1R6/8/8/8 w - - 0 1,8/1R4p1/8/8/8/8/8/8 w - - 0 1,8/6R1/8/8/8/8/8/8 w - - 0 1";
  lesson = 0;
  isNotAnimation = false;
  moveIndex = 0;
  screenWidth: string;
  fen: string;
  

  constructor(
    private platform: Platform,
    private renderer: Renderer2, 
    private alertController: AlertController,
    private ngxChessBoardService: NgxChessBoardService,
    public element: ElementRef
    
    ) {
    this.platform.ready().then(() => {
      this.screenWidth = "" + platform.width();
      
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
