import { Injectable } from '@angular/core';
//import { LessonChessboardComponent } from './lesson-chessboard.component';
import { LineSelectorNewComponent } from '../lesson-components/line-selector-new/line-selector-new.component';

import { LessonItem } from './lesson-item';
import { LineFillerNewComponent } from '../lesson-components/line-filler-new/line-filler-new.component';
import { RookLessonComponent } from '../lesson-components/rook-lesson/rook-lesson.component';
import { BishopLessonComponent } from '../lesson-components/bishop-lesson/bishop-lesson.component';
import { QueenLessonComponent } from '../lesson-components/queen-lesson/queen-lesson.component';

@Injectable()
export class LessonService {
  getLessons() {
    return [
      new LessonItem(
        LineSelectorNewComponent,
        {}
      ),
      new LessonItem(
        LineFillerNewComponent,
        { name: 'Lekcja2', desc: 'Uzupełnianie linii' }
      ),
      new LessonItem(
        RookLessonComponent,
        {}
      ),
      new LessonItem(
        BishopLessonComponent,
        {}
      ),
      new LessonItem(
        QueenLessonComponent,
        {}
      )
    ];
  }
}