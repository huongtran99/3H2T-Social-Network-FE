import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../model/user";
import {AuthenticationService} from "../../service/authentication.service";
import {UserService} from "../../service/user.service";
import {FormGroup} from "@angular/forms";
import {NotificationService} from "../../service/notification.service";
import {Notification} from "../../model/Notification";
import {UserChat} from "../../model/user-chat";
import {MessageService} from "../../service/message.service";
import {SocketService} from "../../service/socket.service";
import {DateService} from "../../service/date.service";
import {Message} from "../../model/message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  formSearch: FormGroup = new FormGroup({});
  // user: User;
  notifications: Notification[];
  user: User = {};
  @ViewChild('message', {static: false, read: ElementRef}) public message: ElementRef<any>;
  isOpened = false;
  content = '';
  size = 10;
  listUser: UserChat[] = [];
  currentIndex = 0

  constructor(private auth: AuthenticationService,
              private userService: UserService,
              private notificationService: NotificationService,
              private messageService: MessageService,
              private socketService: SocketService,
              private dateService: DateService,
              private router: Router) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    this.getUserDetail();
    this.getNotificationByUserId();
    this.getAllUser();
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

  getAllUser() {
    this.userService.getAllUserHasRole('user').subscribe(listUser => {
      this.listUser = listUser;
      this.listUser.map(user => user.dateTime = new Date(user.dateTime))
      console.log()
    });
  }

  scrollBottom() {
    setTimeout(() => {
      this.message.nativeElement.scrollTop = this.message.nativeElement.scrollHeight;
    }, 1);
  }

  async openMessage(index) {
    this.currentIndex = index;
    this.scrollBottom();
  }

  async sentMessage(user) {
    let message: Message = {
      content: this.content,
      sender: {
        id: this.user.id
      },
      status: false,
      receiver: {
        id: user.id
      }
    }
    this.socketService.sendMessage(message);
    this.content = '';
    this.socketService.drawNewChatMessage(message, this.user);
    this.scrollBottom();
  }

}
