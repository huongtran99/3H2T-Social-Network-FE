import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private postSource = new BehaviorSubject(null);
  currentPost = this.postSource.asObservable();

  private fileSource = new BehaviorSubject(null);
  currentFile = this.fileSource.asObservable();
  data: any[] = [];

  constructor() {
  }

  changeData(data: any) {
    this.postSource.next(data);
  }

  changeFileData(data: any) {
    this.data.push(data);
    this.fileSource.next(this.data);
  }

  ngOnDestroy() {
    this.fileSource.unsubscribe();
  }

}
