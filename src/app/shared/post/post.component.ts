import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../model/user";
import {PostService} from "../../service/post.service";
import {FileService} from "../../service/file.service";

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

  constructor(private postService: PostService,
              private fileService: FileService) {
  }

  ngOnInit() {
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
    for (let i = 0; i < fileInput.target.files.length; i++) {
      this.fileData.push(fileInput.target.files[i]);
    }
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
      this.fileService.createFile(formData).subscribe();
      this.postCreateForm.reset();
      this.urlCreatePost = "";
      this.postCreateForm = new FormGroup({
        status: new FormControl("Public"),
      })
      alert('Successful!');
    }, error => {
      alert('Error!')
    })

  }
}
