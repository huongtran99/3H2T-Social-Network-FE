import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingInformationComponent } from './setting-information.component';

describe('SettingInformationComponent', () => {
  let component: SettingInformationComponent;
  let fixture: ComponentFixture<SettingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
