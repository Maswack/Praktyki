import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ZadankaMaslakaPage } from './zadanka-maslaka.page';

describe('ZadankaMaslakaPage', () => {
  let component: ZadankaMaslakaPage;
  let fixture: ComponentFixture<ZadankaMaslakaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ZadankaMaslakaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ZadankaMaslakaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
