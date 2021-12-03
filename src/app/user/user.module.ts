import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from "../shared/shared.module";
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyProfileEditInformationComponent } from './my-profile-edit/my-profile-edit-information/my-profile-edit-information.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    NewsFeedComponent,
    MyProfileComponent,
    MyProfileEditInformationComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class UserModule { }
