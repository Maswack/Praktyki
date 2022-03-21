import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-line-filling',
  templateUrl: './line-filling.page.html',
  styleUrls: ['./line-filling.page.scss'],
})
export class LineFillingPage implements OnInit {

  ids = [21, 23, 24, 26, 28];
  idsToClick = [22, 25, 27];
  animationStarted = false;

  @Input() timer : any;
  ngOnInit(): void {
    this.makeChess();
    this.makeGreen();
    this.createFinger(0);
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
  async makeGreen()
  {
    for(let i=0; i<this.ids.length; i++)
    {
      const greenTile = document.createElement("div");
      greenTile.className = "greenTile";
      greenTile.style.background = "#0F0";
      greenTile.style.opacity = "0.5";
      let tileWidth = parseInt(document.getElementById("11").style.width);
      greenTile.style.width = ((tileWidth - 4).toString())+"px";
      greenTile.style.height = ((tileWidth - 4).toString())+"px";
      greenTile.style.margin = "auto";
      greenTile.style.borderRadius = "5px";
      greenTile.style.marginTop = "2px";

      document.getElementById(this.ids[i].toString()).appendChild(greenTile);
    }
  }
  async createFinger(i)
  {
    setTimeout(() => {
    if(i>0) document.getElementById((this.idsToClick[i-1]).toString()).removeChild(document.getElementById((this.idsToClick[i-1]).toString()).firstChild);
    const fingerAnimation = document.createElement("img");
    fingerAnimation.id = "fingerAnimation";
    fingerAnimation.src = "../../assets/clickingFinger.png";
    fingerAnimation.style.width = "38px";

    document.getElementById((this.idsToClick[i]).toString()).appendChild(fingerAnimation);
    if(!this.animationStarted) {this.timer = setInterval(this.fingerPress, 50); this.animationStarted = true;}
    if(i<this.idsToClick.length-1) this.createFinger(i+1);
    else setTimeout(() => {document.getElementById((this.idsToClick[i]).toString()).removeChild(document.getElementById((this.idsToClick[i]).toString()).firstChild)}, 500)
    }, 500)
    
  }
  async fingerPress()
  {
    const node = document.getElementById("fingerAnimation");
    if(!node) {clearInterval(this.timer); this.animationStarted = false;}
    else
    {
      console.log(node.style.width);
      node.style.width = (parseInt(node.style.width) - 0.5).toString() + "px";
    }
  }

  constructor() {}
}
