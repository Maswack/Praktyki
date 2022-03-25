import { Component } from '@angular/core';
import { StorageService } from 'src/app/shared/storage.service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storageService: StorageService) {
    this.ifFirstLogin();
  }
  async ifFirstLogin()
  {
    const data = await this.storageService.getData();
    if(!data) this.storageService.firstLogin();
  }
}
