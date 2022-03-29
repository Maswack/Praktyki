import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { NgxChessBoardService } from 'ngx-chess-board';
import { NgxChessBoardView } from 'ngx-chess-board';
import { StorageService } from '../../../shared/storage.service/storage.service';

@Component({
  selector: 'app-mate',
  template: `
  <ngx-chess-board #board id="chessboardMate"
    [darkDisabled] = "true"
    [lightDisabled] = "true"
    [size] = "screenWidth"
  ></ngx-chess-board>
  `,
  styleUrls: ['./mate.component.scss'],
})
export class MateComponent {

  screenWidth: number;

  constructor(
    private storageService: StorageService,
    private renderer: Renderer2, 
    private element: ElementRef, 
    public alertController: AlertController,
    private ngxChessBoardService: NgxChessBoardService,
    platform: Platform
  ) { 
    platform.ready().then( () => {
      this.screenWidth = platform.width();
    });

  }

  @ViewChild('board') board: NgxChessBoardView;
  @ViewChild('board', {read: ElementRef}) chessboard: ElementRef;

  reset() {
    this.board.reset();
  }
  ngAfterViewInit()
  {
  }
  movePiece(move) {
    this.board.move(move);
  }
  undoMove() {
    setTimeout(() => {
      this.board.undo();
    }, 200)
  }
}
