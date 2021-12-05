import {Injectable} from '@angular/core';
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import * as SockJs from 'sockjs-client';
import * as Stomp from 'stompjs';
import {AuthenticationService} from "./authentication.service";

declare var $: any;


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  stompClient: any;
  currentUser: User = {};

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router) {
    this.authenticationService.currenUser.subscribe(value => {
      this.currentUser = value;
    });
  }

  connectToChat(currentUser, message) {
    let ws = new SockJs(`http://localhost:8080/ws`);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe(`/topic/messages`, (messageOutPut) => {
        let data = JSON.parse(messageOutPut.body);
        if (this.currentUser.id == data.receiver.id) {
          this.drawNewChatMessage(data, this.currentUser);
          setTimeout(() => {
            message.nativeElement.scrollTop = message.nativeElement.scrollHeight;
          }, 1);
        }
      })
    })
  }

  drawNewChatMessage(messageOutput, currentUser) {
    const ul = document.getElementById('history');
    const firstLi = $('ul#history li:first').get(0);
    const li = firstLi.cloneNode(true);
    li.innerHTML = messageOutput.content;
    const className = currentUser.id == messageOutput.sender.id ? 'me' : 'you';
    li.setAttribute('class', className);
    ul.appendChild(li);
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  sendMessage(message) {
    this.stompClient.send('/app/messages', {}, JSON.stringify(message));
  }
}
