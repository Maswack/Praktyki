import { Component, Input } from '@angular/core';

import { LessonContainerComponent } from './lessonsContainer.component';

@Component({
  template: `
    <div class="hero-profile">
      <h3>Lekcja</h3>
      <h4>{{data.name}}</h4>

      <p>{{data.desc}}</p>
    </div>
  `
})
export class LessonChessboardComponent extends LessonContainerComponent {
  @Input() data: any;
}
