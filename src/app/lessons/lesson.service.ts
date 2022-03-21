import { Injectable } from '@angular/core';
import { LessonChessboardComponent } from './lesson-chessboard.component';
import { LineSelectorNewComponent } from '../line-selector-new/line-selector-new.component';

import { LessonItem } from './lesson-item';

@Injectable()
export class LessonService {
  getLessons() {
    return [
      new LessonItem(
        LineSelectorNewComponent,
        {}
      ),
      new LessonItem(
        LessonChessboardComponent,
        { name: 'Lekcja2', desc: 'Uzupełnianie linii' }
      )
    ];
  }
}