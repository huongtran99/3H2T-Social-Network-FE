import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private postSource = new BehaviorSubject('Default');
  currentPost = this.postSource.asObservable();

  private fileSource = new BehaviorSubject(null);
  currentFile = this.fileSource.asObservable();

  constructor() { }

  changeData(data: any) {
    this.postSource.next(data);
  }

  changeFileData(data: any) {
    this.fileSource.next(data);
  }

}
