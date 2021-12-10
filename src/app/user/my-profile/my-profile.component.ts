import {Component, OnInit} from '@angular/core';
import {Post} from "../../model/post";
import {PostService} from "../../service/post.service";
import {FileService} from "../../service/file.service";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from 'src/app/model/user';
import {UserService} from "../../service/user.service";
import {DataService} from "../../service/data.service";
import {Notification} from "../../model/Notification";
import {ReactionService} from "../../service/reaction.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  id: number;
  post: Post = {};
  posts = this.postService.postListMyProfile;
  postEditForm: FormGroup = new FormGroup({
    id: new FormControl(),
    content: new FormControl(),
    status: new FormControl("Public"),
  });
  page: any = 0;
  files = this.fileService.filesFromService;
  searchForm: FormGroup = new FormGroup({});
  user: User;
  urlEditPost: any;
  fileData = this.fileService.fileDataFromService;
  fileImage: any;
  userForm = new FormGroup({
    avatar: new FormControl()
  })
  like: any;
  counts: any[] = [];
  notification: Notification = {};

  constructor(private postService: PostService,
              private fileService: FileService,
              private userService: UserService,
              private dataService: DataService,
              private reaction: ReactionService,
              private notificationService: NotificationService) {
    this.getAllPostsByUser();
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

  getPostId(id) {
    this.fileService.getFileByPostId(id).subscribe((data: any) => {
      if(data == '') {
        this.urlEditPost = '';
      } else {
        this.urlEditPost = data[0].fileName;
      }
      this.id = id;
      this.postService.findById(id).subscribe(post => {
        this.post = post;
        this.postEditForm = new FormGroup({
          id: new FormControl(post.id),
          content: new FormControl(post.content),
          status: new FormControl(post.status),
        });
      });
    });
  }

  submitEdit() {
    const post = this.postEditForm.value;
    post.user = {
      id: this.user.id
    };
    this.postService.editById(this.id, post).subscribe(data => {
      post.id = data.id;
      const formData = new FormData();
      for (let i = 0; i < this.fileData.length; i++) {
        formData.append('fileNames', this.fileData[i]);
      }
      formData.append('post.id', post.id);
      this.fileService.getFileByPostId(post.id).subscribe((data: any) => {
        if(data != '') {
          this.fileService.editFile(data[0].id, formData).subscribe(() => {
            this.postEditForm.reset();
            this.urlEditPost = "";
            this.postService.findAll(this.page).subscribe((post: any) => {
              this.posts = post.content;
              this.dataService.changeData(this.posts);
              this.getFileByPostId(this.posts);
            })
          });
        } else {
          this.fileService.createFile(formData).subscribe(() => {
            this.postEditForm.reset();
            this.urlEditPost = "";
          })
        }
        this.postService.findAll(this.page).subscribe((post: any) => {
          this.posts = post.content;
          this.dataService.changeData(this.posts);
          this.getFileByPostId(this.posts);
        })
      })
    }, error => {
      alert('Error!');
    });
  }

  submitDelete() {
    this.postService.deleteById(this.id).subscribe(() => {
      this.postService.findAll(this.page).subscribe((post: any) => {
        this.posts = post.content;
        this.dataService.changeData(this.posts);
        this.getFileByPostId(this.posts);
      })
    }, error => {
      alert('Error!');
    });
  }

  addFileEditPost(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.urlEditPost = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  fileProgressEdit(fileInput: any) {
    for (let i = 0; i < fileInput.target.files.length; i++) {
      this.fileData.push(fileInput.target.files[i]);
    }
  }

  uploadImages(event: any) {
    this.addFileEditPost(event);
    this.fileProgressEdit(event);
  }

  fileAvatarUpload(fileInput: any) {
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

  editCover() {
    this.user = JSON.parse(localStorage.getItem('user'));
    const formData = new FormData();
    formData.append('cover', this.fileImage);
    this.userService.editCover(this.user.id, formData).subscribe(() => {
      this.userService.getUserDetail(this.user.id).subscribe(data => {
        this.user = data;
      })
    })
  }

  deleteImage() {
    const post = this.postEditForm.value;
    post.user = {
      id: this.user.id
    };
    this.postService.editById(this.id, post).subscribe(data => {
      post.id = data.id;
      const formData = new FormData();
      for (let i = 0; i < this.fileData.length; i++) {
        formData.append('fileNames', this.fileData[i]);
      }
      formData.append('post.id', post.id);
      this.fileService.getFileByPostId(post.id).subscribe((data: any) => {
        this.fileService.deleteFile(data[0].id).subscribe(() => {
          this.urlEditPost = '';
        }, error => {
          alert('Error!');
        });
      });
    });
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
