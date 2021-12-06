import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsFeedComponent} from "./news-feed/news-feed.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {FriendsComponent} from "./friends/friends.component";
import {FriendInfoComponent} from "./friends/friend-info/friend-info.component";
import {FriendListComponent} from "./friend-list/friend-list.component";
import {MessagesComponent} from "./messages/messages.component";

const routes: Routes = [
  {
    path: 'news-feed',
    component: NewsFeedComponent
  },
  {
    path: 'my-profile',
    component: MyProfileComponent
  },
  {
    path: 'friends',
    component: FriendsComponent
  },
  {
    path: 'friends/info/:id',
    component: FriendInfoComponent
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
