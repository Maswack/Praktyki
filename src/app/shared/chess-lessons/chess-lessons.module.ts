import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './chess-lessons.page';
import { LessonModule } from '../lessons/lesson.module';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { ChessboardComponentComponent } from '../lesson-components/chessboard-component/chessboard-component.component';


import { Tab3PageRoutingModule } from './chess-lessons-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgxChessBoardModule.forRoot(),
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
    LessonModule,
    
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
