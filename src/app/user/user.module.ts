import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from "../shared/shared.module";
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { FriendsComponent } from './friends/friends.component';
import { FriendInfoComponent } from './friends/friend-info/friend-info.component';


@NgModule({
  declarations: [
    NewsFeedComponent,
    MyProfileComponent,
    FriendsComponent,
    FriendInfoComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
