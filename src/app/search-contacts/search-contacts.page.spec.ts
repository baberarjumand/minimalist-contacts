import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchContactsPage } from './search-contacts.page';

describe('SearchContactsPage', () => {
  let component: SearchContactsPage;
  let fixture: ComponentFixture<SearchContactsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchContactsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchContactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
