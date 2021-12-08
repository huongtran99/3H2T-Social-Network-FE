import {Component, OnChanges, OnInit} from '@angular/core';
import {Post} from "../../model/post";
import {File} from "../../model/file";
import {PostService} from "../../service/post.service";
import {FileService} from "../../service/file.service";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from 'src/app/model/user';
import {UserService} from "../../service/user.service";

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
  user: User;
  fileImage: any;
  userForm = new FormGroup({
    avatar: new FormControl()
  })

  constructor(private postService: PostService,
              private fileService: FileService,
              private userService: UserService) {
    this.getAllPostsByUser();
    this.getFileByPostId();
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

  fileProgress(fileInput: any) {
    this.fileImage = fileInput.target.files[0];
    this.editAvatar();
  }

  editAvatar() {
    this.user = JSON.parse(localStorage.getItem('user'));
    const formData = new FormData();
    formData.append('avatar', this.fileImage);
    this.userService.editAvatar(this.user.id, formData).subscribe(() => {
      this.userService.getUserDetail(this.user.id).subscribe(data => {
        this.user = data;
      })
    })
  }

  fileCoverUpload(fileInput: any) {
    this.fileImage = fileInput.target.files[0];
    this.editCover();
  }

  editCover(){
    this.user = JSON.parse(localStorage.getItem('user'));
    const formData = new FormData();
    formData.append('cover', this.fileImage);
    this.userService.editCover(this.user.id, formData).subscribe(() => {
      this.userService.getUserDetail(this.user.id).subscribe(data => {
        this.user = data;
      })
    })
  }
}
