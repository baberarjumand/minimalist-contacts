import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditContactPage } from './edit-contact.page';

describe('EditContactPage', () => {
  let component: EditContactPage;
  let fixture: ComponentFixture<EditContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditContactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
