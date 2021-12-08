import { Component, OnInit } from '@angular/core';
import {FriendService} from "../../service/friend.service";
import {User} from "../../model/user";
import {Friend} from "../../model/friend";
import {UserToken} from "../../model/user-token";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  users: User[] = [];
  friends: Friend[] = [];
  user: User;
  constructor(private friendService: FriendService) { }

  ngOnInit() {
    this.getAllFriend();
  }
  getAllFriend() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.friendService.getAllFriend(this.user.id).subscribe(data => {
      this.friends = data;
      this.getFriend();
    });
  }

  getFriend() {
    for (let i = 0; i < this.friends.length; i++) {
      if(this.friends[i].receiver.id != this.user.id) {
        this.users.push(this.friends[i].receiver);
      }
      if(this.friends[i].sender.id != this.user.id) {
        this.users.push(this.friends[i].sender);
      }
    }
  }
}
