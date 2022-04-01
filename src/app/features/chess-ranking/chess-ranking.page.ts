import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TabsPage } from 'src/app/shared/tabs/tabs.page';
import { StorageService } from '../../shared/storage.service/storage.service';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';


@Component({
  selector: 'app-tab4',
  templateUrl: './chess-ranking.page.html',
  styleUrls: ['./chess-ranking.page.scss'],
})
export class Tab4Page implements OnInit {

  statsEater = {
    clickedRight: 0,
    clickedWrong: 0,
    highScore: 0,
    completed: 0
  };
  playerId: number;
  ranking : any;

  lessonData= {
    chessLessonsDone: 0
  }

  user: any = {
    id: 1,
    name: "",
  }

  auto_login: boolean;
  loginDisplay: any;
  profileDisplay: any;

  @ViewChild('name', {read: ElementRef}) nameInput: ElementRef
  @ViewChild('password', {read: ElementRef}) passwordInput: ElementRef

  constructor(private http: HttpClient,public alertController: AlertController, private storageService: StorageService, private tabs: TabsPage, private renderer: Renderer2) { 
  }

  async updateData()
  {
    const storageData = await this.storageService.getData();
    this.playerId = storageData[2].id;
    this.http.get(`http://localhost:3000/geteater/${this.playerId}`).pipe(
      map(r => r)
    ).subscribe(resp => {
        this.statsEater.completed = resp[0].completed
        this.statsEater.clickedRight = resp[0].selected
        this.statsEater.clickedWrong = resp[0].mistakes
        this.statsEater.highScore = resp[0].highscore
      }
    );
    this.lessonData = storageData[1]
  }
  ngOnInit() {
    this.updateData()
    this.renderer.listen(this.tabs.tab4.nativeElement, "click", ()=>{this.updateData()})
  }
  ngAfterViewInit() {
    this.postLoginEnv("none", "block");
    this.loginAuto();
  }
  resetInput(fully) {
    this.passwordInput.nativeElement.value = "";
    if(fully) 
      this.nameInput.nativeElement.value = "";
  }
  resetAutoLogin() {
    window.localStorage.setItem('name', '');
    window.localStorage.setItem('password', '')
  }
  postLoginEnv(profileOption, loginOption) {
    this.profileDisplay = profileOption;
    this.loginDisplay = loginOption;
  }

  async handleButtonClick() {
    const alert = await this.alertController.create({
      header: 'Czy na pewno?',
      message: 'chcesz się wylogować?',
      buttons: [
        {text: 'Nie'},
      
        {
          text:'Tak',
          handler: () => {
            this.logOutFunction();
          }
        }
      ],
    });

    await alert.present();
  }
  async showRankings()
  {
    this.http.get('http://localhost:3000/getrankings').pipe(
      map(r => r)
    ).subscribe(resp => {
        this.ranking = resp
        if(document.querySelector("#blankScoreboard")) document.querySelector("#blankScoreboard").setAttribute("id", "scoreboard")
      }
    );
  }
  closeScoreboard()
  {
    document.querySelector("#scoreboard").setAttribute("id", "blankScoreboard")
  }

  async loginFunction() {
    const name = this.nameInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;
    const autoLogin = this.auto_login

    this.resetInput(false);

    const data =
    {
      name: name,
      password: password
    }

    this.http.post('http://localhost:3000/login', data).
    pipe(map(r => r)).subscribe(
      async (res) => {
        this.user = res;
        if(this.user.name == "user not found") {
          const alert = await this.alertController.create({
            header: 'Błędne dane logowania'
          });

          alert.present();
          return 0;
        }
          if(autoLogin) {
            window.localStorage.setItem('name', name);
            window.localStorage.setItem('password', password)
          }
        
          const data = await this.storageService.getData();

          const lessonData = res[0].res[0]
          this.user = await res[1].data;

          data[1].chessLessonsDone = lessonData.lessonsDone;
          data[2].id = this.user.id

          await this.storageService.updateData(data[1], 1)
          await this.storageService.updateData(data[2], 2)

          this.postLoginEnv("block","none");
          this.updateData()
       },
      (err) => { console.log(err) }
    )
  }

  async registerFunction() {
    const name = this.nameInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;

    this.resetInput(false);

    const data =
    {
      name: name,
      password: password
    }

    this.http.post('http://localhost:3000/register', data).subscribe(
      async (res) => {
        const alert = await this.alertController.create({
          header: 'Gratulacje',
          message: 'Udalo Ci sie zalozyc konto'
        })

        alert.present();
      },
      (err) => {
        console.log(err)
      }
    )
  }

  async sendDataToServer(id) {
    const storageData = await this.storageService.getData();
    const lessonData = storageData[1];

    const data = [{lessonData}, {id}]

    this.http.post('http://localhost:3000/sendDataToServer', data).subscribe(
      (res) => {},
      (err) => console.log(err)
    )
  }

  async logOutFunction() {
    this.sendDataToServer(this.user.id);

    const data = {
      id: 1,
      name: ''
    }
    this.user = data;
    this.lessonData.chessLessonsDone = 0;

    this.postLoginEnv("none", "block");
    this.resetInput(true);
    this.resetAutoLogin();
  }

  loginAuto() {
    if(window.localStorage.getItem('name') != 'undefined' && window.localStorage.getItem('name') != null) {

      const name = window.localStorage.getItem('name');
      const password = window.localStorage.getItem('password');

      if(name != '' ){
        this.nameInput.nativeElement.value = name;
        this.passwordInput.nativeElement.value = password

        this.loginFunction();
      }

    }
    else {
      this.resetAutoLogin();
    }
  }
}
