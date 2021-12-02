import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { PostComponent } from './post/post.component';
import { SimpleBarComponent } from './simple-bar/simple-bar.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [NavbarComponent, SidebarComponent, FooterComponent, PostComponent, SimpleBarComponent],
    exports: [
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        PostComponent,
        SimpleBarComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
