import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../model/user";
import {FriendService} from "../../../service/friend.service";
import {NotificationService} from "../../../service/notification.service";
import {Notification} from "../../../model/Notification";

@Component({
  selector: 'app-friend-create',
  templateUrl: './friend-create.component.html',
  styleUrls: ['./friend-create.component.css']
})
export class FriendCreateComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    gender: new FormControl(),
    birthday: new FormControl()
  });
  id: number;
  user: User;
  sender: any;
  notification: Notification = {};

  constructor(private userService: UserService,
              private activateRoute: ActivatedRoute,
              private friendService: FriendService,
              private notificationService: NotificationService) {
    this.activateRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      this.userService.getUserDetail(this.id).subscribe(user => {
        this.user = user;
        this.userForm = new FormGroup({
          username: new FormControl(this.user.username),
          password: new FormControl(this.user.password),
          email: new FormControl(this.user.email),
          phone: new FormControl(this.user.phone),
          gender: new FormControl(this.user.gender),
          birthday: new FormControl(this.user.birthday)
        });
      });
    });
  }

  ngOnInit() {
  }

  addFriend() {
    this.sender = {
      id: 1,
      username: "huongtran"
    };
    this.friendService.addFriend(this.id, this.sender).subscribe(() => {
      alert("đã gửi lời mời kết bạn");
      this.notification = {
        content: this.sender.username + " đã gửi cho bạn 1 lời mời kết bạn",
        user: this.user
      };
      this.notificationService.createNotification(this.notification).subscribe(() => {
        console.log("có thông báo rồi đấy.");
      })
    })
  }

}
