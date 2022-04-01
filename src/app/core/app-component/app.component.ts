import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/storage.service/storage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {

  constructor(
      private storageService: StorageService,
      private http: HttpClient
    
    ) {
    this.ifFirstLogin();
  }

  ngOnInit() {
    window.onbeforeunload = () => this.ngOnDestroy()
  }

  ngOnDestroy() {
    this.sendDataToServer();
  }

  async ifFirstLogin()
  {
    const data = await this.storageService.getData();
    if(!data) this.storageService.firstLogin();
  }

  async sendDataToServer() {
    const storageData = await this.storageService.getData();
    
    const lessonData = storageData[1];
    const id = storageData[2].id;

    const data = [{lessonData}, {id}]

    this.http.post('http://localhost:3000/sendDataToServer', data).subscribe(
      (res) => {},
      (err) => console.log(err)
    )

    
  }
}
