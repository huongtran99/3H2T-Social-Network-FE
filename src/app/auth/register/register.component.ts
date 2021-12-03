import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    rePassword: new FormControl(),
  });
  userRegister: User;

  constructor(private auth: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    if (this.formRegister.value.password != this.formRegister.value.rePassword) {
      alert("fail!");
      return;
    }
    this.auth.register(this.formRegister.value).subscribe(() => {
      this.router.navigateByUrl("auth/login");
    })
  }

}
