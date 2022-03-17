import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgxChessBoardService } from 'ngx-chess-board';
import { NgxChessBoardView } from 'ngx-chess-board';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  @Input() screenWidth: number; 
  ngOnInit(): void {
  }
  
  @ViewChild('board', {static: false}) board!: NgxChessBoardView;

  reset() {
    this.board.reset();
  }

  constructor(private ngxChessBoardService: NgxChessBoardService, platform: Platform) {
    
    platform.ready().then(() => {
      this.screenWidth = platform.width();
    });

  }
  
}


