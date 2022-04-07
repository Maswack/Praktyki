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
    role: "",
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
    this.http.get(`http://localhost:3000/apiRouter/user/geteater/${this.playerId}`, { withCredentials: true }).pipe(
      map(r => r)
    ).subscribe(resp => {
        const data:any = resp

        if(data.message != "Acces Denied! Unauthorized User")
        {
          this.statsEater.completed = resp[0].completed
          this.statsEater.clickedRight = resp[0].selected
          this.statsEater.clickedWrong = resp[0].mistakes
          this.statsEater.highScore = resp[0].highscore
          const newFunRoom = {eater: this.statsEater, memorizer: storageData[0].memorizer}
          this.storageService.updateData(newFunRoom, 0)
        }
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
  zaslonaFunction(display) {
    this.tabs.zaslona.nativeElement.style.display = display;
  }
  resetInput(fully) {
    this.passwordInput.nativeElement.value = "";
    if(fully) 
      this.nameInput.nativeElement.value = "";
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
    this.http.get('http://localhost:3000/apiRouter/user/getrankings', { withCredentials: true }).pipe(
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
    this.http.post('http://localhost:3000/apiRouter/login', data, {withCredentials: true }).
    pipe(map(r => r)).subscribe(
      async (res) => {
        if(res == "Invalid Name or Pasword") {
          const alert = await this.alertController.create({
            header: 'Błędne dane logowania'
          });

          alert.present();
          return 0;
        }

          this.user = res[0];
          const lessonData = res[1]


          const data = await this.storageService.getData();

          data[1].chessLessonsDone = lessonData[0].lessonsdone;
          data[2].id = this.user.id

          await this.storageService.updateData(data[1], 1)
          await this.storageService.updateData(data[2], 2)

          this.postLoginEnv("block","none");
          this.updateData()
          this.zaslonaFunction("none")
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

    this.http.post('http://localhost:3000/apiRouter/register', data, { withCredentials: true }).subscribe(
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

    this.http.post('http://localhost:3000/apiRouter/user/sendDataToServer', data, { withCredentials: true }).subscribe(
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
    const nullUser = {
      actualLesson: 0,
      id: 0,
      isActualLessonDone: false
    }
    const resetLesson = {
      chessLessonsDone : 0
    }

    document.cookie = "token" + '=; Max-Age=0'

    this.user = data;
    this.lessonData.chessLessonsDone = 0;
    await this.storageService.updateData(nullUser, 2)
    await this.storageService.updateData(resetLesson, 1)



    this.postLoginEnv("none", "block");
    this.resetInput(true);
    this.zaslonaFunction('block')
  }



  loginAuto() {
    const cookies = document.cookie.split(';')
    let token:any

    cookies.forEach( cookie => {
      if(cookie.includes('token='))
        token = cookie.split('=')[1]
    })

    console.log(token)

    if(token) {

      this.http.get('http://localhost:3000/apiRouter/user/autoLogin', {withCredentials:true}).
      pipe(map(r => r)).subscribe(
        async (res) => {
            this.user = res[0];
            const lessonData = res[1]


            const data = await this.storageService.getData();

            data[1].chessLessonsDone = lessonData[0].lessonsdone;
            data[2].id = this.user.id

            await this.storageService.updateData(data[1], 1)
            await this.storageService.updateData(data[2], 2)

            this.postLoginEnv("block","none");
            this.updateData()
            this.zaslonaFunction("none")
        },

        (err) => {
          console.log(err)
        }
      )
  
      
      
    }

  }
}
