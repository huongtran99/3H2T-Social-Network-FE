import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from "../../model/user";
import {UserChat} from "../../model/user-chat";
import {MessageService} from "../../service/message.service";
import {SocketService} from "../../service/socket.service";
import {UserService} from "../../service/user.service";
import {DateService} from "../../service/date.service";
import {Message} from "../../model/message";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  @ViewChild('message', {static: false, read: ElementRef}) public message: ElementRef<any>;
  isOpened = false;
  content = '';
  currentUser: User = {};
  size = 10;
  listUser: UserChat[] = [];
  currentIndex = 0;
  id: number = -1;
  listMessage: Message[] = [];

  constructor(private messageService: MessageService,
              private authenticationService: AuthenticationService,
              private socketService: SocketService,
              private userService: UserService,
              private dateService: DateService,
              private activateRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get("id");
      this.getAllChatHistory(this.id, this.size)
    });
    this.currentUser = JSON.parse(localStorage.getItem('user'));

    this.getAllChatHistory(this.id, this.size);
    this.getAllUser();
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  getAllChatHistory(userId, size) {
    console.log(this.currentUser.id)
    this.messageService.getAllMessage(this.currentUser.id, userId, size).subscribe(listMessage => {
      this.listMessage = listMessage;
      this.listMessage.map(message => message.dateTime = new Date(message.dateTime));
      this.userService.getUserDetail(userId).subscribe(user => {
        this.socketService.connectToChat(user, this.message);
        this.scrollBottom();
      });
    });
  }

  getAllUser() {
    this.userService.getAll().subscribe(listUser => {
      this.listUser = listUser;
      this.listUser.map(user => user.dateTime = new Date(user.dateTime));
    })
  }

  scrollBottom() {
    setTimeout(() => {
      this.message.nativeElement.scrollTop = this.message.nativeElement.scrollHeight;
    }, 1);
  }

  async sentMessage(user) {
    let message: Message = {
      content: this.content,
      sender: {
        id: this.currentUser.id
      },
      status: true,
      receiver: {
        id: this.id
      }
    }
    this.socketService.sendMessage(message);
    this.content = '';
    this.socketService.drawNewChatMessage(message, this.currentUser);
    this.scrollBottom();
  }

  loadNewData(id) {
    const element = this.message.nativeElement.scrollTop;
    if (element < 10) {
      this.size += 5;
      this.messageService.getAllMessage(this.currentUser.id, id, this.size).subscribe(listMessage => {
        this.listMessage = listMessage;
        this.listMessage.map(message => message.dateTime = new Date(message.dateTime));
      });
    }
  }
}
