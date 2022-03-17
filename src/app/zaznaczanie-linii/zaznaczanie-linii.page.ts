import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-zaznaczanie-linii',
  templateUrl: './zaznaczanie-linii.page.html',
  styleUrls: ['./zaznaczanie-linii.page.scss'],
})
export class ZaznaczanieLiniiPage implements OnInit {

  ngOnInit(): void {
    this.makeChess();
  }

  async makeChess()
  {
    const board = document.querySelector("#board");
    for(let i=0; i<64; i++)
    {
      const newFile = document.createElement("div")
      newFile.style.background = ((i+Math.floor(i/8))%2 == 0)? "#BAA378" : "rgb(97, 84, 61)";
      let id = (i%8+1)*10 + (8-Math.floor(i/8));
      newFile.id = id.toString();
      newFile.style.width = "34.375px";
      newFile.style.height = "34.375px";
      newFile.style.display = "inline-block";
      board.appendChild(newFile);
    }
  }

  constructor() {}
}
