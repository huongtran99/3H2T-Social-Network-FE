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
import {CommentService} from "../../service/comment.service";
import {FormControl, FormGroup} from "@angular/forms";

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
  comments: Comment[] = [];
  commentForm: FormGroup = new FormGroup({
    content: new FormControl()
  })
  pageComment: any = 0;
  notificationComment: Notification = {};

  constructor(private postService: PostService,
              private fileService: FileService,
              private userService: UserService,
              private data: DataService,
              private reaction: ReactionService,
              private notificationService: NotificationService, private commentService: CommentService) {
    this.getAllPosts();
  }

  loadMore(id) {
    this.pageComment++;
    this.commentService.getCommentByPostId(id, this.pageComment++).subscribe((data: any) => {
      this.comments.push(data.content);
    })
  }

  createComment(post) {
    let comment = this.commentForm.value;
    comment.user = {
      id: this.user.id
    }
    comment.post = {
      id: post.id
    }
    this.commentService.createComment(comment).subscribe(() => {
      this.commentForm.reset();
      this.notificationComment = {
        content: this.user.username + " comment your post",
        sender: this.user,
        user : post.user
      }
      this.notificationService.createNotification(this.notificationComment).subscribe()
    });
  }

  getComments() {
    for (let i = 0; i < this.posts.length; i++) {
      this.commentService.getCommentByPostId(this.posts[i].id, 0).subscribe((data: any) => {
        if (data.content == '') {
          data = [{
            content: false,
            dateTime: false,
            user: false,
            post: this.posts[i],
          }];
          this.comments.push(data);
        } else {
          this.comments.push(data.content);
        }
      })
    }
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
      this.getFileByPostId(this.posts);
      this.countLike();
      this.getComments();
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
      if (data != 1) {
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
          if (this.user.id != post.user.id) {
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
}
