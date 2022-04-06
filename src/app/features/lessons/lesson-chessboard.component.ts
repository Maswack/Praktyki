import { Component, Input } from '@angular/core';

import { LessonContainerComponent } from './lessonsContainer.component';

@Component({
  template: `
    
  `
})
export class LessonChessboardComponent extends LessonContainerComponent {
  @Input() data: any;
}
