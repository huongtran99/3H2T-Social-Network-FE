import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-my-profile-edit-information',
  templateUrl: './my-profile-edit-information.component.html',
  styleUrls: ['./my-profile-edit-information.component.css']
})
export class MyProfileEditInformationComponent implements OnInit {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[_A-Za-z0-9-\\\\+]+(\\\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\\\.[A-Za-z0-9]+)*(\\\\.[A-Za-z]{2,})$")]),
    phone: new FormControl('',[Validators.required, Validators.pattern("\"\\\\d{9,11}\"")]),
    birthday: new FormControl('', [Validators.required, Validators.pattern("MM/dd/yyyy")]),
    gender: new FormControl('', [Validators.required])
  })
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
      alert('Success!Thank you.');
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
