import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsFeedComponent} from "./news-feed/news-feed.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {FriendsComponent} from "./friends/friends.component";
import {FriendInfoComponent} from "./friends/friend-info/friend-info.component";
import {FriendListComponent} from "./friend-list/friend-list.component";
import {MessagesComponent} from "./messages/messages.component";
import {ProfileComponent} from "./setting-information/profile/profile.component";
import {PasswordComponent} from "./setting-information/password/password.component";
import {SettingInformationComponent} from "./setting-information/setting-information.component";

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
  },
  {
    path: 'setting-profile/:id',
    component: ProfileComponent
  },
  {
    path: 'change-password/:id',
    component: PasswordComponent
  },
  {
    path: 'my-profile/about',
    component: MyProfileComponent
  },{
    path: 'setting',
    component: SettingInformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
