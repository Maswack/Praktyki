import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { LessonService } from './lesson.service';
import { LessonContainerComponent } from './lessonsContainer.component';
import { LessonDirective } from './lesson.directive';
import { LessonChessboardComponent } from './lesson-chessboard.component';
import { LineSelectorNewComponent } from '../line-selector-new/line-selector-new.component';


@NgModule({
  imports: [
    IonicModule
  ],
  exports: [
    LessonContainerComponent
  ],
  providers: [ LessonService ],
  declarations: [
    LessonContainerComponent,
    LessonChessboardComponent,
    LineSelectorNewComponent,
    LessonDirective
  ],
})

export class LessonModule { }