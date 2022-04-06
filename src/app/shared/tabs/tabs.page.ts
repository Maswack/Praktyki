import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {}
  @ViewChild('tab4', {read: ElementRef}) tab4: ElementRef;
  @ViewChild('tab3', {read: ElementRef}) tab3: ElementRef;
  @ViewChild('zaslona', {read: ElementRef}) zaslona: ElementRef;
}
