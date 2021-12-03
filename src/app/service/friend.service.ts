import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {Friend} from "../model/friend";

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) { }

  addFriend(id: number, sender: User): Observable<any> {
    return  this.http.post<any>(`http://localhost:8080/friends/${id}`, sender);
  }
  getAllFriend(id: number): Observable<Friend[]> {
    return this.http.get<Friend[]>(`http://localhost:8080/friends?userId=${id}`);
  }
}
