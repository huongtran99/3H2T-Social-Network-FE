import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8080/users`);
  }

  getUserDetail(id: number) : Observable<User> {
    return this.http.get<User>(`http://localhost:8080/users/${id}`);
  }

  getAllUserHasRole(user: string): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8080/users/role`)
  }


}
