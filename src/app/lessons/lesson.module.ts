import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { LessonService } from './lesson.service';
import { LessonContainerComponent } from './lessonsContainer.component';
import { LessonDirective } from './lesson.directive';
import { LessonChessboardComponent } from './lesson-chessboard.component';


@NgModule({
  imports: [
    IonicModule
  ],
  providers: [ LessonService ],
  declarations: [
    LessonContainerComponent,
    LessonChessboardComponent,
    LessonDirective
  ],
})

export class LessonModule { }