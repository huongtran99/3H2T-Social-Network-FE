import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  convertDate(date: Date): string {
    let dateToString = '';
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    if (day > 0 && day < 10) {
      dateToString = '0' + day + '/';
    } else {
      dateToString = day + '/';
    }
    if (month > 0 && month < 10) {
      dateToString += '0' + month + '/';
    } else {
      dateToString += month + '/';
    }
    dateToString += date.getUTCFullYear();
    return dateToString;
  }
}
