import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestPagePage } from './test-page.page';

describe('TestPagePage', () => {
  let component: TestPagePage;
  let fixture: ComponentFixture<TestPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
