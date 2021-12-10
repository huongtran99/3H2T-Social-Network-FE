import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private postSource = new BehaviorSubject(null);
  currentPost = this.postSource.asObservable();

  private userSource = new BehaviorSubject(null);
  currentUsers = this.userSource.asObservable();

  private searchValue = new BehaviorSubject(null);
  currentSearch = this.searchValue.asObservable();

  private pageSource = new BehaviorSubject(null);
  currentPage = this.pageSource.asObservable();

  constructor() {
  }

  changeData(data: any) {
    this.postSource.next(data);
  }

  changeDataUser(data: any) {
    this.userSource.next(data);
  }

  changeDataSearch(data: any) {
    this.searchValue.next(data);
  }

  changeDatePage(data: any) {
    this.pageSource.next(data);
  }
}
