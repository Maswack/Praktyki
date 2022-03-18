import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Input } from '@angular/core';

import { Platform } from '@ionic/angular';
import { TouchSequence } from 'selenium-webdriver';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @Input() screenWidth: string;
  @Input() chessLessons: string;
  @Input() graphicSetup: string;
  @Input() actualLesson: string;
  @Input() lesson: number;



  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
        this.screenWidth = "" + platform.width();
    })
  }
}