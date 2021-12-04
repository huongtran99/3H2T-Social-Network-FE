import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../model/user";
import {PostService} from "../../service/post.service";
import {FileService} from "../../service/file.service";

@Component({
  selector: 'app-post-setting',
  templateUrl: './post-setting.component.html',
  styleUrls: ['./post-setting.component.css']
})
export class PostSettingComponent implements OnInit {
  postEditForm: FormGroup = new FormGroup({
    content: new FormControl(),
  })
  fileData: File[] = [];
  user: User;

  constructor(private postService: PostService,
              private fileService: FileService) {
  }

  ngOnInit() {
  }

}
