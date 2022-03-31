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

  data: any = {
    chessLessonsDone: 0
  }

  statsEater = {
    clickedRight: 0,
    clickedWrong: 0,
    highScore: 0,
    completed: 0
  };

  ranking : any;
  user: any = {
    id: 1,
    name: "",
  }

  loginDisplay: any;
  profileDisplay: any;

  @ViewChild('name', {read: ElementRef}) nameInput: ElementRef
  @ViewChild('password', {read: ElementRef}) passwordInput: ElementRef

  constructor(private http: HttpClient,public alertController: AlertController, private storageService: StorageService, private tabs: TabsPage, private renderer: Renderer2) { 
  }

  async updateData()
  {
    const data = await this.storageService.getData()
    this.statsEater = data[0].eater;
  }
  ngOnInit() {
    this.updateData()
    this.renderer.listen(this.tabs.tab4.nativeElement, "click", ()=>{this.updateData()})
  }
  ngAfterViewInit() {
    this.postLoginEnv("none", "block");
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
          this.user = await res;
          const newLessonsData = {
            chessLessonsDone: res[0].lessonsDone
          }
          this.storageService.updateData(newLessonsData, 1)
          this.postLoginEnv("block","none");
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

  logOutFunction() {
    const data = {
      id: 1,
      name: ''
    }
    this.user = data;

    this.postLoginEnv("none", "block");
    this.resetInput(true);
  }

  resetInput(fully) {
    this.passwordInput.nativeElement.value = "";
    if(fully) 
      this.nameInput.nativeElement.value = "";
  }

}
