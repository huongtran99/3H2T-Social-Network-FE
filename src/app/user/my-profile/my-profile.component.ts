import { Component, OnInit } from '@angular/core';
import {Post} from "../../model/post";
import {File} from "../../model/file";
import {PostService} from "../../service/post.service";
import {FileService} from "../../service/file.service";
import {FormControl, FormGroup} from "@angular/forms";
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  id: number;
  post: Post = {};
  posts: Post[] = [];
  postEditForm: FormGroup = new FormGroup({
    id: new FormControl(),
    content: new FormControl(),
  });
  page: any = 0;
  files: File[] = [];
  searchForm: FormGroup = new FormGroup({});
  user: User;

  constructor(private postService: PostService,
              private fileService: FileService) {
    this.getAllPostsByUser();
    this.getFileByPostId();
  }

  ngOnInit() {
  }

  getAllPostsByUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user.id);
    this.postService.findAllByUser(this.user.id, this.page).subscribe((post: any) => {
      this.posts = post.content;
      this.getFileByPostId();
      console.log(this.files);
    })
  }

  getFileByPostId() {
    for (let i = 0; i < this.posts.length; i++) {
      this.fileService.findFileByPostId(this.posts[i]).subscribe(file => {
        console.log(file);
        this.files.push(file[0]);
      })
    }
  }

  getPostId(id) {
    this.id =id;
    this.postService.findById(id).subscribe(post => {
      this.post = post;
      this.postEditForm = new FormGroup({
        id: new FormControl(post.id),
        content: new FormControl(post.content),
      })
    })
  }

  submitEdit() {
    const post = this.postEditForm.value;
    this.postService.editById(this.id, post).subscribe(() => {
      alert('Successful!');

    }, error => {
      alert('Error!');
    });
  }

}
