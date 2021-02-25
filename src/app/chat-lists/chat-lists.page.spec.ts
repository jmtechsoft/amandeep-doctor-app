import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatListsPage } from './chat-lists.page';

describe('ChatListsPage', () => {
  let component: ChatListsPage;
  let fixture: ComponentFixture<ChatListsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatListsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatListsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
