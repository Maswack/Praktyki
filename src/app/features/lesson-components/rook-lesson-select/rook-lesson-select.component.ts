import { Component, Renderer2, ViewChild, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { NgxChessBoardService, NgxChessBoardView } from 'ngx-chess-board';;
import { StorageService } from 'src/app/shared/storage.service/storage.service'; 

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

    <div #chessPlane id="chessPlane" [style.width.px]="width" [style.top.px]="boardTop"></div>
  `,
  styleUrls: ['./rook-lesson-select.component.scss'],
})
export class RookLessonSelectComponent {

  positions = "8/8/8/8/3R4/8/8/8 w - - 0 1,7R/8/8/8/8/8/8/8 w - - 0 1,8/8/8/2P1R3/8/8/8/8 w - - 0 1,8/2P5/8/8/2R5/2P5/8/8 w - - 0 1,8/8/8/2P1R3/8/5P2/8/8 w - - 0 1,8/8/8/8/8/8/8/8 w - - 0 1";
  anwsers = "d3,d2,d1,d5,d6,d7,d8,h4,g4,f4,e4,c4,b4,a4/a8,b8,c8,d8,e8,f8,g8,h7,h6,h5,h4,h3,h2,h1/d5,f5,g5,h5,e1,e2,e3,e4,e6,e7,e8/c5,c6,a4,b4,d4,e4,f4,g4,h4/d5,f5,g5,h5,e1,e2,e3,e4,e6,e7,e8"
  fen = "8/8/8/8/3R4/8/8/8 w - - 0 1";

  actualLessonData: any;
  lesson = 0;
  boardTop = 130;
  screenWidth: string;
  tilesLeft: string;
  //jesli to nie jest number to nie dziala
  width: number;


  @ViewChild('board') board: NgxChessBoardView;
  @ViewChild('chessPlane') chessPlane: ElementRef;

  private tileListener: () => void
  

  constructor(
    private platform: Platform,
    private renderer: Renderer2, 
    private alertController: AlertController,
    private ngxChessBoardService: NgxChessBoardService,
    public element: ElementRef,
    private storageService: StorageService,
    
    ) { 
      this.platform.ready().then( () => {
        this.updateFen();
        this.updateLessonsLeft();
        
        this.screenWidth = "" + platform.width();
        this.width = platform.width();
        
      })
    }

  async ngAfterViewInit() {
    this.boardTop = 0;
    document.querySelectorAll('ion-header').forEach( child => {
      this.boardTop += child.offsetHeight;
    })

    this.setFen();
    this.setPlaneOfChess();
    this.getData();
  }

  async getData() {
    const data = await this.storageService.getData();

    this.actualLessonData = data[2];
  }

  reset() {
    this.board.reset();
  }
  updateFen() {
    this.fen = this.positions.split(',')[this.lesson];
  }
  setFen(){
    setTimeout( () => {this.board.setFEN(this.fen)}, 10);
  }
  updateLessonsLeft() {
    this.tilesLeft = this.anwsers.split('/')[this.lesson];
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

    t.style.display = "flex";
    t.style.justifyContent = "center";
    t.style.alignItems = "center";

    plane.appendChild(t);
  }

  setPlaneOfChess(){  
    const planeOfChess = this.chessPlane.nativeElement;

    for( let i =0; i < 64; i++) {
      const tile = document.createElement('div');
      tile.id = String.fromCharCode(97 + (i%8)) + (8 - Math.floor(i/8));

      this.tileListener = this.renderer.listen(tile, 'click', event => {
        if(this.lesson != 5)
          this.checkIfCorrect(event);
      })

      this.stylizeTheTile(tile, planeOfChess);
    }
  }


  checkIfCorrect(e) {
    const target = e.target;
    const id = target.id;
    
    const baseLesson = this.anwsers.split('/')[this.lesson].split(',');
    const actualLesson = this.tilesLeft.split(',');

    if(baseLesson.includes(id)) {      
      if(actualLesson.includes(id)){
        const index = actualLesson.indexOf(id);

        actualLesson.splice(index, 1);
        this.tilesLeft = actualLesson.toString();

        this.createGreenTile(target);

        if(actualLesson.length == 0) {
          this.nextLesson();
        }

      }
    } else {
      this.createRedTile(target);
    }
  }

  createGreenTile(tile) {
    const greenTile = document.createElement('div');
    const size = ((this.width / 8) - 1) + "px";

    greenTile.style.backgroundColor = "rgba(0,230,0,0.6)";
    greenTile.style.width = size;
    greenTile.style.height = size;
    greenTile.style.borderRadius = "10px";

    tile.appendChild(greenTile);
  }

  createRedTile(tile) {
    const redTile = document.createElement('div');
    const size = ((this.width / 8) - 2) + "px";

    redTile.style.backgroundColor = "rgba(230,0,0,0.6)";
    redTile.style.width = size;
    redTile.style.height = size;
    redTile.style.borderRadius = "10px";

    tile.appendChild(redTile);
  }

  async nextLesson() {
    this.lesson += 1;
    if(this.lesson == 5)
      this.theEnd();

    this.destroyEverything();
    this.updateFen();
    this.setFen();
    this.updateLessonsLeft();
  }

  destroyEverything() {
    const planeOfChess = this.chessPlane.nativeElement;
    const children = planeOfChess.children;

    for(let i =0; i < children.length; i++) {
      const child = children[i];

      if(child.children.length > 0){
        child.removeChild(child.firstChild);
      }
    }
  }

  async theEnd() {
    const alert = await this.alertController.create({
      header:"Gratulacje Mistrzuniu !!!",
      message: "Ukończyłeś cały rozdział"
    })

    await this.updateActualLessonData();
    await alert.present();
  }


  ngOnDestroy() {
    this.tileListener();
  }

  async updateActualLessonData() {
    const lessonData = this.actualLessonData;

    lessonData.isActualLessonDone = true;
    await this.storageService.updateData(lessonData, 2);
  }
  
}
