import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  users: User[] = [];
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getAllUserByUserId();
  }

  getAllUserByUserId() {
    this.userService.getAllUserByUserId(this.user).subscribe(user => {
      this.users = user;
    })
  }

}
