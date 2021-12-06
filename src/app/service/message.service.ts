import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../model/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) {
  }

  getAllMessage(userId1: number, userId2: number, size: number): Observable<Message[]> {
    return this.http.get<Message[]>(`http://localhost:8080/messages?userId1=${userId1}&userId2=${userId2}&size=${size}`);
  }

  createMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`http://localhost:8080/messages`, message);
  }

  getMessage(id: number): Observable<Message> {
    return this.http.get<Message>(`http://localhost:8080/messages/${id}`);
  }

  updateMessage(id: number, message: Message): Observable<Message> {
    return this.http.put<Message>(`http://localhost:8080/messages/${id}`, message)
  }
  deleteMessage(id: number): Observable<Message> {
    return this.http.delete<Message>(`http://localhost:8080/messages/${id}`);
  }
}
