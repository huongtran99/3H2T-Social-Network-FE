import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../model/user";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  passwordForm: FormGroup = new FormGroup({
    current_password: new FormControl('',[Validators.required, Validators.minLength(4), Validators.pattern("^(?:(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*)[^\\s]{4,}$")]),
    new_password: new FormControl('',[Validators.required, Validators.minLength(4), Validators.pattern("^(?:(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*)[^\\s]{4,}$")]),
    re_new_password: new FormControl('',[Validators.required, Validators.minLength(4), Validators.pattern("^(?:(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*)[^\\s]{4,}$")]),
  })
  id: number;
  user: User = {};
  userToken: User;
  resultPassword: boolean;


  constructor(private userService: UserService,
              private activatedRouter: ActivatedRoute) {
    this.activatedRouter.paramMap.subscribe(pramMap => {
      this.id = +pramMap.get('id');
      this.userService.getUserDetail(this.id).subscribe(data => {
        this.user = data;
      });
    });
  }

  ngOnInit() {
    this.userToken = JSON.parse(localStorage.getItem('user'));
  }

  changePassword() {
    if(this.passwordForm.value.new_password != this.passwordForm.value.re_new_password) {
      alert("fail!");
      return;
    }
    this.userService.getPasswordTrue(this.userToken.id, this.passwordForm.value.current_password).subscribe(data => {
      this.resultPassword = data;
      if (this.resultPassword) {
        this.userService.changePassword(this.userToken.id, this.passwordForm.value.new_password).subscribe(() => {
          alert('Success!Thank you.');
        }, error => {
          console.log(error);
        });
      }
    })
  }


  get current_password() {
    return this.passwordForm.get('current_password');
  }

  get new_password() {
    return this.passwordForm.get('new_password');
  }

  get re_new_password() {
    return this.passwordForm.get('re_new_password');
  }

}
