import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Input } from '@angular/core';

import { NgxChessBoardView } from 'ngx-chess-board';
import { NgxChessBoardService } from 'ngx-chess-board';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-zadanka-maslaka',
  templateUrl: './zadanka-maslaka.page.html',
  styleUrls: ['./zadanka-maslaka.page.scss'],
})
export class ZadankaMaslakaPage {

  @Input() screenWidth: string;
  @Input() allPossibleSquares: string;
  @ViewChild('board', {static: false}) board!: NgxChessBoardView;

  constructor(private ngxChessBoardService: NgxChessBoardService, private platform: Platform) {
    this.platform.ready().then(() => {
        this.screenWidth = "" + platform.width();
        this.reset();
        this.allPossibleSquares = "a2,a3,a4,a5,a6,a7,a8,b1,c1,d1,e1,f1,g1,h1";
      
        document.getElementById("chessboard").style.display = "none";
    })
  }

  reset() {
    this.board.setFEN("8/8/8/8/8/8/8/R7 w - - 0 1");
  }

  sprawdzRuch() {
    const tablica = this.allPossibleSquares.split(',');
    const history = this.board.getMoveHistory();
    const ruch = history[history.length - 1].move;
    const pole = ruch[2] + ruch[3];

    if(tablica.includes(pole)) {
      const index = tablica.indexOf(pole);
      tablica.splice(index, 1);

      this.allPossibleSquares = tablica.toString();
    }
    

    
    this.reset();
  }

  rozpocznijZadanie1() {
    const szachownica = document.getElementById("chessboard");
    const przyciski = document.getElementById("przyciskiWrapper");

    szachownica.style.display = "block";
    przyciski.style.display = "none";
  }

}
