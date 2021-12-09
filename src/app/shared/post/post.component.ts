import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../model/user";
import {PostService} from "../../service/post.service";
import {FileService} from "../../service/file.service";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postCreateForm: FormGroup = new FormGroup({
    content: new FormControl(),
    status: new FormControl("Public"),
  })
  fileData: File[] = [];
  user: User;
  urlCreatePost: any;
  posts: any[] = [];
  page: any = 0;
  files: any[] = [];

  constructor(private postService: PostService,
              private fileService: FileService,
              private data: DataService) {
  }

  ngOnInit() {
    this.data.currentPost.subscribe((data: any) => this.posts = data);
  }

  addFileCreatePost(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.urlCreatePost = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  fileProgress(fileInput: any) {
    this.fileData = [];
    for (let i = 0; i < fileInput.target.files.length; i++) {
      this.fileData.push(fileInput.target.files[i]);
    }
  }

  uploadImage(event: any){
    this.addFileCreatePost(event);
    this.fileProgress(event);
  }

  submitCreate() {
    const post = this.postCreateForm.value;
    this.user = JSON.parse(localStorage.getItem('user'));
    post.user = {
      id: this.user.id
    };
    this.postService.createNew(post).subscribe((data) => {
      post.id = data.id;
      const formData = new FormData();
      for (let i = 0; i < this.fileData.length; i++) {
        formData.append('fileNames', this.fileData[i]);
      }
      formData.append('post.id', post.id);
      this.fileService.createFile(formData).subscribe(() => {

      });
      this.postCreateForm.reset();
      this.urlCreatePost = "";
      this.postCreateForm = new FormGroup({
        content: new FormControl(),
        status: new FormControl("Public"),
      })
      this.postService.findAll(this.page).subscribe(async (post: any) => {
        this.posts = post.content;
        await this.getFileByPostId(this.posts);
      })
    }, error => {
      alert('Error!')
    })
  }

  async getFileByPostId(posts: any) {
    for (let i = 0; i < posts.length; i++) {
      let files =  await this.getFileByPostIdPromise(posts[i]);
      posts[i].file = files[0];
    }
    this.data.changeData(this.posts);
  }

  getFileByPostIdPromise(post){
    return this.fileService.findFileByPostId(post).toPromise();
  }

}
