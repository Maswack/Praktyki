import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[lessonHost]',
})
export class LessonDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}