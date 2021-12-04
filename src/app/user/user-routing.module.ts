import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsFeedComponent} from './news-feed/news-feed.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {SettingInformationComponent} from "./setting-information/setting-information.component";

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
