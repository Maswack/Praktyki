import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public alertController: AlertController) {}
  async handleButtonClick() {
    const alert = await this.alertController.create({
      header: 'Czy na pewno?',
      message: 'Czy chcesz się wylogować?',
      buttons: ['Nie', 'Nie'],
    });

    await alert.present();
  }
}
