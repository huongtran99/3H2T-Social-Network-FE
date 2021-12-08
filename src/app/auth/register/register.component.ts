import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    rePassword: new FormControl(),
  });

  get username(){
    return this.formRegister.get('username');
  }

  get email(){
    return this.formRegister.get('email');
  }

  get password(){
    return this.formRegister.get('password');
  }

  get rePassword(){
    return this.formRegister.get('rePassword');
  }

  constructor(private auth: AuthenticationService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.formRegister = formBuilder.group({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      rePassword: new FormControl(),
    }, {
      validator: this.confirmPassword('password', 'rePassword')
    })
  };

  ngOnInit() {
  }

  register() {
    this.auth.register(this.formRegister.value).subscribe(() => {
      this.router.navigateByUrl("auth/login");
    }, error => {
      document.getElementById('register-error-box').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </symbol>
            </svg>
            <div class="alert alert-danger d-flex align-items-center justify-content-center">
                <svg class="flex-shrink-0 me-2" width="16" height="16" aria-label="Danger:">
                <use xlink:href="#exclamation-triangle-fill"/>
                </svg>
                <div style="font-weight: bold; height: 34px; line-height: 34px">Username or Email has already been registered.</div>
            </div>`
    })
  }

  confirmPassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmedValidator: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
