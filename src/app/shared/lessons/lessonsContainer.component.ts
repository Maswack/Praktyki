import { Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';

import { LessonDirective } from './lesson.directive';
import { LessonItem } from './lesson-item';
import { LessonComponent } from './lesson.component';

@Component({
  selector: 'app-lesson',
  template: `<div>
      <ng-template lessonHost></ng-template>
    </div>
  `
})
export class LessonContainerComponent implements OnInit, OnDestroy {

  constructor()
  {}

  @Input() lessons: LessonItem[] = [];

  @ViewChild(LessonDirective, {static: true}) lessonHost!: LessonDirective;
  interval: any;

  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent(lessonIndex) {
    const LessonItem = this.lessons[lessonIndex];

    const viewContainerRef = this.lessonHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<LessonComponent>(LessonItem.component);
    componentRef.instance.data = LessonItem.data;
  }
}
