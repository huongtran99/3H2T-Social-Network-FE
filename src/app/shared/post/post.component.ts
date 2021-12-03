import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PostService} from "../../service/post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postForm: FormGroup = new FormGroup({
    content: new FormControl(),
  })

  constructor(private postService: PostService) {
  }

  ngOnInit() {
  }

  submitSave() {
    const post = this.postForm.value;
    this.postService.createNew(post).subscribe(() => {
      this.postForm.reset();
      alert('Successful!');
    }, error => {
      alert('Error!')
    })
  }
}
