import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {Friend} from "../model/friend";

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) {
  }

  addFriend(id: number, sender: User): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/friends/${id}`, sender);
  }

  getFriendBySenderIdAndReceiverId(id: number, senderId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/friends/${id}?senderId=${senderId}`);
  }

  getStatus(id: number, receiver: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/friends/status/${id}?receiver=${receiver}`);
  }

  deleteFriend(id: number, senderId: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/friends/${id}?senderId=${senderId}`);
  }

  confirm(id: number, receiver: any): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/friends/${id}`, receiver);
  }
  getAllFriend(id: number): Observable<Friend[]> {
    return this.http.get<Friend[]>(`http://localhost:8080/friends?userId=${id}`);
  }
}
