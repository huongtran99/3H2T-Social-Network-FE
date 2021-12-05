import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {SimpleBarComponent} from './simple-bar/simple-bar.component';
import {FooterComponent} from './footer/footer.component';
import {PostComponent} from './post/post.component';

@NgModule({
  declarations: [NavbarComponent, SidebarComponent, FooterComponent, PostComponent, SimpleBarComponent],
  exports: [
    NavbarComponent,
    SidebarComponent,
    SimpleBarComponent,
    FooterComponent,
    PostComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SharedModule {
}
