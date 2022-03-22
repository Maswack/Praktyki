import { Component, Input } from '@angular/core';

import { LessonContainerComponent } from './lessonsContainer.component';

// <div>
    //   <h3>Lekcja</h3>
    //   <h4>{{data.name}}</h4>

    //   <p>{{data.desc}}</p>
    // </div>

@Component({
  template: `
    
  `
})
export class LessonChessboardComponent extends LessonContainerComponent {
  @Input() data: any;
}
