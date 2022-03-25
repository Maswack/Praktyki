import { Directive, ViewContainerRef, Component, ViewChild, Input, ElementRef } from '@angular/core';
import { LessonItem } from '../lessons/lesson-item';
import { LessonService } from '../lessons/lesson.service';
import { LessonContainerComponent } from '../lessons/lessonsContainer.component';
import { NgxChessBoardView } from 'ngx-chess-board';
import { Platform } from '@ionic/angular';



@Directive({
  selector: '[chessboard]'
})
@Component({
  selector: 'app-tab3',
  templateUrl: 'chess-lessons.page.html',
  styleUrls: ['chess-lessons.page.scss']
})
export class Tab3Page {

  @Input() screenWidth: string;

  @ViewChild('container') container: ElementRef;
  @ViewChild('goBackButton', {read: ElementRef}) goBackButton: ElementRef;
  @ViewChild('title', {read: ElementRef}) title: ElementRef;
  @ViewChild('board', {static: false}) board!: NgxChessBoardView;

  constructor(
    public viewContainerRef: ViewContainerRef,
    private lessonService: LessonService,
    private platform: Platform) {
      platform.ready().then( () => {
        this.screenWidth = "" + platform.width;
      })
    }

  @ViewChild(LessonContainerComponent) lesson:LessonContainerComponent;

  
  startLesson(index)
  {
    this.lesson.loadComponent(index);
    
    this.turnLessonsOff();
  }
  lessons: LessonItem[] = [];

  ngOnInit() {
    this.lessons = this.lessonService.getLessons();
  }

  goBack() {
    this.turnLessonsOn();
  }

  turnLessonsOff() {

    this.container.nativeElement.style.display = "none";
    this.goBackButton.nativeElement.style.display = "block";
    this.title.nativeElement.style.display = "none";
  }

  turnLessonsOn() {

    this.container.nativeElement.style.display = "block";
    this.goBackButton.nativeElement.style.display = "none";
    this.title.nativeElement.style.display = "block";

    this.lesson.unloadComponent();
  }

}
