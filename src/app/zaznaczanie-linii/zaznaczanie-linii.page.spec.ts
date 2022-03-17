import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ZaznaczanieLiniiPage } from './zaznaczanie-linii.page';

describe('ZaznaczanieLiniiPage', () => {
  let component: ZaznaczanieLiniiPage;
  let fixture: ComponentFixture<ZaznaczanieLiniiPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ZaznaczanieLiniiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ZaznaczanieLiniiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
