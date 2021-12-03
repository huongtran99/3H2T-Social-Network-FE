import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../model/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  findAll(page: number): Observable<Post[]> {
    return this.http.get<Post[]>(`http://localhost:8080/posts/`)
  }

  findById(id: number): Observable<Post> {
    return this.http.get<Post>(`http://localhost:8080/posts/${id}`)
  }

  createNew(post: Post): Observable<Post> {
    return this.http.post<Post>(`http://localhost:8080/posts`, post)
  }

  editById(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`http://localhost:8080/posts/${id}`, post)
  }

  deleteById(id: number): Observable<Post> {
    return this.http.delete<Post>(`http://localhost:8080/posts/${id}`)
  }
}
