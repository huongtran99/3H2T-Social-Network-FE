import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FriendCreateComponent} from "./friend/friend-create/friend-create.component";
import {FriendListComponent} from "./friend/friend-list/friend-list.component";


const routes: Routes = [
  {
    path: 'friend/:id',
    component: FriendCreateComponent
  },
  {
    path: 'friend',
    component: FriendListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
