import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) { }

  addFriend(id: number, sender: User): Observable<any> {
    return  this.http.post<any>(`http://localhost:8080/friends/${id}`, sender);
  }
}
