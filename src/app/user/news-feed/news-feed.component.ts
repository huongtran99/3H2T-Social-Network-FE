import {Component, OnInit} from '@angular/core';
import {PostService} from "../../service/post.service";
import {Post} from "../../model/post";
import {FileService} from "../../service/file.service";
import {File} from "../../model/file";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  posts: Post[] = [];
  page: any = 0;
  files: File[] = [];

  constructor(private postService: PostService,
              private fileService: FileService) {
  }

  ngOnInit() {
    this.getAllPosts();
    this.getFileByPostId();
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
