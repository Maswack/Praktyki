import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-line-filler-new',
  template: `<div #board id="board"></div>`,
  styleUrls: ['./line-filler-new.component.scss'],
})
export class LineFillerNewComponent{

  constructor(private renderer: Renderer2, private element: ElementRef, public alertController: AlertController) {}

  @ViewChild('board') board: ElementRef;
  ids = [21, 23, 24, 26, 28];
  idsToClick = [22, 25, 27];
  animationStarted = false;
  level = 0;
  ngAfterViewInit()
  {
     this.makeChess();
     this.makeGreen();
     this.createFinger(0);
  }
  @Input() timer : any;

  async makeChess()
  {
    for(let i=0; i<64; i++)
    {
      const newTile = this.renderer.createElement("div");
      newTile.setAttribute("class", "Tile");
      let id = (i%8+1)*10 + (8-Math.floor(i/8));
      newTile.setAttribute("id", id.toString());
      this.board.nativeElement.appendChild(newTile);
      const appendedChild = document.getElementById(id.toString());
      const cname = ((i + Math.floor(i/8)) % 2 == 0) ? "whiteTile" : "blackTile";
      this.renderer.setAttribute(newTile, "class", cname)

      let timeToTimeout = 0;
      if(!this.level) timeToTimeout = 2000;
      setTimeout( () =>
      appendedChild.addEventListener("click", () => {
        let correct = -1;
        for(let i = 0; i < this.idsToClick.length; i++)
        {
          if(id == this.idsToClick[i]) correct = i;
        }
        if(correct+1) {
          const greenTile = this.renderer.createElement("div");
          greenTile.className = "greenTile";
          appendedChild.appendChild(greenTile);
          this.idsToClick.splice(correct, 1);
          if(!this.idsToClick.length) this.loadNext();
        }
        else if(!appendedChild.firstChild)
        {
          const redTile = this.renderer.createElement("div");
          redTile.className = "redTile";
          appendedChild.appendChild(redTile);
        }
      }), timeToTimeout
      )
    }
  }
  async makeGreen()
  {
    for(let i=0; i<this.ids.length; i++)
    {
      const greenTile = this.renderer.createElement("div");
      greenTile.setAttribute("class", "greenTile")
      document.getElementById(this.ids[i].toString()).appendChild(greenTile);
    }
  }
  async createFinger(i)
  {
    setTimeout(() => {
    if(this.idsToClick[i]){
      if(i>0) document.getElementById((this.idsToClick[i-1]).toString()).removeChild(document.getElementById((this.idsToClick[i-1]).toString()).firstChild);
      const fingerAnimation = this.renderer.createElement("img");
      fingerAnimation.setAttribute("id" ,"fingerAnimation");
      fingerAnimation.setAttribute("src" ,"../../assets/clickingFinger.png");
      fingerAnimation.setAttribute("style", "width: 38px;")

      document.getElementById((this.idsToClick[i]).toString()).appendChild(fingerAnimation);
      if(!this.animationStarted) {this.timer = setInterval(this.fingerPress, 50); this.animationStarted = true;}
      if(i<this.idsToClick.length-1) this.createFinger(i+1);
      else setTimeout(() => {document.getElementById((this.idsToClick[i]).toString()).removeChild(document.getElementById((this.idsToClick[i]).toString()).firstChild)}, 500)
    }}, 500)
  }
  async fingerPress()
  {
    const node = document.getElementById("fingerAnimation");
    if(!node) {clearInterval(this.timer); this.animationStarted = false;}
    else
    {
      node.style.width = (parseInt(node.style.width) - 0.5).toString() + "px";
    }
  }

  async loadNext()
  {
    if(this.level == 4) {
      const alert = await this.alertController.create({
        header:"Gratulacje Mistrzuniu !!!",
        message: "Ukończyłeś cały rozdział",
        buttons: [
          {
            text: 'meh, zbyt łatwe'
          },
          {
            text: 'LETS GOOOOOOO'
          }
        ]
      })
      await alert.present();
      return 0;
    }
    switch(this.level){
      case 0: this.ids = [27, 57, 67, 87]; this.idsToClick = [17, 37, 47, 77]; break;
      case 1: this.ids = [52, 74, 85]; this.idsToClick = [41, 63]; break;
      case 2: this.ids = [13, 31]; this.idsToClick = [22]; break;
      case 3: this.ids = [11, 33, 44, 66]; this.idsToClick = [22, 55, 77, 88]; break;
    }
    const board = document.getElementById("board");
    while(board.firstChild) 
    {
      const orphan = board.firstChild;
      board.removeChild(orphan);
    }
    
    this.level++;
    this.makeChess();
    this.makeGreen();
  }
}