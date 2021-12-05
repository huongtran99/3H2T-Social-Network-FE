import {Component, OnChanges, OnInit} from '@angular/core';
import {Post} from "../../model/post";
import {File} from "../../model/file";
import {PostService} from "../../service/post.service";
import {FileService} from "../../service/file.service";
import {FormControl, FormGroup} from "@angular/forms";
import { User } from 'src/app/model/user';
import {UserService} from "../../service/user.service";
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, OnChanges {
  id: number;
  post: Post = {};
  posts: Post[] = [];
  postEditForm: FormGroup = new FormGroup({
    id: new FormControl(),
    content: new FormControl(),
    status: new FormControl("Public"),
  });
  page: any = 0;
  files: File[] = [];
  searchForm: FormGroup = new FormGroup({});
  user: User = {};
  userForm: FormGroup = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    birthday: new FormControl(),
    gender: new FormControl(),
    avatar: new FormControl(),
    cover: new FormControl()
  });

  constructor(private postService: PostService,
              private fileService: FileService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) {
    this.getAllPostsByUser();
    this.getFileByPostId();
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getUserProfile(this.id);
    });
  }

  ngOnChanges() {
    this.getAllPostsByUser();
    this.getFileByPostId();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    this.getUserDetail();
  }

  getUserDetail() {
    this.userService.getUserDetail(this.user.id).subscribe(user => {
      this.user = user;
    })
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
        status: new FormControl(post.status),
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

  submitDelete() {
    this.postService.deleteById(this.id).subscribe(() => {
      alert('Successful!');
    }, error => {
      alert('Error!');
    });
  }

  getUserProfile(id) {
    return this.userService.getUserDetail(id).subscribe(user => {
      this.user = user;
      this.userForm = new FormGroup({
        username: new FormControl(user.username),
        email: new FormControl(user.email),
        phone: new FormControl(user.phone),
        birthday: new FormControl(user.birthday),
        gender: new FormControl(user.gender),
        avatar: new FormControl(user.avatar),
        cover: new FormControl(user.cover)
      });
    });
  }

}
