import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  ngOnInit(): void {
    this.startPuzzles();
  }
  constructor() {}
  async startPuzzles()
  {
    for(let i=0; i<64; i++)
    {
      const newFile = document.createElement("div");
      newFile.className = "file";
      ((i+Math.floor(i/8))%2 == 0)? newFile.style.background = "brown" : newFile.style.background = "white";
      newFile.style.width = "30px";
      newFile.style.height = "30px";
      newFile.style.display = "inline-block";
      document.querySelector("#board").appendChild(newFile)
    }
  }
}
