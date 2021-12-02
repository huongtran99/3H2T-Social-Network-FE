import {Component, OnInit} from '@angular/core';
import {PostService} from "../../service/post.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postForm: FormGroup = new FormGroup({
    id: new FormControl(),
    user: new FormControl(),
    content: new FormControl(),
    dateTime: new FormControl(),
    status: new FormControl()
  })

  constructor(private postService: PostService) {
  }

  ngOnInit() {
  }

  submitSave() {

  }
}
