import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  constructor(private http: HttpClient) {
  }

  like(like: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/reactions`, like);
  }

  getLike(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/reactions/${id}`)
  }

  checkLike(postId: number, userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/reactions/check?postId=${postId}&userId=${userId}`);
  }

  unLike(postId: number, userId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/reactions?postId=${postId}&userId=${userId}`);
  }
}
