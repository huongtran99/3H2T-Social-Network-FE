import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {File} from "../model/file";
import {Post} from "../model/post";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {
  }

  createFile(file: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/files', file);
  }

  findFileByPostId(post: Post): Observable<File[]> {
    return this.http.post<File[]>('http://localhost:8080/files/postId', post);
  }

  getFileByPostId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/files/postId/${id}`);
  }

  editFile(id: number, post: any): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/files/${id}`, post);
  }
}
