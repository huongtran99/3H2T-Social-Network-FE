import {Component, OnInit} from '@angular/core';
import {Post} from "../../model/post";
import {File} from "../../model/file";
import {PostService} from "../../service/post.service";
import {FileService} from "../../service/file.service";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from 'src/app/model/user';
import {UserService} from "../../service/user.service";
import {DataService} from "../../service/data.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  id: number;
  post: Post = {};
  posts: Post[] = [];
  page: any = 0;
  files: any[] = [];
  postEditForm: FormGroup = new FormGroup({
    id: new FormControl(),
    content: new FormControl(),
    status: new FormControl("Public"),
  });
  searchForm: FormGroup = new FormGroup({});
  user: User;

  constructor(private postService: PostService,
              private fileService: FileService,
              private userService: UserService,
              private dataService: DataService) {
    this.getAllPostsByUser();
    this.getFileByPostId(this.posts);
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getUserDetail();
    this.dataService.currentPost.subscribe((data: any) => this.posts = data);
  }

  getUserDetail() {
    this.userService.getUserDetail(this.user.id).subscribe(user => {
      this.user = user;
    })
  }

  getAllPostsByUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.postService.findAllByUser(this.user.id, this.page).subscribe((post: any) => {
      this.posts = post.content;
      this.getFileByPostId(this.posts);
    })
  }

  getFileByPostId(posts: any) {
    for (let i = 0; i < posts.length; i++) {
      this.fileService.findFileByPostId(posts[i]).subscribe(file => {
        posts[i].file = file[0];
      })
    }
  }

  getPostId(id) {
    this.id = id;
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
}
