import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsFeedComponent} from "./news-feed/news-feed.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";

const routes: Routes = [
  {
    path: 'my-profile',
    component: MyProfileComponent
  },
  {
    path: 'news-feed',
    component: NewsFeedComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
