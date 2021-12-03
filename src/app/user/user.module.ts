import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from "../shared/shared.module";
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import {FriendListComponent} from "./friend-list/friend-list.component";
import { MessagesComponent } from './messages/messages.component';
import { MessagesDetailComponent } from './messages/messages-detail/messages-detail.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";


@NgModule({
  declarations: [
    NewsFeedComponent,
    MyProfileComponent,
    FriendListComponent,
    MessagesComponent,
    MessagesDetailComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule,
        InfiniteScrollModule,
    ]
})
export class UserModule { }
