import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {UserRoutingModule } from './user-routing.module';
import {SharedModule } from "../shared/shared.module";
import {NewsFeedComponent } from './news-feed/news-feed.component';
import {MyProfileComponent } from './my-profile/my-profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SettingInformationComponent } from './setting-information/setting-information.component';
import {ProfileComponent } from './setting-information/profile/profile.component';
import {PasswordComponent } from './setting-information/password/password.component';
import {FriendsComponent} from './friends/friends.component';
import {FriendInfoComponent} from './friends/friend-info/friend-info.component';

@NgModule({
  declarations: [
    NewsFeedComponent,
    MyProfileComponent,
    SettingInformationComponent,
    ProfileComponent,
    PasswordComponent,
    FriendsComponent,
    FriendInfoComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
