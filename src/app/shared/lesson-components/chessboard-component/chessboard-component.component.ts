import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'chessboardComponent',
  templateUrl: './chessboard-component.component.html',
  styleUrls: ['./chessboard-component.component.scss'],
})
export class ChessboardComponentComponent {
  
  constructor(private renderer: Renderer2) {

  }
}
