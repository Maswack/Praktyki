import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-line-selector',
  templateUrl: './line-selector.page.html',
  styleUrls: ['./line-selector.page.scss'],
})
export class LineSelectorPage {

  @Input() screenWidth: string;
  @Input() chessLessons: string;
  @Input() graphicSetup: string;
  @Input() actualLesson: string;
  @Input() lesson: number;



  constructor(private platform: Platform, public alertController: AlertController, public router: Router) {
    this.platform.ready().then(() => {
        this.screenWidth = "" + platform.width();
        this.chessLessons = "a1,a2,a3,a4,a5,a6,a7,a8/a7,b7,c7,d7,e7,f7,g7,h7";

        this.graphicSetup = "276px,34.5px,,top/34.5px,276px,97.5px,right";
        this.lesson = Math.floor(Math.random() * (1 + 1));

        const chessboard = document.getElementById("chessBoardComponent")
        chessboard.style.display="flex";
        chessboard.style.flexWrap="wrap";
        chessboard.style.flexDirection="column";

        this.createChessboard(chessboard)
    })
  }

  async createChessboard(chessboard) {
    const arrayOfTiles = chessboard.children;

    for(let i =0; i < 64; i++){
      let index1 = String.fromCharCode(Math.floor(i/8) + 97);
      let index2 = 9 - ((i%8) + 1);

      const size = parseInt(this.screenWidth) / 8;

      //tile.style.backgroundColor = ( (i + Math.floor(i/8)) % 2 == 0) ? "#BAA378" : "rgb(97, 84, 61)" ;

      arrayOfTiles[i].id = index1+index2;
      arrayOfTiles[i].addEventListener('click', (e) => this.checkIfCorrect(e))
    }

    const setupArray = this.graphicSetup.split("/")[this.lesson].split(",");
    this.actualLesson = this.chessLessons.split("/")[this.lesson];

    this.createShitLine(setupArray[0], setupArray[1], setupArray[2], setupArray[3]);
  }





  createShitLine(height, width, top, orientation ) {
    const chessboard = document.getElementById("chessboard");
    const line = document.createElement("div");

    line.style.width = width;
    line.style.height = height;
    line.style.top = top;
    line.style.position = "absolute";
    line.style.overflow = "hidden";
    line.style.pointerEvents = "none";

    chessboard.append(line)

    for(let i =0; i<8; i++){
      const tile = document.createElement('ion-icon');

      if(orientation == "top")
        tile.name = "ellipsis-vertical-outline";
      else if(orientation == "right")
        tile.name = "ellipsis-horizontal-outline";

      tile.style.width = "34.5px";
      tile.style.height = "34.5px";

      tile.style.pointerEvents = "none";

      line.append(tile)
    }
  }


  async checkIfCorrect(e) {
    const clickedTile = e.target.id;
    const resultsArray = this.actualLesson.split(',');
    

    if(resultsArray.includes(clickedTile)){
      const index = resultsArray.indexOf(clickedTile);
      resultsArray.splice(index,1);

      this.selectCorrectTile(e.target);
    }

    this.actualLesson = resultsArray.toString();
    if(this.actualLesson == ""){
      this.handleTheEndOfLesson();
    }

  }

  selectCorrectTile(target) {
    const greenTile = document.createElement("div");

    greenTile.style.width = "31.5px";
    greenTile.style.height = "31.5px";
    greenTile.style.borderRadius = "10px";
    greenTile.style.backgroundColor = "rgba(0,230,0, 0.6)";

    target.appendChild(greenTile);
    
  }

  async handleTheEndOfLesson() {
    const alert = await this.alertController.create({
      header:"Brawo !!!",
      message: "Udało ci Się rozwiązać Lekcje",
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.router.navigate(['']);
          }
        }
      ]
    })

    await alert.present();
  }


}
