import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {AuthenticationService} from "../../service/authentication.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  constructor(private auth: AuthenticationService,
              private userService: UserService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getUserDetail();
  }

  logout() {
    this.auth.logout();
  }

  getUserDetail() {
    this.userService.getUserDetail(this.user.id).subscribe( user => {
      this.user = user;
    })
  }

}
