import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PostService} from "../../service/post.service";
import {FileService} from "../../service/file.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postForm: FormGroup = new FormGroup({
    content: new FormControl(),
  })
  fileData: File[] = [];
  user: User;

  constructor(private postService: PostService,
              private fileService: FileService) {
  }

  ngOnInit() {
  }

  fileProgress(fileInput: any) {
    for (let i = 0; i < fileInput.target.files.length; i++) {
      this.fileData.push(fileInput.target.files[i]);
    }
  }

  submitSave() {
    const post = this.postForm.value;
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
      this.postForm.reset();
      alert('Successful!');
    }, error => {
      alert('Error!')
    })
  }
}
