import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsFeedComponent} from "./news-feed/news-feed.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {FriendsComponent} from "./friends/friends.component";
import {FriendInfoComponent} from "./friends/friend-info/friend-info.component";

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
