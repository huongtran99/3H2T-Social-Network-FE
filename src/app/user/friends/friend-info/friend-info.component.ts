import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../model/user";
import {Notification} from "../../../model/Notification";
import {FriendService} from "../../../service/friend.service";
import {NotificationService} from "../../../service/notification.service";
import {Friend} from "../../../model/friend";
import {PostService} from "../../../service/post.service";
import {FileService} from "../../../service/file.service";
import {Post} from "../../../model/post";
import {ReactionService} from "../../../service/reaction.service";

@Component({
  selector: 'app-friend-info',
  templateUrl: './friend-info.component.html',
  styleUrls: ['./friend-info.component.css']
})
export class FriendInfoComponent implements OnInit {
  id: number;
  user: User;
  sender: any;
  notification: Notification = {};
  statusFriend: any = null;
  status: any;
  statusAddFriend: boolean;
  friend: Friend;
  posts: Post[] = [];
  page: any = 0;
  like: any;
  counts: any[] = [];
  notification1: Notification = {};


  constructor(private userService: UserService,
              private activateRoute: ActivatedRoute,
              private friendService: FriendService,
              private notificationService: NotificationService,
              private postService: PostService,
              private fileService: FileService,
              private reaction: ReactionService) {
    this.activateRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      this.userService.getUserDetail(this.id).subscribe(user => {
        this.user = user;
      });
    });
    this.sender = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.checkStatus();
    this.getAllPostsByUser();
  }

  getAllPostsByUser() {
    this.postService.findAllByUser(this.id, this.page).subscribe((post: any) => {
      this.posts = post.content;
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

   checkStatus() {
    this.friendService.getFriendBySenderIdAndReceiverId(this.id, this.sender.id).subscribe(friend => {
      if (friend == null) {
        this.statusAddFriend = true;
        console.log(this.statusFriend)
        this.friendService.getFriendBySenderIdAndReceiverId(this.sender.id, this.id).subscribe(friend => {
          this.statusFriend = friend.status;
        })
      } else {
        this.statusFriend = friend.status;
      }
    })
    this.friendService.getStatus(this.id, this.sender.id).subscribe(status => {
      this.status = status;
    })
  }


  confirm() {
    this.friendService.confirm(this.id, this.sender).subscribe(() => {
      this.checkStatus();
      this.notification = {
        content: " đã đồng ý kết bạn",
        user: this.user,
        sender: this.sender
      };
      this.notificationService.createNotification(this.notification).subscribe(() => {
      })
    })
  }

  deleteFriend() {
    if (!this.status) {
      this.friendService.deleteFriend(this.id, this.sender.id).subscribe(() => {
        this.statusAddFriend = true;
        this.status = false;
        this.statusFriend = false;
      })
    } else {
      this.friendService.deleteFriend(this.sender.id, this.id).subscribe(() => {
        this.statusAddFriend = true;
        this.status = false;
        this.statusFriend = false;
      })
    }
  }

  addFriend() {
    this.statusAddFriend = false;
    this.status = false;
    this.statusFriend = false;
    this.friendService.addFriend(this.id, this.sender).subscribe(() => {
      this.notification = {
        content: " đã gửi cho bạn 1 lời mời kết bạn",
        user: this.user,
        sender: this.sender
      };
      this.notificationService.createNotification(this.notification).subscribe(() => {
      })
    })
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
          this.notification1 = {
            content: " liked your post.",
            user: post.user,
            sender: this.user
          };
          if(this.user.id != post.user.id) {
            this.notificationService.createNotification(this.notification1).subscribe();
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
