import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutDevPage } from './about-dev.page';

describe('AboutDevPage', () => {
  let component: AboutDevPage;
  let fixture: ComponentFixture<AboutDevPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutDevPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutDevPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
