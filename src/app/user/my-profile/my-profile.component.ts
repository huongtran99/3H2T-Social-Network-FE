import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  id: number;
  user: User = {};
  userForm: FormGroup = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    birthday: new FormControl(),
    gender: new FormControl(),
    avatar: new FormControl(),
    cover: new FormControl()
  });

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getUserProfile(this.id);
    });
  }

  ngOnInit() {
  }

  getUserProfile(id) {
    return this.userService.getUserDetail(id).subscribe(user => {
      this.user = user;
      this.userForm = new FormGroup({
        username: new FormControl(user.username),
        email: new FormControl(user.email),
        phone: new FormControl(user.phone),
        birthday: new FormControl(user.birthday),
        gender: new FormControl(user.gender),
        avatar: new FormControl(user.avatar),
        cover: new FormControl(user.cover)
      });
    });
  }

}
