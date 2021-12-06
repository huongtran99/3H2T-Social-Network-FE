import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {NewsFeedComponent} from './news-feed/news-feed.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {FriendsComponent} from './friends/friends.component';
import {FriendInfoComponent} from './friends/friend-info/friend-info.component';
import {FriendListComponent} from "./friend-list/friend-list.component";
import {MessagesComponent} from './messages/messages.component';

@NgModule({
  declarations: [
    NewsFeedComponent,
    MyProfileComponent,
    FriendsComponent,
    FriendInfoComponent,
    FriendListComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule {
}
