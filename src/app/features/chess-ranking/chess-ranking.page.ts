import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../shared/storage.service/storage.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './chess-ranking.page.html',
  styleUrls: ['./chess-ranking.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(public alertController: AlertController, private storageService: StorageService) { 
    this.getData();
  }

  async getData()
  {
    const data = await this.storageService.getData()
    console.log(data[0]);
  }
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
