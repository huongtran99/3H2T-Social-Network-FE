import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private postSource = new BehaviorSubject(null);
  currentPost = this.postSource.asObservable();

  constructor() {
  }

  changeData(data: any) {
    this.postSource.next(data);
  }
}
