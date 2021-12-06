import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../model/user";
import {Notification} from "../../../model/Notification";
import {FriendService} from "../../../service/friend.service";
import {NotificationService} from "../../../service/notification.service";
import {Friend} from "../../../model/friend";

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
              private router: Router) {
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
      alert("Kết bạn thành công!");
    })
  }

  deleteFriend() {
    if (!this.status) {
      this.friendService.deleteFriend(this.id, this.sender.id).subscribe(() => {
        alert("ok");
      })
    } else {
      this.friendService.deleteFriend(this.sender.id, this.id).subscribe(() => {
        alert("ok");
      })
    }
  }

  addFriend() {
    this.friendService.addFriend(this.id, this.sender).subscribe(() => {
      this.notification = {
        content: " đã gửi cho bạn 1 lời mời kết bạn",
        user: this.user,
        sender: this.sender
      };
      this.notificationService.createNotification(this.notification).subscribe(() => {
        this.router.navigateByUrl(`/friends/info/${this.id}`);
      })
    })
  }

}
