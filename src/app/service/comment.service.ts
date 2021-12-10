import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../model/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getCommentByPostId(id : number, page : any): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/comments/post/${id}?page=${page}`);
  }

  createComment(comment: Comment): Observable<Comment>{
    return this.http.post<Comment>(`http://localhost:8080/comments/`, comment);
  }
}
