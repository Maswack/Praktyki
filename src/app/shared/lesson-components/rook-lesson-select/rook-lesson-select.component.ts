import { Component, Renderer2, ViewChild, ElementRef} from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { NgxChessBoardService, NgxChessBoardView } from 'ngx-chess-board';;
import { ChessboardComponentComponent } from '../chessboard-component/chessboard-component.component';

@Component({
  selector: 'app-rook-lesson-select',
  template: `
    <ngx-chess-board #board 
    [size] = "screenWidth"
    [freeMode] = "true"
    [showLegalMoves] = "false"
    (moveChange) = "moveChange()"
    >
    </ngx-chess-board>

    <div #chessPlane id="chessPlane" [style.width.px]="width"></div>
  `,
  styleUrls: ['./rook-lesson-select.component.scss'],
})
export class RookLessonSelectComponent {

  lesson = 0;
  screenWidth: string;
  //jesli to nie jest number to nie dziala
  width: number;
  fen: string;

  constructor(
    private platform: Platform,
    private renderer: Renderer2, 
    private alertController: AlertController,
    private ngxChessBoardService: NgxChessBoardService,
    public element: ElementRef
    
    ) { 
      this.platform.ready().then( () => {
        this.screenWidth = "" + platform.width();
        this.width = platform.width();
        

        setTimeout( ()=> {
          this.setFen();
          this.setPlaneOfChess();
          console.log(document.querySelectorAll('ion-header')[0]);
        }, 10);
      })
    }

  @ViewChild('board') board: NgxChessBoardView;
  @ViewChild('chessPlane') chessPlane: ElementRef;

  reset() {
    this.board.reset();
  }

  setFen(){
    this.fen = "";
  }

  moveChange() {
    setTimeout( () => {
      this.board.undo();
    }, 200)
  }

  stylizeTheTile(t, plane) {
    const size = (parseInt(this.screenWidth)/8); 

    t.style.width = size + "px";
    t.style.height = size + "px";

    t.style.backgroundColor = "red";
    t.style.display = "inline-block"

    plane.appendChild(t);
  }

  setPlaneOfChess(){  
    const planeOfChess = this.chessPlane.nativeElement;

    for( let i =0; i < 64; i++) {
      const tile = document.createElement('div');

      this.stylizeTheTile(tile, planeOfChess);
    }
  }
  
}
