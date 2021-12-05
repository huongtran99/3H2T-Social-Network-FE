import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notification} from "../model/Notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  createNotification(notification: Notification) : Observable<Notification> {
    return this.http.post<Notification>(`http://localhost:8080/notifications`, notification)
  }

  getNotificationByUserid(id: number) : Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/notifications/${id}`)
  }
}
