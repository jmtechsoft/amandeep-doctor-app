import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatListsPageRoutingModule } from './chat-lists-routing.module';

import { ChatListsPage } from './chat-lists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatListsPageRoutingModule
  ],
  declarations: [ChatListsPage]
})
export class ChatListsPageModule {}
