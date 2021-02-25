import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatWindowPage } from './chat-window.page';

describe('ChatWindowPage', () => {
  let component: ChatWindowPage;
  let fixture: ComponentFixture<ChatWindowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatWindowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatWindowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
