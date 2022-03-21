import { Directive, ViewContainerRef, Component, ViewChild } from '@angular/core';
import { LessonItem } from '../lessons/lesson-item';
import { LessonService } from '../lessons/lesson.service';
import { LessonContainerComponent } from '../lessons/lessonsContainer.component';


@Directive({
  selector: '[chessboard]'
})
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public viewContainerRef: ViewContainerRef, private lessonService: LessonService) {}
  @ViewChild(LessonContainerComponent) lesson:LessonContainerComponent;
  startLesson(index)
  {
    this.lesson.loadComponent(index);
  }
  lessons: LessonItem[] = [];

  ngOnInit() {
    this.lessons = this.lessonService.getLessons();
  }
}
