import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgxChessBoardView } from 'ngx-chess-board';
import { NgxChessBoardService } from 'ngx-chess-board';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'fun-room.page.html',
  styleUrls: ['fun-room.page.scss']
})
export class Tab2Page implements OnInit{

  @Input() screenWidth: string;
  ngOnInit(): void {
    
  }

  @ViewChild('board', {static: false}) board!: NgxChessBoardView;

  reset() {
    this.board.reset();
  }


  onPieceMove() {
    console.log("Moved Piece");
  }

  constructor(private ngxChessBoardService: NgxChessBoardService, private platform: Platform) {
    this.platform.ready().then(() => {
      this.screenWidth = "" + platform.width();
    })
  }
  
}
