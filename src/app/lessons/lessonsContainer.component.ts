import { Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';

import { LessonDirective } from './lesson.directive';
import { LessonItem } from './lesson-item';
import { LessonComponent } from './lesson.component';

@Component({
  selector: 'app-lesson',
  template: `
    <div>
      <ng-template lessonHost></ng-template>
    </div>
  `
})
export class LessonContainerComponent implements OnInit, OnDestroy {

  constructor()
  {}

  @Input() lessons: LessonItem[] = [];

  currentLessonIndex = -1;

  @ViewChild(LessonDirective, {static: true}) lessonHost!: LessonDirective;
  interval: any;

  ngOnInit(): void {
    this.loadComponent();
  }

  lesson1(): void {
    this.loadComponent();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentLessonIndex = (this.currentLessonIndex + 1) % this.lessons.length;
    const LessonItem = this.lessons[this.currentLessonIndex];

    const viewContainerRef = this.lessonHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<LessonComponent>(LessonItem.component);
    componentRef.instance.data = LessonItem.data;
  }
}
