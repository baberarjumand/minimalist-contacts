import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MySettingsPage } from './my-settings.page';

describe('MySettingsPage', () => {
  let component: MySettingsPage;
  let fixture: ComponentFixture<MySettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MySettingsPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MySettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
