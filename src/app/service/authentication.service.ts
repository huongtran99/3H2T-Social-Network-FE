import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserToken} from "../model/user-token";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUserSubject: BehaviorSubject<UserToken>

  public currenUser: Observable<UserToken>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user')));
    this.currenUser = this.currentUserSubject.asObservable();
    console.log(this.currenUser);
  }

  login(username: string, password: string) {
    return this.http.post<any>(`http://localhost:8080/login`, {username, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/register`, user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }
}
