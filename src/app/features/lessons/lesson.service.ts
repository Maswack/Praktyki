import { Injectable } from '@angular/core';
import { LineSelectorNewComponent } from '../lesson-components/line-selector-new/line-selector-new.component';

import { LessonItem } from './lesson-item';
import { LineFillerNewComponent } from '../lesson-components/line-filler-new/line-filler-new.component';
import { RookLessonComponent } from '../lesson-components/rook-lesson/rook-lesson.component';
import { BishopLessonComponent } from '../lesson-components/bishop-lesson/bishop-lesson.component';
import { QueenLessonComponent } from '../lesson-components/queen-lesson/queen-lesson.component';
import { KnightLessonComponent } from '../lesson-components/knight-lesson/knight-lesson.component';

import { RookLessonSelectComponent } from '../lesson-components/rook-lesson-select/rook-lesson-select.component';
import { BishopLessonSelectComponent } from '../lesson-components/bishop-lesson-select/bishop-lesson-select.component';
import { QueenLessonSelectComponent } from '../lesson-components/queen-lesson-select/queen-lesson-select.component';
import { KnightLessonSelectComponent } from '../lesson-components/knight-lesson-select/knight-lesson-select.component';

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
        RookLessonSelectComponent,
        {}
      ),
      new LessonItem(
        RookLessonComponent,
        {}
      ),
      new LessonItem(
        BishopLessonSelectComponent,
        {}
      ),
      new LessonItem(
        BishopLessonComponent,
        {}
      ),
      new LessonItem(
        QueenLessonSelectComponent,
        {}
      ),
      new LessonItem(
        QueenLessonComponent,
        {}
      ),
      new LessonItem(
        KnightLessonSelectComponent,
        {}
      ),
      new LessonItem(
        KnightLessonComponent,
        {}
      )
      
    ];
  }
}