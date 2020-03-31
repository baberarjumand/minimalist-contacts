import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { AllContactsPage } from "./all-contacts.page";

describe("AllContactsPage", () => {
  let component: AllContactsPage;
  let fixture: ComponentFixture<AllContactsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllContactsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllContactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
