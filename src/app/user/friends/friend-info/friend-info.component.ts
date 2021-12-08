import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../model/user";
import {Notification} from "../../../model/Notification";
import {FriendService} from "../../../service/friend.service";
import {NotificationService} from "../../../service/notification.service";
import {Friend} from "../../../model/friend";
import {SweetalertService} from "../../../service/sweetalert.service";

@Component({
  selector: 'app-friend-info',
  templateUrl: './friend-info.component.html',
  styleUrls: ['./friend-info.component.css']
})
export class FriendInfoComponent implements OnInit {
  id: number;
  user: User;
  sender: any;
  notification: Notification = {};
  statusFriend: any = null;
  status: any;
  statusAddFriend: boolean;
  friend: Friend;

  constructor(private userService: UserService,
              private activateRoute: ActivatedRoute,
              private friendService: FriendService,
              private notificationService: NotificationService,
              private sweetalertService: SweetalertService) {
    this.activateRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      this.userService.getUserDetail(this.id).subscribe(user => {
        this.user = user;
      });
    });
    this.sender = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.friendService.getFriendBySenderIdAndReceiverId(this.id, this.sender.id).subscribe(friend => {
      if(friend == null) {
        this.statusAddFriend = true;
        console.log(this.statusFriend)
        this.friendService.getFriendBySenderIdAndReceiverId(this.sender.id, this.id).subscribe(friend => {
          this.statusFriend = friend.status;
        })
      } else {
        this.statusFriend = friend.status;
      }
    })
    this.friendService.getStatus(this.id, this.sender.id).subscribe(status => {
      this.status = status;
    })
  }

  confirm() {
    this.friendService.confirm(this.id, this.sender).subscribe(() => {
      this.sweetalertService.alertSuccess("Kết bạn thành công!");
    })
  }

  deleteFriend() {
    if (!this.status) {
      this.friendService.deleteFriend(this.id, this.sender.id).subscribe(() => {
        this.sweetalertService.alertSuccess("ok");
      })
    } else {
      this.friendService.deleteFriend(this.sender.id, this.id).subscribe(() => {
        this.sweetalertService.alertSuccess("ok");
      })
    }
  }

  addFriend() {
    this.friendService.addFriend(this.id, this.sender).subscribe(() => {
      this.sweetalertService.alertSuccess("đã gửi lời mời kết bạn");
      this.notification = {
        content: this.sender.username + " đã gửi cho bạn 1 lời mời kết bạn",
        user: this.user,
        sender: this.sender
      };
      this.notificationService.createNotification(this.notification).subscribe(() => {
        console.log("có thông báo rồi đấy.");
      })
    })
  }

}
