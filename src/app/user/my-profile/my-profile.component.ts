import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {Friend} from "../../model/friend";
import {FriendService} from "../../service/friend.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {


  constructor() { }

  ngOnInit() {

  }
}
