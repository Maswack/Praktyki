import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-strona',
  templateUrl: './strona.page.html',
  styleUrls: ['./strona.page.scss'],
})
export class StronaPage implements OnInit {

  constructor(public actionSheet: ActionSheetController) { }
    async presentActionSheet() {
      const actionSheet = await this.actionSheet.create({
        header: 'Wybierz co chcesz',
        cssClass: 'my-custom-class',
        buttons: 
        [
          {
            text: 'Cancel',
            role: 'cancel',
            icon: 'trash',
            handler: () => {
              console.log('Delete clicked');
            }
          },
          {
            text: "Zrób rzecz",
            role: 'destructive',
            icon: 'map',
          },
          {
            text: "Zrób inną rzecz",
            role: 'share',
            icon: 'game-controller',
          },
        ]
      });
      await actionSheet.present();
    }

  ngOnInit() {
  }

}
