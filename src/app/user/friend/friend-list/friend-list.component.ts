import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {User} from "../../../model/user";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.userService.getAll().subscribe(user => {
      this.users = user;
    })
  }

}
