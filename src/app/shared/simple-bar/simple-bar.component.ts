import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {User} from "../../model/user";
import {UserChat} from "../../model/user-chat";
import {AuthenticationService} from "../../service/authentication.service";
import {MessageService} from "../../service/message.service";
import {SocketService} from "../../service/socket.service";
import {UserService} from "../../service/user.service";
import {DateService} from "../../service/date.service";
import {Message} from "../../model/message";
import {Friend} from "../../model/friend";
import {FriendService} from "../../service/friend.service";

@Component({
  selector: 'app-simple-bar',
  templateUrl: './simple-bar.component.html',
  styleUrls: ['./simple-bar.component.css']
})
export class SimpleBarComponent implements OnInit {
  formSearch: FormGroup = new FormGroup({});
  user: User = {};
  @ViewChild('message', {static: false, read: ElementRef}) public message: ElementRef<any>;
  isOpened = false;
  content = '';
  size = 10;
  listUser: UserChat[] = [];
  currentIndex = 0

  constructor(private auth: AuthenticationService,
              private messageService: MessageService,
              private socketService: SocketService,
              private userService: UserService,
              private dateService: DateService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getUserDetail();
    this.getAllUser();
  }

  getUserDetail() {
    this.userService.getUserDetail(this.user.id).subscribe(user => {
      this.user = user;
    })
  }
  getAllUser() {
    this.userService.getAllUserHasRole().subscribe(listUser => {
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
