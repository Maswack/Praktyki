import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { LessonService } from './lesson.service';
import { LessonContainerComponent } from './lessonsContainer.component';
import { LessonDirective } from './lesson.directive';
import { LessonChessboardComponent } from './lesson-chessboard.component';
import { NgxChessBoardModule } from 'ngx-chess-board';

import { RookLessonComponent } from '../lesson-components/rook-lesson/rook-lesson.component';
import { BishopLessonComponent } from '../lesson-components/bishop-lesson/bishop-lesson.component';
import { QueenLessonComponent } from '../lesson-components/queen-lesson/queen-lesson.component';

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
    QueenLessonComponent
  ],
})

export class LessonModule { }