import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  users: User[] = [];
  user: User;
  usersSearch: User[] = [];
  searchValue: any;
  page: any = 0;

  constructor(private userService: UserService,
              private dataService: DataService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getAllUserByUserId();
    this.dataService.currentUsers.subscribe((data: any) => this.usersSearch = data);
    this.dataService.currentSearch.subscribe((data: any) => this.searchValue = data);
    this.dataService.currentPage.subscribe((data: any) => this.page = data);
  }

  getAllUserByUserId() {
    this.userService.getAllUserByUserId(this.user).subscribe(user => {
      this.users = user;
    })
  }

  loadMore() {
    this.page++;
    this.userService.searchUser(this.searchValue, this.page).subscribe((data: any) => {
      for(let i = 0; i < data.content.length; i++) {
        this.usersSearch.push(data.content[i]);
      }
      this.dataService.changeDataUser(this.usersSearch);
    })
  }

}
