import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  user: User;
  users: User[] = [];

  status
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(data => {
      this.users = data;
    }, error => {
      console.log(error);
    });
  }

  changestatus(user) {
    console.log(user);
    return false;
    // this.adminServiceService.changeuserstatus(user)
    //   .subscribe((data: any) => {
    //     alert('User Disable');
    //     this.ngOnInit();
    //   });
  }

  // exports.isActive = function(req,res){
  //   user.findbyId(this.id, function(err, user){
  //     user.status= !user.status;
  //     user.save(function(err){
  //       if(err){
  //         console.error("Error!!!!");
  //       }
  //     })
  //   })
  // }
}

