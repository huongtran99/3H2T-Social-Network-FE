import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

  constructor(private auth: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(() => {
      this.router.navigateByUrl("/news-feed");
    })
  }



}
