import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  async handleButtonClick() {
    const alert = await this.alertController.create({
      header: 'Czy na pewno?',
      message: 'Czy chcesz się wylogować?',
      buttons: ['Nie', 'Nie'],
    });

    await alert.present();
  }

}
