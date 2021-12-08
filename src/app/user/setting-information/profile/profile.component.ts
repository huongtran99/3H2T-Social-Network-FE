import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../model/user";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userForm: FormGroup = new FormGroup({
    email: new FormControl(),
    phone: new FormControl(),
    birthday: new FormControl(),
    gender: new FormControl()
  });

  id: number;
  user: User = {};


  constructor(private userService: UserService,
              private activatedRouter: ActivatedRoute,
              private router: Router) {
    this.activatedRouter.paramMap.subscribe(pramMap => {
      this.id = +pramMap.get('id');
      this.userService.getUserDetail(this.id).subscribe(data => {
        this.user = data;
        this.userForm = new FormGroup({
          email: new FormControl(this.user.email),
          phone: new FormControl(this.user.phone),
          birthday: new FormControl(this.user.birthday),
          gender: new FormControl(this.user.gender),
        });
      });

    });
  }

  ngOnInit() {

  }

  submitEdit() {
    this.userService.editInformation(this.id, this.userForm.value).subscribe(() => {
      alert('Update success!Thank you.');
    }, error => {
      console.log(error);
    });
  }

  get email() {
    return this.userForm.get('email');
  }

  get phone() {
    return this.userForm.get('phone');
  }

  get birthday() {
    return this.userForm.get('birthday');
  }

  get gender() {
    return this.userForm.get('gender');
  }
}
