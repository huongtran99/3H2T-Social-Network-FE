import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-information',
  templateUrl: './setting-information.component.html',
  styleUrls: ['./setting-information.component.css']
})
export class SettingInformationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggleMenu() {
      let navigation = document.querySelector('.navigation');
      let toggle = document.querySelector('.toggle');
      navigation.classList.toggle('active');
      toggle.classList.toggle('active');
    }

}
