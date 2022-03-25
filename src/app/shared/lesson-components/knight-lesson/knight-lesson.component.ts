import { Component, Renderer2, ViewChild, ElementRef} from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { NgxChessBoardService, NgxChessBoardView } from 'ngx-chess-board';

@Component({
  selector: 'app-knight-lesson',
  template: `
    <ngx-chess-board #board 
    [size] = "screenWidth"
    [freeMode] = "true"
    [showLegalMoves] = "false"
    (moveChange) = "moveChange()"
    ></ngx-chess-board>
  `,
  styleUrls: ['./knight-lesson.component.scss'],
})
export class KnightLessonComponent {

  positions = "8/5p2/3p4/1p6/8/2p5/8/1N6 w - - 0 1,8/1p6/8/2p5/5p2/3pN3/6p1/8 w - - 0 1,8/6P1/2rP4/5N2/1p6/4p3/2p5/8 w - - 0 1,8/1p1p4/8/p1p1p3/P1P3r1/5PP1/5N2/8 w - - 0 1,8/8/3p1p2/1p1prp2/7p/2pN1p2/8/8 w - - 0 1";
  anwsers = "b1c3,c3b5,b5d6,d6f7/e3g2,g2f4,f4d3,d3c5,c5b7/f5e3,e3c2,c2b4,b4c6/f2g4,g4e5,e5d7,d7c5,c5b7,b7a5/d3e5,e5f3,f3h4,h4f5,f5d6,d6b5,b5c3,c3d5,d5f6";
  animationMoves = "8/5p2/3p4/1p6/8/2N5/8/8 w - - 0 1,8/5p2/3p4/1N6/8/8/8/8 w - - 0 1,8/5p2/3N4/8/8/8/8/8 w - - 0 1,8/5N2/8/8/8/8/8/8 w - - 0 1";
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
