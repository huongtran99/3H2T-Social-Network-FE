import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsFeedComponent} from './news-feed/news-feed.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {ProfileComponent} from "./setting-information/profile/profile.component";
import {PasswordComponent} from "./setting-information/password/password.component";

const routes: Routes = [
  {
    path: 'my-profile/:id',
    component: MyProfileComponent
  },
  {
    path: 'news-feed',
    component: NewsFeedComponent
  },
  {
    path:'setting-profile/:id',
    component: ProfileComponent
  },
  {
    path: 'change-password/:id',
    component: PasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
