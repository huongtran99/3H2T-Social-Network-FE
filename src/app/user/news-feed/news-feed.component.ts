import {Component, OnInit} from '@angular/core';
import {PostService} from "../../service/post.service";
import {Post} from "../../model/post";
import {FileService} from "../../service/file.service";
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import {DataService} from "../../service/data.service";
import {File} from "../../model/file";

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  posts: Post[] = [];
  page: any = 0;
  files: File[] = [];
  user: User;

  constructor(private postService: PostService,
              private fileService: FileService,
              private userService: UserService,
              private data: DataService) {
    this.getAllPosts();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    this.getUserDetail();
    this.data.currentPost.subscribe((data: any) => this.posts = data);
    /*this.data.currentFile.subscribe((data: any) => this.files = data);*/
  }

  getUserDetail() {
    this.userService.getUserDetail(this.user.id).subscribe(user => {
      this.user = user;
    })
  }

  getAllPosts() {
    this.postService.findAll(this.page).subscribe((post: any) => {
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

}
