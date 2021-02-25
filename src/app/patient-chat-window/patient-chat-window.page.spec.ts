import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientChatWindowPage } from './patient-chat-window.page';

describe('PatientChatWindowPage', () => {
  let component: PatientChatWindowPage;
  let fixture: ComponentFixture<PatientChatWindowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientChatWindowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientChatWindowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
