import { Injectable } from '@angular/core';
import { LessonChessboardComponent } from './lesson-chessboard.component';

import { LessonItem } from './lesson-item';

@Injectable()
export class LessonService {
  getLessons() {
    return [
      new LessonItem(
        LessonChessboardComponent,
        { name: 'Lekcja1', desc: 'Zaznacznie linii' }
      ),
      new LessonItem(
        LessonChessboardComponent,
        { name: 'Lekcja2', desc: 'Uzupełnianie linii' }
      )
    ];
  }
}