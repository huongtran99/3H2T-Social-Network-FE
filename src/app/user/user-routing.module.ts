import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsFeedComponent} from "./news-feed/news-feed.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {FriendListComponent} from "./friend-list/friend-list.component";
import {MessagesComponent} from "./messages/messages.component";

const routes: Routes = [
  {
    path: 'my-profile',
    component: MyProfileComponent
  },
  {
    path: 'news-feed',
    component: NewsFeedComponent
  },
  {
    path: 'friend-list',
    component: FriendListComponent
  },
  {
    path: 'messages/:id',
    component: MessagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
