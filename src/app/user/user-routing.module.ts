import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsFeedComponent} from './news-feed/news-feed.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {MyProfileEditInformationComponent} from "./my-profile-edit/my-profile-edit-information/my-profile-edit-information.component";

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
    path: 'my-profile-edit-information/:id',
    component: MyProfileEditInformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
