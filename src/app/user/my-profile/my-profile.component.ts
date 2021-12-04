import { Component, OnInit } from '@angular/core';
import {Post} from "../../model/post";
import {File} from "../../model/file";
import {PostService} from "../../service/post.service";
import {FileService} from "../../service/file.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  posts: Post[] = [];
  page: any = 0;
  files: File[] = [];

  constructor(private postService: PostService,
              private fileService: FileService) {
    this.getAllPosts();
    this.getFileByPostId();
  }

  ngOnInit() {
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
