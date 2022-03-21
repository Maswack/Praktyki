import { Directive, ViewContainerRef, Component } from '@angular/core';
import { LessonItem } from '../lessons/lesson-item';
import { LessonService } from '../lessons/lesson.service';

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
  // https://angular.io/guide/dynamic-component-loader
  //TODO: dynamic component w tym miejscu, zeby szachownica wyswiatlala lekcje w zaleznosci od tego ktora 
  //wybierzemy, jesli sie tak nie da, to nie wiem poddac sie i wyjechac w bieszczady, bo innych opcji nie widze
  firstLesson()
  {

  }
  lessons: LessonItem[] = [];

  ngOnInit() {
    this.lessons = this.lessonService.getLessons();
    console.log(this.lessons)
  }
}
