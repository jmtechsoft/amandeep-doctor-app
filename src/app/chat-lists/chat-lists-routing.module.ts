import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatListsPage } from './chat-lists.page';

const routes: Routes = [
  {
    path: '',
    component: ChatListsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatListsPageRoutingModule {}
