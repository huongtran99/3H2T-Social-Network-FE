import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FriendCreateComponent } from './friend/friend-create/friend-create.component';
import { FriendListComponent } from './friend/friend-list/friend-list.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [FriendCreateComponent, FriendListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ]
})
export class UserModule { }
