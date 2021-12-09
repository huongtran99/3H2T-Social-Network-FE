import {Component, OnInit} from '@angular/core';
import {PostService} from "../../service/post.service";
import {Post} from "../../model/post";
import {FileService} from "../../service/file.service";
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import {DataService} from "../../service/data.service";
import {ReactionService} from "../../service/reaction.service";
import {Notification} from "../../model/Notification";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  posts: Post[] = [];
  page: any = 3;
  files: any[] = [];
  user: User;
  like: any;
  counts: any[] = [];
  notification: Notification = {};
  totalPage: number;

  constructor(private postService: PostService,
              private fileService: FileService,
              private userService: UserService,
              private data: DataService,
              private reaction: ReactionService,
              private notificationService: NotificationService) {
    this.getAllPosts();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getUserDetail();
    this.data.currentPost.subscribe((data: any) => this.posts = data);
  }

  getUserDetail() {
    this.userService.getUserDetail(this.user.id).subscribe(user => {
      this.user = user;
    })
  }

  getAllPosts() {
    this.postService.findAll(this.page).subscribe((post: any) => {
      this.posts = post.content;
      this.totalPage = post.totalElements;
      this.getFileByPostId(this.posts);
      this.countLike();
    })
  }

  getFileByPostId(posts: any) {
    for (let i = 0; i < posts.length; i++) {
      this.fileService.findFileByPostId(posts[i]).subscribe(file => {
        posts[i].file = file[0];
      })
    }
  }

  likes(post) {
    this.like = {
      post: {
        id: post.id
      },
      user: {
        id: this.user.id
      }
    }
    this.reaction.checkLike(post.id, this.user.id).subscribe(data => {
      if(data != 1) {
        this.reaction.like(this.like).subscribe(() => {
          this.counts = [];
          for (let i = 0; i < this.posts.length; i++) {
            this.reaction.getLike(this.posts[i].id).subscribe((data: any) => {
              this.counts.push(data);
            })
          }
          this.notification = {
            content: " liked your post.",
            user: post.user,
            sender: this.user
          };
          if(this.user.id != post.user.id) {
            this.notificationService.createNotification(this.notification).subscribe();
          }
        })
      } else {
        this.reaction.unLike(post.id, this.user.id).subscribe(() => {
          this.counts = [];
          for (let i = 0; i < this.posts.length; i++) {
            this.reaction.getLike(this.posts[i].id).subscribe((data: any) => {
              this.counts.push(data);
            })
          }
        })
      }
    })
  }

  countLike() {
    for (let i = 0; i < this.posts.length; i++) {
      this.reaction.getLike(this.posts[i].id).subscribe((data: any) => {
        this.counts.push(data);
      })
    }
  }

  loadMorePage() {
    this.page += 5;
    this.getAllPosts()
  }
}
