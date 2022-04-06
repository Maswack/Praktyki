import { Component, Renderer2, ViewChild, ElementRef} from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { NgxChessBoardService, NgxChessBoardView } from 'ngx-chess-board';
import { StorageService } from 'src/app/shared/storage.service/storage.service';

@Component({
  selector: 'app-queen-lesson',
  template: `
    <ngx-chess-board #board 
    [size] = "screenWidth"
    [freeMode] = "true"
    [showLegalMoves] = "false"
    (moveChange) = "moveChange()"
    ></ngx-chess-board>
  `,
  styleUrls: ['./queen-lesson.component.scss'],
})
export class QueenLessonComponent {

  positions = "4p3/8/2p5/8/8/2Q5/p3p3/8 w - - 0 1,6p1/p1p5/8/4Q3/5p2/8/p7/8 w - - 0 1,8/6p1/1p2p3/8/8/2pQ1p2/p7/6p1 w - - 0 1,5p2/8/1p3P1p/6P1/8/4Q3/1p5p/8 w - - 0 1,8/3p3p/3P4/8/p2P1p2/3Q4/p4p2/8 w - - 0 1";
  anwsers = "c3c6,c6e8,e8e2,e2a2/e5f4,f4c7,c7a7,a7a2,a2g8/d3f3,f3c3,c3g7,g7g1,g1b6,b6e6,e6a2/e3b6,b6b2,b2h2,h2h6,h6f8/d3h7,h7d7,d7a4,a4a2,a2f2,f2f4";
  animationMoves = "4p3/8/2Q5/8/8/8/p3p3/8 w - - 0 1,4Q3/8/8/8/8/8/p3p3/8 w - - 0 1,8/8/8/8/8/8/p3Q3/8 w - - 0 1,8/8/8/8/8/8/Q7/8 w - - 0 1";
  lesson = 0;
  isNotAnimation = false;
  moveIndex = 0;
  screenWidth: string;
  fen: string;
  actualLessonData: any;
  

  constructor(
    private platform: Platform,
    private renderer: Renderer2, 
    private alertController: AlertController,
    private ngxChessBoardService: NgxChessBoardService,
    public element: ElementRef,
    private storageService: StorageService,
    
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

  ngAfterViewInit() {
    this.getData();
  }

  @ViewChild('board') board: NgxChessBoardView;
  async getData() {
    const data = await this.storageService.getData();

    this.actualLessonData = data[2];
  }

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
    await this.updateActualLessonData();
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

  async updateActualLessonData() {
    const lessonData = this.actualLessonData;

    lessonData.isActualLessonDone = true;
    await this.storageService.updateData(lessonData, 2);
  }

}
