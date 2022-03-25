import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { LessonService } from './lesson.service';
import { LessonContainerComponent } from './lessonsContainer.component';
import { LessonDirective } from './lesson.directive';
import { LessonChessboardComponent } from './lesson-chessboard.component';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { ChessboardComponentComponent } from '../lesson-components/chessboard-component/chessboard-component.component';

import { RookLessonComponent } from '../lesson-components/rook-lesson/rook-lesson.component';
import { BishopLessonComponent } from '../lesson-components/bishop-lesson/bishop-lesson.component';
import { QueenLessonComponent } from '../lesson-components/queen-lesson/queen-lesson.component';
import { KnightLessonComponent } from '../lesson-components/knight-lesson/knight-lesson.component';

import { RookLessonSelectComponent } from '../lesson-components/rook-lesson-select/rook-lesson-select.component';
import { BishopLessonSelectComponent } from '../lesson-components/bishop-lesson-select/bishop-lesson-select.component';
import { QueenLessonSelectComponent } from '../lesson-components/queen-lesson-select/queen-lesson-select.component';
import { KnightLessonSelectComponent } from '../lesson-components/knight-lesson-select/knight-lesson-select.component';

@NgModule({
  imports: [
    IonicModule,
    NgxChessBoardModule.forRoot(),
  ],
  exports: [
    LessonContainerComponent,
  ],
  providers: [ LessonService ],
  declarations: [
    LessonContainerComponent,
    LessonChessboardComponent,
    LessonDirective,
    BishopLessonComponent,
    RookLessonComponent,
    QueenLessonComponent,
    KnightLessonComponent,
    
    
    RookLessonSelectComponent,
    BishopLessonSelectComponent,
    QueenLessonSelectComponent,
    KnightLessonSelectComponent
  ],
})

export class LessonModule { }