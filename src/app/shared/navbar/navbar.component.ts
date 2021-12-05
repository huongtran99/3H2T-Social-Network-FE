import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {AuthenticationService} from "../../service/authentication.service";
import {UserService} from "../../service/user.service";
import {FormGroup} from "@angular/forms";
import {NotificationService} from "../../service/notification.service";
import {Notification} from "../../model/Notification";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  formSearch: FormGroup = new FormGroup({});
  user: User;
  notifications: Notification[];

  constructor(private auth: AuthenticationService,
              private userService: UserService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    this.getUserDetail();
    this.getNotificationByUserId();
  }

  getNotificationByUserId() {
    this.notificationService.getNotificationByUserid(this.user.id).subscribe((data: any) => {
      this.notifications = data;
    })
  }

  logout() {
    this.auth.logout();
  }

  getUserDetail() {
    this.userService.getUserDetail(this.user.id).subscribe(user => {
      this.user = user;
    })
  }

}
