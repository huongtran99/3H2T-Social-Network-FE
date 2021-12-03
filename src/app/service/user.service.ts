import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8080/users`);
  }

  getUserDetail(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:8080/users/${id}`);
  }

  editInformation(id: number, user: User): Observable<User> {
    return this.http.put<User>(`http://localhost:8080/users/update-information/${id}`, user);
  }

  editCover(id: number, user: User): Observable<User> {
    return this.http.put<User>(`http://localhost:8080/users/update-cover/${id}`, user);
  }

  editAvatar(id: number, user: User): Observable<User> {
    return this.http.put<User>(`http://localhost:8080/users/update-avatar/${id}`, user);
  }

}
