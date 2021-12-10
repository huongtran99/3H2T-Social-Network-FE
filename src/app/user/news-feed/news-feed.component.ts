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
  page: any = 0;
  files: any[] = [];
  user: User;
  like: any;
  counts: any[] = [];
  notification: Notification = {};

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

  loadMore() {
    this.page++;
    this.postService.findAll(this.page).subscribe(async (post: any) => {
      for (let i = 0; i < post.content.length; i++) {
        this.posts.push(post.content[i]);
      }
      await this.getFileByPostId(this.posts);
      this.countLike();
    })
  }

  getUserDetail() {
    this.userService.getUserDetail(this.user.id).subscribe(user => {
      this.user = user;
    })
  }

  getAllPosts() {
    this.postService.findAll(this.page).subscribe(async (post: any) => {
      this.posts = post.content;
      await this.getFileByPostId(this.posts);
      await this.countLike();
    })
  }

  async getFileByPostId(posts: any) {
    for (let i = 0; i < posts.length; i++) {
      let files = await this.getFileByPostIdPromise(posts[i]);
      posts[i].file = files[0];0.

    }
  }

  getFileByPostIdPromise(post) {
    return this.fileService.findFileByPostId(post).toPromise();
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
    this.reaction.checkLike(post.id, this.user.id).subscribe(async (data: any) => {
      if (data != 1) {
        await this.reaction.like(this.like).subscribe(async () => {
          this.counts = [];
          for (let i = 0; i < this.posts.length; i++) {
            await this.reaction.getLike(this.posts[i].id).subscribe(async (data: any) => {
              await this.counts.push(data);
            })
          }
          this.notification = {
            content: " liked your post.",
            user: post.user,
            sender: this.user
          };
          if (this.user.id != post.user.id) {
            this.notificationService.createNotification(this.notification).subscribe();
          }
        })
      } else {
        await this.reaction.unLike(post.id, this.user.id).subscribe(async () => {
          this.counts = [];
          for (let i = 0; i < this.posts.length; i++) {
            await this.reaction.getLike(this.posts[i].id).subscribe(async (data: any) => {
              await this.counts.push(data);
            })
          }
        })
      }
    })
  }

  countLike() {
    for (let i = 0; i < this.posts.length; i++) {
      this.reaction.getLike(this.posts[i].id).subscribe(async (data: any) => {
        await this.counts.push(data);
      })
    }
  }
}
